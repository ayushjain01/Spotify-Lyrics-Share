"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Audio } from "react-loader-spinner";

export default function ResultPage({
  data,
  highlightedLines,
}) {
  const router = useRouter();
  const [ogImageUrl, setOgImageUrl] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLines, setSelectedLines] = useState(highlightedLines || []);
  const [selectionStart, setSelectionStart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateUrlWithHighlightedLines = () => {
      const highlightedIndices = selectedLines.join(",");
      const newUrl = new URL(window.location.href);
      if (highlightedIndices) {
        newUrl.searchParams.set("highlighted", highlightedIndices);
      } else {
        newUrl.searchParams.delete("highlighted");
      }
      router.push(newUrl.toString(), { scroll: false });
    };

    updateUrlWithHighlightedLines();
  }, [selectedLines, router]);

  const cleanLyrics = (lyrics) => {
    return lyrics
      .split("\n")
      .filter((line) => line.trim() !== "")
      .filter((line) => !line.startsWith("["));
  };

  const handleLyricsClick = (index) => {
    const highlightedIndices = selectedLines;

    if (highlightedIndices.length === 0) {
      setSelectedLines([index]);
      setSelectionStart(index);
    } else {
      const minIndex = Math.min(...highlightedIndices);
      const maxIndex = Math.max(...highlightedIndices);

      if (highlightedIndices.includes(index)) {
        setSelectedLines(highlightedIndices.filter((i) => i !== index));
        if (index === selectionStart) {
          setSelectionStart(null);
        }
      } else if (
        (index === minIndex - 1 || index === maxIndex + 1) &&
        highlightedIndices.length < 4
      ) {
        setSelectedLines((prev) => [...prev, index]);
      } else {
        setSelectedLines([index]);
        setSelectionStart(index);
      }
    }
  };

  const lines = cleanLyrics(data?.lyrics || "");

  const getSelectedLyrics = () => {
    return lines
      .map((line, index) => (selectedLines.includes(index) ? line : null))
      .filter((line) => line !== null)
      .join("\n");
  };

  const handleShare = async () => {
    const selectedLyrics = getSelectedLyrics();
    const newUrl = new URL(window.location.href);
    const shareUrl = newUrl.toString();

    setShowPopup(true);
    setIsLoading(true);

    try {
      const url =
        "https://spotify-lyrics-share.onrender.com/get-og?" +
        new URLSearchParams({
          lyrics: selectedLyrics,
          title: data.title,
        });
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch OG image");
      const ogImageBlob = await response.blob();
      const ogImageObjectUrl = URL.createObjectURL(ogImageBlob);
      setOgImageUrl(ogImageObjectUrl);
      setIsLoading(false);

      await navigator.clipboard.writeText(shareUrl);
      console.log("Copied URL to clipboard:", shareUrl);
    } catch (error) {
      console.error("Error handling share:", error);
      setIsLoading(false);
      router.push("/404");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setOgImageUrl(null);
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="w-full max-w-md mx-auto m-8 pt-16 text-gray-200 rounded-md relative">
      <h1 className="text-3xl sm:text-4xl md:text-5xl flex items-center space-x-4">
        <a
          className="text-white text-xl bg-newYellow hover:bg-amber-500 rounded-md px-4 py-2 flex items-center"
          href="/"
        >
          <svg
            fill="#000000"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <rect
              width="24"
              height="24"
              transform="rotate(90 12 12)"
              opacity="0"
            ></rect>
            <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"></path>
          </svg>
        </a>
        <span>search results</span>
      </h1>

      <p className="text-white text-xl mt-4">select lyrics to share</p>
      <div className="flex items-center mb-4 mt-4">
        <img
          src={data.image}
          alt={`${data.title}`}
          className="w-32 h-32 rounded mr-4 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-xl font-bold">{data.title}</h2>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">lyrics</h2>
        <div className="space-y-2">
          {lines.map((line, index) => (
            <button
              key={index}
              className={`block w-full text-left p-1 pl-2 m-0 rounded-md ${
                selectedLines.includes(index)
                  ? "bg-newYellow hover:bg-yellow-500 text-zinc-800"
                  : "bg-zinc-900 hover:bg-zinc-800"
              } text-white`}
              onClick={() => handleLyricsClick(index)}
            >
              {line}
            </button>
          ))}
        </div>
      </div>
      {selectedLines.length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center">
          <button
            className="px-4 py-2 bg-newYellow text-zinc-800 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            onClick={handleShare}
          >
            share selected lyrics
          </button>
        </div>
      )}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="relative bg-white p-4 rounded-md">
            <button
              className="absolute top-2 right-2 text-red-500 font-bold text-2xl"
              onClick={closePopup}
            >
              &times;
            </button>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Audio
                  height="80"
                  width="80"
                  color="#FFC700"
                  ariaLabel="loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              <>
                <p className="text-center m-2 text-zinc-800">
                  custom generated open graph image:
                </p>
                <img
                  src={ogImageUrl}
                  alt="OG Image"
                  className="w-full max-w-md"
                />
                <p className="text-center m-2 text-zinc-800">
                  link copied to your clipboard.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
