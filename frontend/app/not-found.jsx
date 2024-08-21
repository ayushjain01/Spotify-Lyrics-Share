export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <img
        src="/404.png"
        alt="Not Found"
        className="max-w-72 mb-4 rounded-xl"
      />
      <p className="text-2xl mt-4 font-bold">uh-oh! looks like we’ve hit a wrong note 🎼</p>
      <p className="text-lg mt-2 text-center">
      something went off-key, and we can’t find what you’re looking for...😞
      </p>
      <a href="/" className="mt-4 text-newYellow hover:text-amber-500">
        go back to home
      </a>
    </div>
  );
}
