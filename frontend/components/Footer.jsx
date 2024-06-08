export default function Footer() {
  return (
    <footer className="bg-white w-full py-4 shadow">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-2">
          Inspired by{" "}
          <a href="https://spotify.com" className="text-spotifyGreen font-bold">
            Spotify
          </a>{" "}
          | Powered by{" "}
          <a
            href="https://lyrist.vercel.app/"
            className=" font-bold bg-gradient-to-r from-lyristPink to-lyristPurple inline-block text-transparent bg-clip-text"
          >
            lyrist
          </a>
        </p>
        <a
          href="#"
          className="flex items-center justify-center text-gray-600 font-bold"
        >
          <img src="/logo.svg" alt="Logo" className="h-8 mr-4" /> lyrics share
        </a>
        <p className="text-sm text-gray-600 sm:text-center mt-2 dark:text-gray-400">
          © 2024 | Made by 
          <a href="https://www.linkedin.com/in/ayush---jain/" className="font-bold"> Ayush Jain</a>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
