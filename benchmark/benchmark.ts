import { loadDataset } from "../model/utils/utils";
import path from "path";
import { infer } from "../model/infer";
import { OutputLabel } from "../model/constants";

export function benchmark() {
    const dataset = loadDataset(getDatasetPath());
    let correct = 0;

    for (const dataEntry of dataset) {
        const pred = infer(dataEntry.input);

        if (OutputLabel[pred] === OutputLabel[dataEntry.output]) {
            correct++;
        }
    }

    const accuracy = correct / dataset.length;
    console.log("Accuracy:", accuracy);
}

function getDatasetPath(): string {
    return path.resolve("benchmark/benchmark.csv");;
}

benchmark();