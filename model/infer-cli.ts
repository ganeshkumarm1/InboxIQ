import { infer } from "./infer";
import { OutputLabel } from "./constants/constants";

const input = process.argv[2];

if (!input) {
    console.error('Usage: npm run infer -- "<email text>"');
    process.exit(1);
}

const label = infer(input);
const labelNames: Record<OutputLabel, string> = {
    [OutputLabel.IGNORE]: "Ignore",
    [OutputLabel.ACTION]: "Action",
    [OutputLabel.IMPORTANT]: "Important",
};

console.log(labelNames[label]);
