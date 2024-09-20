import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineSearch, AiOutlineAudio } from "react-icons/ai";
import { setSearchParam } from "../../../store/Reducer/searchParamSlice";

const dynamicNames = [
  "Rice",
  "Flour",
  "Lentils",
  "Spices",
  "Vegetables",
  "Fruits",
  "Cooking Oil",
  "Milk",
  "Bread",
  "Eggs",
  "Sugar",
  "Salt",
  "Tea",
];

const HeaderSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const { pathname } = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [isPageSearch, setIsPageSearch] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (pathname === "/search") {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setIsPageSearch(true);
    } else {
      setIsPageSearch(false);
      timerRef.current = setInterval(() => {
        setIndex((prevIndex) =>
          prevIndex === dynamicNames.length - 1 ? 0 : prevIndex + 1
        );
      }, 1500);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [pathname]);

  const onDivClick = () => {
    navigate("/search");
  };

  const debounceTimerRef = useRef(null);
  useEffect(() => {
    if (searchInput.trim() === "") {
      dispatch(setSearchParam(""));
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    } else {
      debounceTimerRef.current = setTimeout(() => {
        dispatch(setSearchParam(searchInput));
      }, 1000);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchInput, dispatch]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => {
        setIsListening(false);
      };
      recognitionRef.current = recognition;
    }
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div
      onClick={onDivClick}
      className={`${
        isPageSearch ? "shadow-lg" : "shadow-none"
      } transition-all col-start-1 overflow-hidden col-span-5 md:col-auto md:col-start-auto w-full shrink rounded-xl px-3 bg-gray-100 flex items-center`}
    >
      <AiOutlineSearch className="text-2xl" />
      <input
        className="outline-none transition-all w-full bg-gray-100 ml-3 px-2 h-12"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={
          isPageSearch
            ? "Search for atta dal and more"
            : `Search ${dynamicNames[index]}`
        }
      />
      <div
        className="relative flex items-center justify-center ml-3"
        onClick={(e) => {
          e.stopPropagation(); // Prevent navigating to the search page on mic click
          handleMicClick();
        }}
      >
        <AiOutlineAudio
          className={`text-2xl cursor-pointer ${
            isListening ? "text-red-500" : ""
          }`}
          title={isListening ? "Listening..." : "Click to speak"}
        />
        {isListening && (
          <div className="absolute animate-ping rounded-full h-10 w-10 bg-red-400 opacity-75"></div>
        )}
      </div>
    </div>
  );
};

export default HeaderSearch;
