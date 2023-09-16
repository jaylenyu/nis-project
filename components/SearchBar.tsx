import { useState, ChangeEvent, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { CountryListProps } from "@/types/components";

export default function SearchBar({ countries }: CountryListProps) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchListRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [showSearchList, setShowSearchList] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const searchList = countries.filter(el =>
    el.commonName.toLowerCase().includes(searchInputValue.toLowerCase()),
  );

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
      const valueToSet =
        focusedIndex !== -1
          ? searchList[focusedIndex].commonName
          : (e.currentTarget as HTMLInputElement).value;
      setSearchInputValue(valueToSet);
      if (focusedIndex === -1) handleSubmit();
    } else if (["ArrowDown", "ArrowUp"].includes(e.key)) {
      handleArrowKeys(e.key);
    }
  };

  const handleArrowKeys = (key: string) => {
    const adjustment = key === "ArrowDown" ? 1 : -1;
    const valid =
      key === "ArrowDown"
        ? focusedIndex < searchList.length - 1
        : focusedIndex > 0;

    if (valid) {
      setFocusedIndex(prevIndex => {
        const newIndex = prevIndex + adjustment;
        scrollToItem(newIndex);
        return newIndex;
      });
    }
  };

  const scrollToItem = (index: number) => {
    const currentItem = searchListRefs.current[index];
    if (currentItem) {
      currentItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const onFocusInput = () => {
    if (searchInputValue.length > 0) setShowSearchList(true);
  };

  const onInsertInputValue = (e: React.MouseEvent<HTMLLIElement>) => {
    setSearchInputValue(e.currentTarget.innerText);

    if (searchInputRef.current !== null) {
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!searchInputRef.current) return;

      if (!searchInputRef.current.contains(e.target as Node)) {
        setShowSearchList(false);
      }
    }

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [searchInputRef]);

  useEffect(() => {
    if (searchInputValue.length > 0) {
      setShowSearchList(true);
      setFocusedIndex(-1);
    }
  }, [searchInputValue]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-40 w-full">
        <div className="w-120 sm:w-full sm:p-4 sx:w-full sx:p-4 ">
          <div className="relative z-20">
            <div className="absolute inset-y-0 left-0 flex justify-center items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
              onFocus={onFocusInput}
              ref={searchInputRef}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-slate-500 focus:border-slate-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              required
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white absolute right-2.5 bottom-2.5 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
            >
              Search
            </button>
          </div>
          <div className="relative -top-1 z-10">
            {showSearchList && (
              <ul className="max-h-60 w-full border border-t-0 leading-8 overflow-auto absolute z-10 bg-white">
                {searchList.map(({ commonName }, idx) => (
                  <li
                    key={idx}
                    ref={el => (searchListRefs.current[idx] = el)}
                    onClick={onInsertInputValue}
                    onKeyDown={onKeyDown}
                    tabIndex={0}
                    className={`p-2 border-b cursor-pointer hover:bg-slate-300 ${
                      idx === focusedIndex ? "bg-slate-300" : ""
                    }`}
                  >
                    {commonName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
