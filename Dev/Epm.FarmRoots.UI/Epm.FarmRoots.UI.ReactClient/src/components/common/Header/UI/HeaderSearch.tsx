import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { setSearchParam } from "../../../store/Reducer/searchParamSlice";

const dynamicNames: string[] = [
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
  "Tea"
  ];


const HeaderSearch : React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[index, setIndex] = useState<number>(0);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const {pathname} = useLocation();  
    const [searchInput, setSearchInput] = useState<string>("");
    const [isPageSearch, setIsPageSearch] = useState<boolean>(false);
    
    // useeffect

    useEffect(() => {
        if(pathname === '/search') {
            if(timerRef.current) {
                clearInterval(timerRef.current);
            }
            setIsPageSearch(true);
        } else {
            setIsPageSearch(false);
            timerRef.current = setInterval(() => {
                setIndex((prevIndex) => (prevIndex === dynamicNames.length - 1 ? 0 : prevIndex + 1));
            }, 1500);
        } 

        return () => {
            if(timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [pathname]);

    const onDivClick = () => {
        navigate("/search");
    };

    // have to write debouncing logic
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => {
        if(searchInput.trim() === "") {
            dispatch(setSearchParam(""));
            if(debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        } else {
            debounceTimerRef.current = setTimeout(() => {
                dispatch(setSearchParam(searchInput));
            },1000);
        };

        return () => {
            if(debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [searchInput, dispatch]);

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
            </div>
    )

   
};


export default HeaderSearch;