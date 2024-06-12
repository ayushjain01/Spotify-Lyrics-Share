import { useEffect } from 'react';
import { Audio } from 'react-loader-spinner';

const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <Audio
        height="80"
        width="80"
        color="#FFC700"
        ariaLabel="loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p className="text-white text-xl mt-4">Loading, please wait...</p>
      <p className="text-center text-sm sm:text-base mt-4"><strong>Note:</strong> Search results might not be entirely accurate.</p>
    </div>
  );
};

export default Loading;
