// Features
// Contains urgent word
// Contains action word
// Contains promo word
// Has deadline word
// Contains date

function tokenize(email: string): string[] {
    const matches = email.toLowerCase().match(/\b\w+\b/g);
    return matches ?? [];
}

export function contains_urgent_word(email: string): number {
    const tokens = tokenize(email);
    for (const token of tokens) {
        if (["urgent", "critical", "important", "asap", "now", "priority"].includes(token)) {
            return 1;
        }
    }
    return 0;
}

export function contains_action_word(email: string): number {
    const tokens = tokenize(email);
    for (const token of tokens) {
        if (["submit", "review", "check", "update", "confirm", "approve", "send", "complete", "verify", "respond"].includes(token)) {
            return 1;
        }
    }
    return 0;
}

export function contains_promo_word(email: string): number {
    const tokens = tokenize(email);
    let score = 0;
    for (const token of tokens) {
        if (["offer", "discount", "sale", "deal", "free", "cashback", "coupon", "voucher", "buy", "limited", "exclusive", "save", "win", "bonus", "gift"].includes(token)) {
            score += 1;
        }
    }
    return score;
}

export function has_deadline_word(email: string): number {
    const tokens = tokenize(email);
    const deadline_words: Record<string, number> = {
        "today": 2,
        "tomorrow": 2,
        "deadline": 3,
        "due": 2,
        "tonight": 2
    };
    let score = 0;
    for (const token of tokens) {
        if (token in deadline_words) {
            score += deadline_words[token];
        }
    }
    return score;
}

export function contains_date(email: string): number {
    const lower = email.toLowerCase();
    const date_patterns = [
        /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/,
        /\b\d{4}-\d{2}-\d{2}\b/,
        /\b\d{1,2} (jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b/,
        /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* \d{1,2}\b/
    ];
    for (const pattern of date_patterns) {
        if (pattern.test(lower)) {
            return 1;
        }
    }
    return 0;
}

export function extract_features(email: string): number[] {
    const feature1 = contains_urgent_word(email);
    const feature2 = contains_action_word(email);
    const feature3 = contains_promo_word(email);
    const feature4 = has_deadline_word(email);
    const feature5 = contains_date(email);
    return [feature1, feature2, feature3, feature4, feature5];
}
