import ResultPage from "../../../components/ResultPage";
import SuspenseWrapper from "../../../components/SuspenseWrapper";
import { redirect } from "next/navigation";

const cleanLyrics = (lyrics) => {
  return lyrics
    .split("\n")
    .filter((line) => line.trim() !== "")
    .filter((line) => !line.startsWith("["));
};

export async function generateMetadata({ params, searchParams }) {
  const trackName = params.slug[0];
  const urlSearchParams = new URLSearchParams(searchParams);
  const lyrics = urlSearchParams.get("highlighted") || "";

  try {
    const apiUrl = `https://lyrist.vercel.app/api/${trackName}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      if (response.status === 404) {
        redirect("/404");
      } else {
        throw new Error("Error fetching track data");
      }
    }

    const data = await response.json();

    if (!data || !data.title) {
      redirect("/404");
    }

    const metadata = {
      title: `${data.title} - Lyrics Share`,
      description: `${data.title} lyrics`,
      openGraph: {
        title: `${data.title} - Lyrics Share`,
        description: `${data.title} lyrics`,
      },
    };

    const cleanedLyrics = cleanLyrics(data?.lyrics || "");

    if (lyrics != "") {
      const highlightedLines = lyrics.split(",").map(Number);
      const highlightedLyrics = cleanedLyrics
        .filter((line, index) => highlightedLines.includes(index))
        .join("\n");

      metadata.openGraph.images = [
        {
          url: `https://spotify-lyrics-share.onrender.com/get-og/?lyrics=${encodeURIComponent(
            highlightedLyrics
          )}&title=${data.title}`,
          width: 1200,
          height: 630,
        },
      ];
    } else {
      metadata.openGraph.images = [
        {
          url: "https://i.ibb.co/bgKQM17/preview.png",
          width: 1200,
          height: 630,
        },
      ];
    }

    return metadata;
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    redirect("/404");
  }
}

const page = async ({ params, searchParams }) => {
  const trackName = params.slug[0];
  const urlSearchParams = new URLSearchParams(searchParams);
  const highlighted = urlSearchParams.get("highlighted") || "";

  try {
    const apiUrl = `https://lyrist.vercel.app/api/${trackName}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Error fetching track data");
    }

    const data = await response.json();
    let highlightedLines;
    if (highlighted != "") {
      highlightedLines = highlighted.split(",").map(Number);
    }

    return (
      <SuspenseWrapper>
        <ResultPage data={data} highlightedLines={highlightedLines} />
      </SuspenseWrapper>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    redirect("/404");
  }
};

export default page;
