import * as fs from "fs";
import { parse } from "csv-parse/sync";
import { extract_features } from "./main";

function compute_scores(features: number[], weights: number[][], bias: number[]): number[] {
    const scores: number[] = [];
    for (let i = 0; i < 3; i++) {  // 3 classes
        let s = 0;
        for (let j = 0; j < features.length; j++) {
            s += weights[i][j] * features[j];
        }
        s += bias[i];
        scores.push(s);
    }
    return scores;
}

function predict(features: number[], weights: number[][], bias: number[]): number[] {
    const s = compute_scores(features, weights, bias);
    const prob = softmax(s);
    return prob;
}

function softmax(scores: number[]): number[] {
    const exp_scores = scores.map(s => Math.exp(s));
    const total = exp_scores.reduce((a, b) => a + b, 0);
    return exp_scores.map(s => s / total);
}

function classify(probs: number[]): number {
    return probs.indexOf(Math.max(...probs));
}

function load_dataset(): [string, number][] {
    const dataset: [string, number][] = [];
    const file_path = "./training_data/training_data.csv";
    const content = fs.readFileSync(file_path, "utf-8");
    const rows = parse(content, { columns: true });

    for (const row of rows as Record<string, string>[]) {
        const text: string = row["text"];
        const label: number = parseInt(row["label"]);
        dataset.push([text, label]);
    }

    return dataset;
}

function one_hot(label: number): number[] {
    const vec = [0, 0, 0];
    vec[label] = 1;
    return vec;
}

function train(
    dataset: [string, number][],
    weights: number[][],
    bias: number[],
    lr: number = 0.01,
    epochs: number = 50
): [number[][], number[]] {
    for (let e = 0; e < epochs; e++) {
        for (const [email, label] of dataset) {
            const features = extract_features(email);
            const scores = compute_scores(features, weights, bias);
            const probs = softmax(scores);

            const y_true = one_hot(label);
            for (let i = 0; i < 3; i++) {
                const error = probs[i] - y_true[i];
                for (let j = 0; j < features.length; j++) {
                    weights[i][j] -= lr * error * features[j];
                }
                bias[i] -= lr * error;
            }
        }
    }
    return [weights, bias];
}

function init_weights(): number[][] {
    const weights: number[][] = [];
    for (let i = 0; i < 3; i++) {  // 3 classes
        weights.push(Array.from({ length: 6 }, () => Math.random() * 0.2 - 0.1));
    }
    return weights;
}

function init_bias(): number[] {
    return Array.from({ length: 3 }, () => Math.random() * 0.2 - 0.1);
}

let weights = init_weights();
let bias = init_bias();
const dataset = load_dataset();
[weights, bias] = train(dataset, weights, bias);

console.log(weights);
console.log(bias);

const inference_inputs = [
    "Submit report by today",
    "Claim this reward for you",
    "Reply to me at you own time"
];

for (const mail of inference_inputs) {
    const features = extract_features(mail);
    const scores = compute_scores(features, weights, bias);
    const probs = softmax(scores);

    const label = probs.indexOf(Math.max(...probs));

    if (label === 1) {
        console.log("Action");
    } else if (label === 2) {
        console.log("Important");
    } else {
        console.log("Ignore");
    }
}
