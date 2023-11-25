"use client";

import React from "react";
import { supportedLanguages } from "@/constants/constants";
import { BiCopy, BiVolumeFull } from "react-icons/bi";

interface TranslatedAreaProps {
  translatedValue: string | null;
  translateTo: string;
  setTranslateTo: React.Dispatch<React.SetStateAction<string>>;
}

const TranslatedArea: React.FC<TranslatedAreaProps> = ({
  translatedValue,
  translateTo,
  setTranslateTo,
}) => {
  const textToSpeach = () => {
    const utterance = new SpeechSynthesisUtterance(
      translatedValue ? translatedValue : ""
    );
    utterance.lang = translateTo;
    speechSynthesis.speak(utterance);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        translatedValue ? translatedValue : ""
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTranslateTo(event.target.value);
  };

  return (
    <div className="relative w-full lg:w-1/2">
      <div className="flex gap-2 mb-2">
        <select
          value={translateTo}
          onChange={handleLanguageChange}
          className="border border-black/10 bg-gray-50 w-full p-2 text-lg rounded-md font-sans font-normal"
        >
          {supportedLanguages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={translatedValue ? translatedValue : ""}
        className="border-r border-b border-l bg-gray-100 w-full px-8 py-6 text-xl rounded-md font-sans font-normal h-full resize-none"
        rows={8}
        readOnly
      />
      <div
        className="absolute bottom-4 right-3 text-2xl z-20 cursor-pointer flex gap-2 opacity-70 hover:opacity-100"
        onClick={copyToClipboard}
      >
        <BiCopy />
      </div>
      <div
        className="absolute bottom-4 right-12 text-2xl z-20 cursor-pointer flex gap-2 opacity-70 hover:opacity-100"
        onClick={textToSpeach}
      >
        <BiVolumeFull />
      </div>
    </div>
  );
};

export default TranslatedArea;
