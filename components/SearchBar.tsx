import { useRef } from "react";
import { useRouter } from "next/router";
import { useState, ChangeEvent, useEffect } from "react";
import { CountryListProps } from "@/types/components";

export default function SearchBar({ countries }: CountryListProps) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [showSearchList, setShowSearchList] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (searchInputValue !== "") {
      router.push(`/search?q=${searchInputValue.toLowerCase()}`);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const onFocusInput = () => {
    if (searchInputValue.length > 0) setShowSearchList(true);
  };

  const onInsertInputValue = e => {
    setSearchInputValue(e.target.textContent);
  };

  const searchList = countries.filter(el =>
    el.commonName.toLowerCase().includes(searchInputValue.toLowerCase()),
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchInputRef.current &&
        !(
          searchInputRef.current as unknown as {
            contains: (el: Node) => boolean;
          }
        ).contains(event.target as Node)
      ) {
        setShowSearchList(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchInputValue.length > 0) {
      setShowSearchList(true);
    }
  }, [searchInputValue]);

  return (
    <div className="flex justify-center items-center h-40 w-full">
      <div className="relative w-120">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          value={searchInputValue}
          onChange={handleInputValue}
          onKeyDown={onKeyDown}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-slate-500 focus:border-slate-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="국가를 입력해 주세요."
          required
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="text-white absolute right-2.5 bottom-2.5 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
        >
          검색
        </button>
      </div>
    </div>
  );
}
