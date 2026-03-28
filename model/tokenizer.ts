const REGEX_EXTRACT_WORDS_ONLY = /\b\w+\b/g;

export function tokenize(input: string): string[] {
    const matches = input.toLowerCase().match(REGEX_EXTRACT_WORDS_ONLY);
    return matches ?? [];
}
