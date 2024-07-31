import ERROR_IMG_URL from '../assets/dinoDisappoint.jpg';

const Error = () => {
  return (
    <>
      <p className="mb-2 text-red-500 text-2xl">No Definitions Found</p>
      <p className="my-1 text-red-500 text-xl">
        {
          "Sorry pal, we couldn't find definitions for the word you were looking for"
        }
      </p>
      <p className="my-4 text-red-500 text-xl">
        You can try the search again at later time or head to the web instead.
      </p>
      <img
        alt="cute error message photo"
        src={ERROR_IMG_URL}
        className="w-96"
      />
    </>
  );
};

export default Error;
