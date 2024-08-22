export default function Navbar() {
  return (
    <nav className="bg-black w-full py-4 fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-center md:justify-between items-center">
        <div className="ml-6 flex items-center">
          <a href="/">
            <p className="text-white flex items-center font-bold">
              <img src="/logo.svg" alt="Logo" className="h-8 mr-4" /> lyrics
              share
            </p>
          </a>
        </div>
        <div className="mr-2 flex items-center hidden md:flex">
          <a
            href="/"
            className="px-2 py-2 text-white flex items-center font-bold border border-black rounded mr-4 hover:border-white"
            >
            learn more
          </a>
          <a href="github.com">
            <img
              src="/github-mark.svg"
              alt="GitHub Logo"
              className="h-8 mr-4"
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
