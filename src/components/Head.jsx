import useOnlineStatus from '../utils/useOnlineStatus.js';

const Head = () => {
  const onlineStatus = useOnlineStatus();
  return (
    <div className="p-4 bg-gray-200 flex justify-between items-center">
      <h1>
        <span className="text-3xl">Diction</span> - The minimalistic dictionary
      </h1>
      <span>{onlineStatus ? 'Online : 🟢' : 'Offline : 🔴'}</span>
    </div>
  );
};

export default Head;
