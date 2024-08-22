# Lyrics Share - Dynamic Open Graph Generation

**Inspired by [Spotify](https://spotify.com/) | Powered by [Lyrist](https://lyrist.vercel.app/)**
This project is inspired by the lyrics share feature on Spotify, which allows users to select specific excerpts from a song and share them with friends. The backend generates a custom Open Graph preview image for the selected lyrics, making it easy to share highlighted lyrics visually.

<img align="center" src="example.png"/>

## Features

- **Lyrics Selection**: Search for a song and select lyrics to share with friends.
- **Dynamic OG Image Generation**: Upon selection, the backend generates a custom Open Graph image featuring the selected lyrics.
- **Live Preview**: The generated image is immediately displayed as a preview on the frontend.
- **Dynamic URL Generation**: A unique URL is created for sharing the selected lyrics, with updated metadata.

## Tech Stack

- **Backend** - FastAPI and Pillow
- **Frontend** - Next.js and Tailwind CSS
- **Lyrics API** - [Lyrist](https://lyrist.vercel.app/)

## How It Works
- **Search and Display**: Users search for a song on the frontend. The lyrics are fetched from the Lyrist API and displayed.
- **Lyrics Selection**: Users select the lyrics they wish to share.
- **Image Generation**: Upon clicking "Share," the selected lyrics are sent to the backend, where they are added to a template.
- **Live Update**: The generated image is sent back to the frontend and displayed, along with a dynamically generated URL for sharing.
- **Metadata Update**: The metadata (Open Graph tags) for the page is updated to reflect the selected lyrics and the generated image.

## Future Enhancements
- **Dynamic Backgrounds**: Use the song's cover image to generate unique backgrounds for the preview image.
- **Spotify Integration**: Add Spotify links to the song, allowing users to stream the song directly from the shared link.

## Running the Project Locally
1. Clone the repository 
2. Backend Setup - 
    ```bash
    cd server
    python -m venv venv
    .\venv\Scripts\activate
    pip install -r requirements.txt
    fastapi dev main.py
    ```
3. Frontend Setup - 
    ```bash
    cd frontend 
    npm install
    npm run dev
    ```
## Contributing
Fork this repository and submit a pull request to contribute.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE.txt) file for details.


