export interface SearchHistory {
  [key: string]: Word[];
}

export interface Word {
  partOfSpeech: PartOfSpeech;
  definition: string[];
  word: string;
  firstLetter: string;
}

export type PartOfSpeech = "n" | "v" | "p" | "adj" | "adv" | "c" | "i";

export type IWordDefinition = Word[];

export function isWordDefinition(obj: any): obj is Word {
  if (!obj || obj.length === 0) {
    return false;
  }
  return true;
}
