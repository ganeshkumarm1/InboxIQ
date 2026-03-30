import path from "path";
import { extractFeatures } from "./features";
import { oneHot, softmax } from "./model";
import { HIDDEN_SIZE, OUTPUT_SIZE } from "./constants/constants";
import { DataEntry, ModelParams, TrainOptions } from "./params";
import {
    initBias,
    initHiddenBias,
    initHiddenWeights,
    initWeights,
    loadDataset,
    saveModelParams,
} from "./utils/utils";

// Weighted sum of inputs plus bias — the core operation of a single neuron
function dotProduct(weights: number[], inputs: number[], bias: number): number {
    return weights.reduce((sum, w, i) => sum + w * inputs[i], 0) + bias;
}

// ReLU: hidden neurons only pass positive signals forward
function relu(x: number): number {
    return Math.max(0, x);
}

function forwardPass(features: number[], params: ModelParams) {
    const hiddenRaw = params.W1.map((row, i) => dotProduct(row, features, params.b1[i]));
    const hidden = hiddenRaw.map(relu);
    const scores = params.weights.map((row, i) => dotProduct(row, hidden, params.bias[i]));
    const probs = softmax(scores);
    return { hiddenRaw, hidden, probs };
}

function updateOutputLayer(
    params: ModelParams,
    probs: number[],
    expected: number,
    hidden: number[],
    lr: number
) {
    const errors: number[] = [];
    const y_true = oneHot(expected);

    for (let i = 0; i < OUTPUT_SIZE; i++) {
        const error = probs[i] - y_true[i]; // If error is -ve, then we are wrong about the correct output. If error is +ve, then we are correct about the wrong output
        errors.push(error);
        params.weights[i] = params.weights[i].map((w, j) => w - lr * error * hidden[j]);
        params.bias[i] -= lr * error;
    }

    return errors;
}

function updateHiddenLayer(
    params: ModelParams,
    outputErrors: number[],
    hiddenRaw: number[],
    features: number[],
    lr: number
) {
    for (let j = 0; j < HIDDEN_SIZE; j++) {
        // how much did this hidden neuron contribute to the output errors
        const errorFromOutput = outputErrors.reduce(
            (sum, err, i) => sum + err * params.weights[i][j],
            0
        );
        const gradient = errorFromOutput * (hiddenRaw[j] > 0 ? 1 : 0); // zero out if ReLU was inactive

        params.W1[j] = params.W1[j].map((w, k) => w - lr * gradient * features[k]);
        params.b1[j] -= lr * gradient;
    }
}

function train(dataset: DataEntry[], params: ModelParams, options: TrainOptions): ModelParams {
    const { epochs, learningRate: lr } = options;

    for (let epoch = 0; epoch < epochs; epoch++) {
        for (const { input, output } of dataset) {
            const features = extractFeatures(input);
            const { hiddenRaw, hidden, probs } = forwardPass(features, params);
            const outputErrors = updateOutputLayer(params, probs, output, hidden, lr);
            updateHiddenLayer(params, outputErrors, hiddenRaw, features, lr);
        }
    }

    return params;
}

const params: ModelParams = {
    W1: initHiddenWeights(),
    b1: initHiddenBias(),
    weights: initWeights(),
    bias: initBias(),
};

const dataset = loadDataset(path.resolve("training_data/emails.csv"));
const trained = train(dataset, params, { epochs: 100, learningRate: 0.01 });
saveModelParams(trained);

console.log("Training complete.");
