export const URGENT_IDENTIFIERS = [
    "urgent",
    "critical",
    "important",
    "asap",
    "now",
    "priority",
    "alert",
    "warning",
    "suspicious",
    "immediate",
    "immediately",
];
export const ACTION_IDENTIFIERS = [
    "submit",
    "review",
    "check",
    "update",
    "confirm",
    "approve",
    "send",
    "complete",
    "verify",
    "respond",
    "fix",
    "resolve",
    "investigate",
    "action",
];
export const PROMO_IDENTIFIERS = [
    "offer",
    "discount",
    "sale",
    "deal",
    "free",
    "cashback",
    "coupon",
    "voucher",
    "buy",
    "limited",
    "exclusive",
    "save",
    "win",
    "bonus",
    "gift",
    "shop",
    "price",
    "off",
    "promo",
    "deals",
    "newsletter",
    "news",
    "update",
    "trending",
    "lifestyle",
    "earn",
    "money",
    "products",
    "arrivals",
    "upgrade",
    "latest",
    "weekly",
    "daily",
    "top",
    "best",
    "mega",
    "flash",
    "hot",
];
export const ESCALATION_IDENTIFIERS = [
    "escalation",
    "escalated",
    "suspended",
    "blocked",
    "penalty",
    "warning",
    "violation",
    "breach",
    "failure",
    "outage",
    "downtime",
    "broken",
    "failed",
];
export const DEADLINE_IDENTIFIERS: Record<string, number> = {
    today: 2,
    tomorrow: 2,
    deadline: 3,
    due: 2,
    tonight: 2,
    eod: 3,
    immediately: 3,
    immediate: 3,
    last: 1,
    final: 2,
};

export enum OutputLabel {
    "IGNORE" = 0,
    "ACTION" = 1,
    "IMPORTANT" = 2,
}

export const HIDDEN_SIZE = 3; // number of hidden layer neurons
export const OUTPUT_SIZE = Object.values(OutputLabel).filter((v) => typeof v === "number").length;

export const MONTHS = "(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*";
export const DATE_PATTERNS = [
    /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/, // 12/31/2024
    /\b\d{4}-\d{2}-\d{2}\b/, // 2024-12-31
    new RegExp(`\\b\\d{1,2} ${MONTHS}\\b`), // 31 January
    new RegExp(`\\b${MONTHS} \\d{1,2}\\b`), // January 31
];
