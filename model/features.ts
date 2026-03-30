import {
    ACTION_IDENTIFIERS,
    DATE_PATTERNS,
    DEADLINE_IDENTIFIERS,
    ESCALATION_IDENTIFIERS,
    PROMO_IDENTIFIERS,
    URGENT_IDENTIFIERS,
} from "./constants";
import { tokenize } from "./tokenizer";

export function containsUrgentWord(input: string): number {
    const tokens = tokenize(input);
    for (const token of tokens) {
        if (URGENT_IDENTIFIERS.includes(token)) return 1;
    }
    return 0;
}

export function containsActionWord(input: string): number {
    const tokens = tokenize(input);
    for (const token of tokens) {
        if (ACTION_IDENTIFIERS.includes(token)) return 1;
    }
    return 0;
}

export function containsPromoWord(input: string): number {
    const tokens = tokenize(input);
    let score = 0;
    for (const token of tokens) {
        if (PROMO_IDENTIFIERS.includes(token)) score += 1;
    }
    return score;
}

export function containsDeadlineWord(input: string): number {
    const tokens = tokenize(input);
    let score = 0;
    for (const token of tokens) {
        if (token in DEADLINE_IDENTIFIERS) score += DEADLINE_IDENTIFIERS[token];
    }
    return score;
}

export function containsDate(input: string): number {
    const lower = input.toLowerCase();
    for (const pattern of DATE_PATTERNS) {
        if (pattern.test(lower)) return 1;
    }
    return 0;
}

// Fires when both urgent and action words are present — strongest Important signal
export function containsUrgentActionCombo(input: string): number {
    return containsUrgentWord(input) === 1 && containsActionWord(input) === 1 ? 1 : 0;
}

// Escalation words: suspended, blocked, outage, failure — Important signal
export function containsEscalationWord(input: string): number {
    const tokens = tokenize(input);
    for (const token of tokens) {
        if (ESCALATION_IDENTIFIERS.includes(token)) return 1;
    }
    return 0;
}

// Exclamation marks — strong promo signal
export function hasExclamation(input: string): number {
    return input.includes("!") ? 1 : 0;
}

export const features = [
    containsUrgentWord,
    containsActionWord,
    containsPromoWord,
    containsDeadlineWord,
    containsDate,
    containsUrgentActionCombo,
    containsEscalationWord,
    hasExclamation,
];

export const FEATURE_COUNT = features.length;

export function extractFeatures(input: string): number[] {
    return features.map((fn) => fn(input));
}
