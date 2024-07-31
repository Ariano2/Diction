import { useDispatch } from 'react-redux';
import { DICTIONARY_API_URL } from '../constants';
import { removeWordData, addWordData } from '../utils/wordMeaningSlice';

const SynonymAntonym = ({ child, index }) => {
  const dispatch = useDispatch();
  const fetchWordData = async (word) => {
    const data = await fetch(DICTIONARY_API_URL + word);
    const json = await data.json();
    dispatch(removeWordData());
    dispatch(addWordData(json));
  };
  return (
    <li
      className="rounded-lg bg-gray-200 p-2 hover:bg-gray-400 hover:cursor-pointer"
      key={child + index}
      onClick={(e) => {
        const word = e.target.textContent;
        fetchWordData(word);
      }}
    >
      {child}
    </li>
  );
};

export default SynonymAntonym;
