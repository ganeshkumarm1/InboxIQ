import { loadDataset } from "../model/utils/utils";
import path from "path";
import { infer } from "../model/infer";
import { OutputLabel } from "../model/constants";

export function benchmark() {
    const dataset = loadDataset(getDatasetPath());
    let correct = 0;

    const perClass: Record<number, { correct: number; total: number }> = {
        0: { correct: 0, total: 0 },
        1: { correct: 0, total: 0 },
        2: { correct: 0, total: 0 },
    };

    for (const dataEntry of dataset) {
        const pred = infer(dataEntry.input);
        const truth = dataEntry.output;
        perClass[truth].total++;
        if (pred === truth) {
            correct++;
            perClass[truth].correct++;
        } else {
            console.log(`WRONG  pred=${OutputLabel[pred].padEnd(9)} truth=${OutputLabel[truth].padEnd(9)} "${dataEntry.input}"`);
        }
    }

    console.log("\n── Per-class accuracy ──────────────────");
    for (const [label, { correct: c, total: t }] of Object.entries(perClass)) {
        const name = OutputLabel[Number(label)].padEnd(9);
        console.log(`  ${name}  ${c}/${t}  (${((c/t)*100).toFixed(0)}%)`);
    }
    console.log(`\n── Overall: ${correct}/${dataset.length}  (${((correct/dataset.length)*100).toFixed(1)}%)`);
}

function getDatasetPath(): string {
    return path.resolve("benchmark/benchmark.csv");
}

benchmark();