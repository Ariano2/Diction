import { useRef, useState, useEffect } from 'react';
import useEnglishWordList from '../utils/useEnglishWordList';
import { DICTIONARY_API_URL } from '../constants';
import { useDispatch } from 'react-redux';
import { addWordData, removeWordData } from '../utils/wordMeaningSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [words, setWords] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [search, setSearch] = useState();
  useEnglishWordList(setWords);
  const searchTerm = useRef();

  useEffect(() => {
    const searchSuggestions = () => {
      if (searchTerm.current.value === '') {
        setSuggestions([]);
      } else {
        setSuggestions(
          words
            .filter((word) =>
              word.startsWith(searchTerm.current.value.toLowerCase())
            )
            .slice(0, 10)
        );
      }
    };
    const time = setTimeout(searchSuggestions, 500);
    return () => {
      clearTimeout(time);
    };
  }, [search]);

  const handleSearchSubmit = (word) => {
    const fetchWordData = async () => {
      const data = await fetch(DICTIONARY_API_URL + word);
      const json = await data.json();
      dispatch(removeWordData());
      dispatch(addWordData(json));
    };
    if (word !== '') {
      fetchWordData();
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" p-4 flex bg-gray-500"
        >
          <input
            type="text"
            className="py-2 px-4 w-6/12 border border-black rounded-l-lg"
            placeholder="Search For Words"
            ref={searchTerm}
            onChange={() => setSearch(searchTerm.current.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 200);
            }}
          />
          <button
            className="p-2 bg-green-500 border border-black rounded-r-lg"
            onClick={() => {
              handleSearchSubmit(searchTerm.current.value);
            }}
          >
            Search
          </button>
        </form>
      </div>
      <div>
        {suggestions.length > 0 && showSuggestions && (
          <ul className="absolute w-6/12 bg-slate-50 ml-3">
            {suggestions.map((suggestion) => {
              return (
                <li
                  key={suggestion}
                  className="p-2 hover:bg-slate-200 shadow-lg shadow-slate-200 z-10 hover:underline"
                  onClick={(e) => {
                    handleSearchSubmit(e.target.textContent);
                  }}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
