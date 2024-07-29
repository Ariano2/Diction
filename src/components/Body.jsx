import { useSelector } from 'react-redux';
import ERROR_IMG_URL from '../assets/dinoDisappoint.jpg';
import Shimmer from './Shimmer';

const Body = () => {
  const wordData = useSelector((store) => store.wordMeaning.data);
  return (
    <div className="bg-gray-200 h-screen p-10">
      {wordData ? (
        <div className="bg-blue-200 h-full p-6">
          {wordData?.title === 'No Definitions Found' ? (
            <>
              <p className="mb-2 text-red-500 text-2xl">No Definitions Found</p>
              <p className="my-1 text-red-500 text-xl">
                {
                  "Sorry pal, we couldn't find definitions for the word you were looking for"
                }
              </p>
              <p className="my-4 text-red-500 text-xl">
                You can try the search again at later time or head to the web
                instead.
              </p>
              <img
                alt="cute error message photo"
                src={ERROR_IMG_URL}
                className="w-96"
              />
            </>
          ) : (
            <>
              <div className="flex gap-4 items-end">
                <h1 className="text-3xl">
                  {wordData[0].word.charAt(0).toUpperCase() +
                    wordData[0].word.slice(1)}
                </h1>
                <span>{wordData[0].phonetic}</span>
              </div>
              <h2 className="text-lg my-4">Definition</h2>
              {wordData[0].meanings.map((elem, index) => {
                return (
                  <div key={index}>
                    <p className="font-bold my-2" key={index}>
                      {elem.partOfSpeech}
                    </p>
                    {elem.definitions.map((d) => {
                      return (
                        <p className="px-4 my-1" key={d.definition}>
                          {' '}
                          - {d.definition}
                        </p>
                      );
                    })}
                  </div>
                );
              })}
            </>
          )}
        </div>
      ) : (
        <Shimmer />
      )}
    </div>
  );
};

export default Body;
