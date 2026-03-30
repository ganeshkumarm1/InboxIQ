import { DataEntry, ModelParams } from "../params";
import { HIDDEN_SIZE, OUTPUT_SIZE } from "../constants/constants";
import * as fs from "fs";
import { parse } from "csv-parse/sync";
import path from "path";
import { FEATURE_COUNT } from "../features";

const MODEL_PARAMS_OUTPUT_FILE = path.join(__dirname, "..", "output", "params.json");

export function loadDataset(datasetPath: string): DataEntry[] {
    const dataset: DataEntry[] = [];
    const content = fs.readFileSync(datasetPath, "utf-8");
    const rows = parse(content, { columns: true });

    for (const row of rows as Record<string, string>[]) {
        const text: string = row["text"];
        const label: number = parseInt(row["label"]);
        dataset.push({
            input: text,
            output: label,
        });
    }

    return dataset;
}

export function saveModelParams(modelParams: ModelParams) {
    fs.writeFileSync(MODEL_PARAMS_OUTPUT_FILE, JSON.stringify(modelParams, null, 2));
}

export function loadModelParams() {
    const raw = fs.readFileSync(MODEL_PARAMS_OUTPUT_FILE, "utf-8");
    return JSON.parse(raw);
}

export function initWeights(): number[][] {
    // output layer: NUM_CLASSES x HIDDEN_SIZE
    const weights: number[][] = [];
    for (let i = 0; i < OUTPUT_SIZE; i++) {
        weights.push(Array.from({ length: HIDDEN_SIZE }, () => Math.random() * 0.2 - 0.1));
    }
    return weights;
}

export function initBias(): number[] {
    return Array.from({ length: OUTPUT_SIZE }, () => Math.random() * 0.2 - 0.1);
}

export function initHiddenWeights(): number[][] {
    // hidden layer: HIDDEN_SIZE x FEATURE_COUNT
    const W1: number[][] = [];
    for (let i = 0; i < HIDDEN_SIZE; i++) {
        W1.push(Array.from({ length: FEATURE_COUNT }, () => Math.random() * 0.2 - 0.1));
    }
    return W1;
}

export function initHiddenBias(): number[] {
    return Array.from({ length: HIDDEN_SIZE }, () => Math.random() * 0.2 - 0.1);
}
