# InboxIQ

A from-scratch email priority classifier built with a 2-layer neural network — no ML frameworks, just TypeScript and math.

Classifies email subjects into three categories: **Important**, **Action**, or **Ignore**.

## How it works

1. Input text is tokenized and run through 8 hand-crafted feature extractors (urgent words, action words, promo words, deadlines, dates, escalation signals, etc.)
2. Features feed into a neural network: `Input (8) → Hidden Layer (3, ReLU) → Output (3, Softmax)`
3. The output neuron with the highest probability wins

## Setup

```bash
npm install
```

## Usage

```bash
# Train the model
npm run train

# Classify an email
npm run infer -- "Submit the report by today EOD"

# Run benchmark
npx ts-node benchmark/benchmark.ts

# Lint / format
npm run lint:fix
npm run format
```

## Project structure

```
model/
  features.ts       — feature extraction from raw text
  model.ts          — forward pass, softmax, ReLU
  train.ts          — training loop with backpropagation
  infer.ts          — inference entry point
  tokenizer.ts      — text tokenizer
  constants/        — word lists, hyperparameters
  params/           — TypeScript interfaces
  output/           — saved model weights (params.json)
training_data/      — training CSV
benchmark/          — benchmark CSV and runner
```
