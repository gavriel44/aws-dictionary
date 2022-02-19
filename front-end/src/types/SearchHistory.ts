export interface SearchHistory {
  [key: string]: Word[];
}

export interface Word {
  partOfSpeech: PartOfSpeech;
  definition: string[];
  word: string;
  firstLetter: string;
}

export enum PartOfSpeech {
  n = "noun",
  v = "verb",
  p = "pronoun",
  adj = "adjective",
  adv = "adverb",
  c = "conjunction",
  i = "interjection",
}

export type IWordDefinition = Word[];

export function isWordDefinition(obj: any): obj is Word {
  if (!obj || obj.length === 0) {
    return false;
  }
  return true;
}
