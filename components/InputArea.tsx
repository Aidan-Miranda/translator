"use client";

import React, { useState, useRef, useEffect } from "react";
import { BiVolumeFull, BiX } from "react-icons/bi";
import { supportedLanguages } from "@/constants/constants";

interface InputAreaProps {
  onInputChange: (inputValue: string) => void;
  translateFrom: string;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setTranslateFrom: React.Dispatch<React.SetStateAction<string>>;
}

const InputArea: React.FC<InputAreaProps> = ({ onInputChange, translateFrom, setTranslateFrom, inputValue, setInputValue }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const delayTime = 600;

    const textToSpeach = () => {
      const utterance = new SpeechSynthesisUtterance(
        inputValue ? inputValue : ""
      );
      utterance.lang = translateFrom;
      speechSynthesis.speak(utterance);
    };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.value == "detect") {
      setTranslateFrom("");
    }
    setTranslateFrom(event.target.value);

  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onInputChange(inputValue);
    }, delayTime);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inputValue, onInputChange]);

  const deleteInput = () => {
    setInputValue("");
    textareaRef.current?.focus();
  };

  return (
    <div className="relative w-full lg:w-1/2">
      <div className="flex gap-2 mb-2">
        <select
          value={translateFrom}
          onChange={handleLanguageChange}
          className="border border-black/10 bg-gray-50 w-full p-2 text-lg rounded-md font-sans font-normal"
        >
          <option value="detect">Detect Language</option>
          {supportedLanguages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
      <textarea
        ref={textareaRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border-r border-b border-l bg-gray-50 resize-none w-full px-8 py-6 text-xl rounded-md font-sans font-normal shadow-md"
        rows={8}
      />
      <div
        className="absolute top-16 right-3 text-2xl z-20 cursor-pointer opacity-70 hover:opacity-100"
        onClick={deleteInput}
      >
        <BiX />
      </div>
      <div
        className="absolute bottom-4 right-3 text-2xl z-20 cursor-pointer opacity-70 hover:opacity-100"
        onClick={textToSpeach}
      >
        <BiVolumeFull />
      </div>
    </div>
  );
};

export default InputArea;
