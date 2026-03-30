export interface ModelParams {
    // hidden layer 1
    W1: number[][]; // (HIDDEN_SIZE x FEATURE_COUNT)
    b1: number[]; //  b1 is (HIDDEN_SIZE)

    // output layer
    weights: number[][]; // (OUTPUT_SIZE x HIDDEN_SIZE)
    bias: number[]; // (OUTPUT_SIZE)
}
