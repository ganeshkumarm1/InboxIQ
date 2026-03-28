import {
    ACTION_IDENTIFIERS,
    DATE_PATTERNS,
    DEADLINE_IDENTIFIERS,
    PROMO_IDENTIFIERS,
    URGENT_IDENTIFIERS,
} from "./constants";
import { tokenize } from "./tokenizer";

export function containsUrgentWord(input: string): number {
    const tokens = tokenize(input);
    for (const token of tokens) {
        if (URGENT_IDENTIFIERS.includes(token)) {
            return 1;
        }
    }
    return 0;
}

export function containsActionWord(input: string): number {
    const tokens = tokenize(input);

    for (const token of tokens) {
        if (ACTION_IDENTIFIERS.includes(token)) {
            return 1;
        }
    }
    return 0;
}

export function containsPromoWord(input: string): number {
    const tokens = tokenize(input);

    let score = 0;
    for (const token of tokens) {
        if (PROMO_IDENTIFIERS.includes(token)) {
            score += 1;
        }
    }
    return score;
}

export function containsDeadlineWord(input: string): number {
    const tokens = tokenize(input);

    let score = 0;
    for (const token of tokens) {
        if (token in DEADLINE_IDENTIFIERS) {
            score += DEADLINE_IDENTIFIERS[token];
        }
    }
    return score;
}

export function containsDate(input: string): number {
    const lower = input.toLowerCase();

    for (const pattern of DATE_PATTERNS) {
        if (pattern.test(lower)) {
            return 1;
        }
    }
    return 0;
}

export function extractFeatures(input: string): number[] {
    const urgentFeature = containsUrgentWord(input);
    const actionFeature = containsActionWord(input);
    const promoFeature = containsPromoWord(input);
    const deadlineFeature = containsDeadlineWord(input);
    const dateFeature = containsDate(input);
    return [urgentFeature, actionFeature, promoFeature, deadlineFeature, dateFeature];
}
