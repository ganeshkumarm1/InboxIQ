import { DataEntry, ModelParams } from "../params";
import { FEATURE_COUNT, NUM_CLASSES } from "../constants/constants";
import * as fs from "fs";
import { parse } from "csv-parse/sync";
import path from "path";

const MODEL_PARAMS_OUTPUT_FILE = path.join(__dirname, "..", "output", "params.json");

export function loadDataset(): DataEntry[] {
    const datasetPath = path.join(__dirname, "..", "..", "training_data", "emails.csv");
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
    const weights: number[][] = [];
    for (let i = 0; i < NUM_CLASSES; i++) {
        weights.push(Array.from({ length: FEATURE_COUNT }, () => Math.random() * 0.2 - 0.1));
    }
    return weights;
}

export function initBias(): number[] {
    return Array.from({ length: NUM_CLASSES }, () => Math.random() * 0.2 - 0.1);
}
