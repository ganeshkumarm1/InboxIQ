import { ModelParams } from "./params";

export function computeScores(features: number[], modelParams: ModelParams): number[] {
    const { weights, bias } = modelParams;
    const scores: number[] = [];
    for (let i = 0; i < 3; i++) {
        // 3 classes
        let s = 0;
        for (let j = 0; j < features.length; j++) {
            s += weights[i][j] * features[j];
        }
        s += bias[i];
        scores.push(s);
    }
    return scores;
}

export function softmax(scores: number[]): number[] {
    const exp_scores = scores.map((s) => Math.exp(s));
    const total = exp_scores.reduce((a, b) => a + b, 0);
    return exp_scores.map((s) => s / total);
}

export function oneHot(label: number): number[] {
    const vec = [0, 0, 0];
    vec[label] = 1;
    return vec;
}
