export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <img
        src="/404.png"
        alt="Not Found"
        className="max-w-72 mb-4 rounded-xl"
      />
      <p className="text-2xl mt-4 font-bold text-center">
        uh-oh! looks like we’ve hit a wrong note 🎼
      </p>
      <p className="text-lg mt-2 text-center">
        something went off-key, and we can’t find what you’re looking for...😞
      </p>

      <a
        href="/"
        className="mt-4 text-newYellow hover:text-amber-500 transition"
      >
        go back to home
      </a>

      <div className="mt-6 text-center">
        <p className="text-md text-gray-500">
          The{" "}
          <a
            href="https://lyrist.vercel.app/"
            className=" font-bold bg-gradient-to-r from-lyristPink to-lyristPurple inline-block text-transparent bg-clip-text"
          >
            lyrist
          </a>{" "}
          API might be down right now.
        </p>
        <a
          href="/sample-fallback"
          className="inline-block mt-3 px-5 py-2 bg-newYellow text-black font-medium rounded-lg shadow-md hover:bg-amber-400 transition"
        >
          preview with a sample song →
        </a>
      </div>
    </div>
  );
}
