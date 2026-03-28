export const URGENT_IDENTIFIERS = ["urgent", "critical", "important", "asap", "now", "priority"];
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
];
export const DEADLINE_IDENTIFIERS: Record<string, number> = {
    today: 2,
    tomorrow: 2,
    deadline: 3,
    due: 2,
    tonight: 2,
};

export const NUM_CLASSES = 3;
export const FEATURE_COUNT = 5; // must match the number of features returned by extractFeatures()

export const MONTHS = "(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*";
export const DATE_PATTERNS = [
    /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/, // 12/31/2024
    /\b\d{4}-\d{2}-\d{2}\b/, // 2024-12-31
    new RegExp(`\\b\\d{1,2} ${MONTHS}\\b`), // 31 January
    new RegExp(`\\b${MONTHS} \\d{1,2}\\b`), // January 31
];

export enum OutputLabel {
    "IGNORE" = 0,
    "ACTION" = 1,
    "IMPORTANT" = 2,
}
