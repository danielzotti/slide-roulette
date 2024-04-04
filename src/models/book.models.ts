export interface Line {
    en: string;
    fr: string;
}

export type Page = Record<number, Line>;

export type Book = Record<number, Page>;

export type BookArray = Array<{
    page: number;
    line: number;
    en: string;
    fr: string;
}>;
