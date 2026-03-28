import { OutputLabel } from "./constants/constants";
import { extractFeatures } from "./features";
import { computeScores, softmax } from "./model";
import { loadModelParams } from "./utils/utils";

export function infer(input: string): OutputLabel {
    const features = extractFeatures(input);
    const modelParams = loadModelParams();
    const scores = computeScores(features, modelParams);
    const probs = softmax(scores);
    const labelKey = probs.indexOf(Math.max(...probs));

    if (process.env.DEBUG) {
        console.debug("features:", features);
        console.debug("scores:  ", scores);
        console.debug("probs:   ", probs);
        console.debug("label:   ", labelKey);
    }

    return labelKey as OutputLabel;
}
