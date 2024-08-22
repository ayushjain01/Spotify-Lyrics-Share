"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Suspense } from 'react';

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [track, setTrack] = useState(null);
  const [data, setData] = useState(null);
  const [highlightedLines, setHighlightedLines] = useState({});
  const [ogImageUrl, setOgImageUrl] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const trackQueryParam = searchParams.get("track");
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

          if (response.ok) {
            const resultData = await response.json();

            if (!resultData || !resultData.title) {
              router.push("/404");
              return;
            }

            setData(resultData);
            const highlighted = searchParams.get("highlighted");
            if (highlighted) {
              const indices = highlighted.split(",").map(Number);
              const highlightedObj = indices.reduce((acc, index) => {
                acc[index] = true;
                return acc;
              }, {});
              setHighlightedLines(highlightedObj);
            }

            let tag = document.querySelector('meta[property="og:title"]');
            if (tag) {
              tag.setAttribute("content", resultData.title);
            } else {
              const newTag = document.createElement("meta");
              newTag.setAttribute("property", "og:title");
              newTag.setAttribute("content", resultData.title);
              document.head.appendChild(newTag);
            }

            tag = document.querySelector('meta[property="og:description"]');
            if (tag) {
              tag.setAttribute(
                "content",
                resultData.title + " Song lyrics with custom open graph"
              );
            } else {
              const newTag = document.createElement("meta");
              newTag.setAttribute("property", "og:description");
              newTag.setAttribute(
                "content",
                resultData.title + " Song lyrics with custom open graph"
              );
              document.head.appendChild(newTag);
            }

            tag = document.querySelector('meta[name="description"]');
            if (tag) {
              tag.setAttribute(
                "content",
                resultData.title + " Song lyrics with custom open graph"
              );
            } else {
              const newTag = document.createElement("meta");
              newTag.setAttribute("name", "description");
              newTag.setAttribute(
                "content",
                resultData.title + " Song lyrics with custom open graph"
              );
              document.head.appendChild(newTag);
            }

            tag = document.querySelector("title");
            if (tag) {
              tag.textContent = resultData.title;
            } else {
              const newTag = document.createElement("title");
              newTag.textContent = resultData.title;
              document.head.appendChild(newTag);
            }
          } else if (response.status === 404) {
            router.push("/404");
          } else {
            console.error("Error fetching data:", response.status);
            router.push("/404");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          router.push("/404");
        }
      }
    };
    fetchData();
  }, [track, searchParams, router]);

  useEffect(() => {
    const updateUrlWithHighlightedLines = () => {
      const highlightedIndices = Object.keys(highlightedLines)
        .filter((key) => highlightedLines[key])
        .map((key) => parseInt(key))
        .join(",");

      const newUrl = new URL(window.location.href);
      if (highlightedIndices) {
        newUrl.searchParams.set("highlighted", highlightedIndices);
      } else {
        newUrl.searchParams.delete("highlighted");
      }
      router.push(newUrl.toString(), { scroll: false });
    };

    updateUrlWithHighlightedLines();
  }, [highlightedLines, router]);

  useEffect(() => {
    if (ogImageUrl) {
      const metaTag = document.querySelector('meta[property="og:image"]');
      if (metaTag) {
        metaTag.setAttribute("content", ogImageUrl);
      } else {
        const newMetaTag = document.createElement("meta");
        newMetaTag.setAttribute("property", "og:image");
        newMetaTag.setAttribute("content", ogImageUrl);
        document.head.appendChild(newMetaTag);
      }
    }
  }, [ogImageUrl]);

  const cleanLyrics = (lyrics) => {
    return lyrics
      .split("\n")
      .filter((line) => line.trim() !== "")
      .filter((line) => !line.startsWith("["));
  };

  const handleLyricsClick = (index) => {
    const highlightedIndices = Object.keys(highlightedLines)
      .filter((key) => highlightedLines[key])
      .map((key) => parseInt(key));

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

  const lines = cleanLyrics(data?.lyrics || "");

  const getSelectedLyrics = () => {
    return lines.filter((_, index) => highlightedLines[index]).join("\n");
  };

  const handleShare = async () => {
    const selectedLyrics = getSelectedLyrics();
    const newUrl = new URL(window.location.href);
    const shareUrl = newUrl.toString();

    try {
      const response = await fetch(
        "http://localhost:8000/get-og?" +
          new URLSearchParams({
            lyrics: selectedLyrics,
            title: data.title,
          })
      );
      const ogImageBlob = await response.blob();
      const ogImageObjectUrl = URL.createObjectURL(ogImageBlob);

      setOgImageUrl(ogImageObjectUrl);
      setShowPopup(true);

      await navigator.clipboard.writeText(shareUrl);
      console.log("Copied URL to clipboard:", shareUrl);
    } catch (error) {
      console.error("Error handling share:", error);
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
    <Suspense fallback={<div>Loading...</div>}>
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
              className={`block w-full text-left p-1 m-0 rounded-md ${
                highlightedLines[index]
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
      {Object.keys(highlightedLines).length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center">
          <button
            className="px-4 py-2 bg-newYellow text-zinc-800 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            onClick={handleShare}
          >
            share selected lyrics
          </button>
        </div>
      )}
      {showPopup && ogImageUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="relative bg-white p-4 rounded-md">
            <button
              className="absolute top-2 right-2 text-red-500 font-bold text-2xl"
              onClick={closePopup}
            >
              &times;
            </button>
            <p className="text-center m-2 text-zinc-800">
              custom generated open graph image:
            </p>
            <img src={ogImageUrl} alt="OG Image" className="w-full max-w-md" />
            <p className="text-center m-2 text-zinc-800">
              link copied to your clipboard.
            </p>
          </div>
        </div>
      )}
    </div>
    </Suspense>
  );
}
