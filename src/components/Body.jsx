import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Error from './Error';
import Shimmer from './Shimmer';
import { Howl, Howler } from 'howler';
import {
  addAntonyms,
  addExampleSentences,
  addSynonyms,
  clearSynonymsAntonymsData,
} from '../utils/synonymsAntonyms';
import SynonymAntonym from './SynonymAntonym';
import ExampleSentence from './ExampleSentence';

const Body = () => {
  const dispatch = useDispatch();
  const wordData = useSelector((store) => store.wordMeaning.data);
  const { synonyms, antonyms, exampleSentences } = useSelector(
    (store) => store.synonymsAntonyms
  );

  useEffect(() => {
    if (wordData && wordData?.title !== 'No Definitions Found') {
      dispatch(clearSynonymsAntonymsData());
      wordData[0].meanings.map((elem) => {
        dispatch(addSynonyms(elem.synonyms));
        dispatch(addAntonyms(elem.antonyms));
        elem.definitions.map(
          (child) =>
            child?.example && dispatch(addExampleSentences(child.example))
        );
      });
    }
  }, [wordData]);

  return (
    <div className="bg-gray-200 h-full md:p-10">
      {wordData ? (
        <div className="bg-blue-200 h-full p-6">
          {wordData?.title === 'No Definitions Found' ? (
            <Error />
          ) : (
            <>
              <div className="flex gap-4 items-end">
                <h1 className="text-3xl">
                  {wordData[0].word.charAt(0).toUpperCase() +
                    wordData[0].word.slice(1)}
                </h1>
                <span>{wordData[0].phonetic}</span>
                {wordData[0]?.phonetics[0]?.audio && (
                  <button
                    className="mx-2 text-2xl bg-blue-400"
                    onClick={() => {
                      const audioURL = wordData[0]?.phonetics[0]?.audio;
                      const sound = new Howl({
                        src: [audioURL],
                        html5: true,
                      });
                      Howler.stop();
                      console.log(audioURL);
                      sound.play();
                    }}
                  >
                    🔊
                  </button>
                )}
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
                          - {d.definition}
                        </p>
                      );
                    })}
                  </div>
                );
              })}
              {synonyms.length > 0 && (
                <>
                  <h2 className="text-lg my-4">Synonyms</h2>
                  <ul className="flex gap-4 flex-wrap px-[10%]">
                    {synonyms.map((child, index) => {
                      return (
                        <SynonymAntonym
                          key={child + index}
                          index={index}
                          child={child}
                        />
                      );
                    })}
                  </ul>
                </>
              )}
              {antonyms.length > 0 && (
                <>
                  <h2 className="text-lg my-4">Antonyms</h2>
                  <ul className="flex gap-4 flex-wrap px-[10%]">
                    {antonyms.map((child) => {
                      return <SynonymAntonym key={child} child={child} />;
                    })}
                  </ul>
                </>
              )}
              <ol>
                {exampleSentences.length > 0 && (
                  <>
                    <h2 className="text-lg my-4">Example Sentences</h2>
                    <ol className="list-decimal pl-20">
                      {exampleSentences.map((sentence) => (
                        <ExampleSentence key={sentence} sentence={sentence} />
                      ))}
                    </ol>
                  </>
                )}
              </ol>
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
