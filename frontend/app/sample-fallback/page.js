import ResultPage from "../../components/ResultPage";
import SuspenseWrapper from "../../components/SuspenseWrapper";

const FALLBACK_SONG = {
  title: "The Night We Met",
  lyrics: `I am not the only traveler
Who has not repaid his debt
I've been searching for a trail to follow again
Take me back to the night we met
And then I can tell myself
What the hell I'm supposed to do
And then I can tell myself
Not to ride along with you
I had all and then most of you
Some and now none of you
Take me back to the night we met
I don't know what I'm supposed to do
Haunted by the ghost of you
Oh, take me back to the night we met
When the night was full of terrors
And your eyes were filled with tears
When you had not touched me yet
Oh, take me back to the night we met
I had all and then most of you
Some and now none of you
Take me back to the night we met
I don't know what I'm supposed to do
Haunted by the ghost of you
Take me back to the night we met`,
  image: "https://i.scdn.co/image/ab67616d00001e0217875a0610c23d8946454583",
  fallback: true,
};

export const metadata = {
  title: "Sample Song - Lyrics Share",
  description:
    "Lyrist API is down — showing a default sample song for previewing the app.",
  openGraph: {
    title: "Sample Song - Lyrics Share",
    description:
      "Lyrist API is down — showing a default sample song for previewing the app.",
    images: [
      {
        url: `https://spotify-lyrics-share.onrender.com/get-og-title/?title=${FALLBACK_SONG.title}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function SampleFallbackPage() {
  return (
    <SuspenseWrapper>
      <ResultPage data={FALLBACK_SONG} highlightedLines={[]} />
    </SuspenseWrapper>
  );
}
