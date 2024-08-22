export default function LearnMore() {
    return (
      <div className="flex flex-col items-center min-h-screen px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 text-center text-newYellow">
          lyrics share
        </h1>
        <p className="text-base sm:text-md text-center max-w-3xl mx-auto mb-8">
          This project is inspired by the lyrics share feature on Spotify, which allows users to select specific excerpts from a song and share them with friends. The backend generates a custom Open Graph preview image for the selected lyrics, making it easy to share highlighted lyrics visually.
        </p>
        <img
          src="/example.png"
          alt="Spotify Lyrics Share Example"
          className="rounded-xl w-full max-w-4xl h-auto object-cover"
        />
      </div>
    );
  }
  