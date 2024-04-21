import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 font-lexend text-center text-newYellow">Lyrics Share</h1>
      <SearchBar />
      <p className="text-center text-sm sm:text-base px-2">Share song lyrics with custom OpenGraph images.</p>
      <a className="bg-newYellow text-black mt-5 px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base" href="/">Learn More</a>
    </div>
  );
}
