import { ModelParams } from "./params";

// ReLU activation: clamp negatives to 0
export function relu(x: number): number {
    return Math.max(0, x);
}

// Forward pass through hidden layer: features → hidden activations
export function computeHidden(features: number[], modelParams: ModelParams): number[] {
    const { W1, b1 } = modelParams;
    return W1.map((row, i) => relu(row.reduce((s, w, j) => s + w * features[j], 0) + b1[i]));
}

// Forward pass through output layer: hidden activations → raw scores
export function computeScores(hidden: number[], modelParams: ModelParams): number[] {
    const { weights, bias } = modelParams;
    return weights.map((row, i) => row.reduce((s, w, j) => s + w * hidden[j], 0) + bias[i]);
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
