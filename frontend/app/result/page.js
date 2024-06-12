"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const [track, setTrack] = useState(null);
  const [data, setData] = useState(null);
  const [highlightedLines, setHighlightedLines] = useState({});

  useEffect(() => {
    const trackQueryParam = searchParams.get('track');
    if (trackQueryParam) {
      setTrack(trackQueryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      if (track) {
        try {
          const apiUrl = `https://lyrist.vercel.app/api/${track}`;
          const response = await fetch(apiUrl);
          const resultData = await response.json();
          setData(resultData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, [track]);

  const cleanLyrics = (lyrics) => {
    return lyrics
      .split('\n')
      .filter((line) => line.trim() !== '') 
      .filter((line) => !line.startsWith('[')); 
  };

  const handleLyricsClick = (index) => {
    const highlightedIndices = Object.keys(highlightedLines)
      .filter(key => highlightedLines[key])
      .map(key => parseInt(key));

    if (highlightedIndices.length === 0) {
      setHighlightedLines({ [index]: true });
    } else {
      const minIndex = Math.min(...highlightedIndices);
      const maxIndex = Math.max(...highlightedIndices);

      if (highlightedIndices.includes(index)) {
        const newHighlightedLines = { ...highlightedLines };
        delete newHighlightedLines[index];
        setHighlightedLines(newHighlightedLines);
      } else if (
        (index === minIndex - 1 || index === maxIndex + 1) && 
        highlightedIndices.length < 4
      ) {
        setHighlightedLines((prev) => ({
          ...prev,
          [index]: true,
        }));
      } else {
        setHighlightedLines({ [index]: true });
      }
    }
  };

  const lines = cleanLyrics(data?.lyrics || '');

  const getSelectedLyrics = () => {
    return lines.filter((_, index) => highlightedLines[index]).join('\n');
  };

  const handleShare = () => {
    const selectedLyrics = getSelectedLyrics();
    navigator.clipboard.writeText(selectedLyrics).then(() => {
      console.log('Copied to clipboard:', selectedLyrics);
    }).catch((error) => {
      console.error('Failed to copy to clipboard:', error);
    });
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="w-full max-w-md mx-auto m-8 p-4 text-gray-200 rounded-md relative">
      <h1 className="text-3xl sm:text-4xl md:text-5xl mt-10">Search Results</h1>
      <p className="text-white text-xl mt-4">select lyrics to share</p>
      <div className="flex items-center mb-4 mt-4">
        <img src={data.image} alt={`${data.title}`} className="w-32 h-32 rounded mr-4" />
        <div>
          <h2 className="text-xl font-bold">{data.title}</h2>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Lyrics</h2>
        <div className="space-y-2">
          {lines.map((line, index) => (
            <button
              key={index}
              className={`block w-full text-left p-1 m-0 rounded-md  hover:bg-zinc-950 ${
                highlightedLines[index] ? 'bg-newYellow hover:bg-yellow-950' : 'bg-zinc-900'
              } text-white`}
              onClick={() => handleLyricsClick(index)}
            >
              {line}
            </button>
          ))}
        </div>
      </div>
      {Object.keys(highlightedLines).length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..."
            onClick={handleShare}
          >
            Share Selected Lyrics
          </button>
        </div>
      )}
    </div>
  );
}
