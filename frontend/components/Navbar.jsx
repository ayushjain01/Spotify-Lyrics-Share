export default function Navbar() {
  return (
    <nav className="bg-white w-full py-4 shadow fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="ml-4">
          <a href="#">
            <p className="text-gray-600 flex items-center font-bold">
              <img src="/logo.svg" alt="Logo" className="h-8 mr-4" /> lyrics
              share
            </p>
          </a>
        </div>
        <div className="mr-2 flex items-center">
        <a href="/" className="mr-4 text-gray-600">
            Learn More
          </a>
          <a href="github.com">
            <img src="/github-mark.svg" alt="Logo" className="h-8 mr-4" />
          </a>
        </div>
      </div>
    </nav>
  );
}
