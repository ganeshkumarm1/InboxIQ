import { extractFeatures } from "./features";
import { computeScores, oneHot, softmax } from "./model";
import { DataEntry, ModelParams, TrainOptions } from "./params";
import { initBias, initWeights, loadDataset, saveModelParams } from "./utils/utils";
import path from "path";

function train(dataset: DataEntry[], modelParams: ModelParams, options: TrainOptions): ModelParams {
    const { epochs, learningRate } = options;

    for (let e = 0; e < epochs; e++) {
        for (const dataEntry of dataset) {
            const { input, output } = dataEntry;
            const features = extractFeatures(input);
            const scores = computeScores(features, modelParams);
            const probs = softmax(scores);

            const y_true = oneHot(output);
            for (let i = 0; i < 3; i++) {
                const error = probs[i] - y_true[i];
                for (let j = 0; j < features.length; j++) {
                    modelParams.weights[i][j] -= learningRate * error * features[j];
                }
                modelParams.bias[i] -= learningRate * error;
            }
        }
    }

    if (process.env.DEBUG) {
        console.debug("weights: ", weights);
        console.debug("bias: ", bias);
    }

    return modelParams;
}

function getDatasetPath(): string {
    return path.resolve("training_data/emails.csv");
}

let weights = initWeights();
let bias = initBias();
const modelParams: ModelParams = { weights, bias };
const trainOptions: TrainOptions = { epochs: 50, learningRate: 0.01 };

const dataset = loadDataset(getDatasetPath());
const trainedParams = train(dataset, modelParams, trainOptions);
saveModelParams(trainedParams);
