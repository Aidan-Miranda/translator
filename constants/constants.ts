export interface Language {
  code: string;
  name: string;
}

export const supportedLanguages: Language[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "ko", name: "Korean" },
  { code: "pt", name: "Portuguese" },
  { code: "zh", name: "Chinese"},
  { code: "ja", name: "Japanese"},
  { code: "de", name: "German"},
  { code: "it", name: "Italian"},
];
