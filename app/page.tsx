"use client";
import InputArea from "@/components/InputArea";
import TranslatedArea from "@/components/TranslatedArea";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  HiOutlineSwitchHorizontal,
  HiOutlineSwitchVertical,
} from "react-icons/hi";

export default function Home() {
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [translateFrom, setTranslateFrom] = useState<string>("");
  const [translateTo, setTranslateTo] = useState<string>("en");
  const [isMobile, setIsMobile] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const swapLanguage = () => {
    const temp = translateFrom;
    if (temp === "" || temp === "detect") {
      setInputValue(translatedText ? translatedText : "");
      setTranslatedText("");
      return;
    }
    setTranslateFrom(translateTo);
    setTranslateTo(temp);
    setInputValue(translatedText ? translatedText : "");
  };

  const translateInput = async (inputValue: string) => {
    const params = {
      to: translateTo,
      "api-version": "3.0",
      profanityAction: "NoAction",
      from: "",
      textType: "plain",
    };

    if (translateFrom && translateFrom !== "detect") {
      params["from"] = translateFrom;
    } else {
      params["from"] = "";
    }

    const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      params: params,
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "e995a0154dmsh3e13c186a9780dfp1d9664jsn856a9684e785",
        "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
      },
      data: [
        {
          Text: inputValue,
        },
      ],
    };

    try {
      const response = await axios.request(options);
      setTranslatedText(response.data[0].translations[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-24 bg-gray-50">
      <div className="relative z-10 max-w-5xl w-full items-center gap-10 justify-between font-mono text-sm flex flex-col lg:flex-row">
        <InputArea
          onInputChange={translateInput}
          setTranslateFrom={setTranslateFrom}
          translateFrom={translateFrom}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        {isMobile ? (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            onClick={swapLanguage}
          >
            <HiOutlineSwitchVertical className="text-2xl opacity-70 hover:opacity-100" />
          </div>
        ) : (
          <div
            className="absolute top-2 left-1/2 transform -translate-x-1/2"
            onClick={swapLanguage}
          >
            <HiOutlineSwitchHorizontal className="text-2xl opacity-70 hover:opacity-100" />
          </div>
        )}
        <TranslatedArea
          translatedValue={translatedText}
          setTranslateTo={setTranslateTo}
          translateTo={translateTo}
        />
      </div>
    </main>
  );
}
