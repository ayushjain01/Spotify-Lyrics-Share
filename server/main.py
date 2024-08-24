from fastapi.responses import FileResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Query
from apscheduler.schedulers.background import BackgroundScheduler
import requests

import generate_og
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://spotify-lyrics-share.vercel.app"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

@app.get("/")
async def root():
    return {"message": "Hello World!"}

@app.get("/get-og")
async def get_og(
    lyrics: str = Query(..., description="The lyrics to include in the OG image"),
    title: str = Query(..., description="The title of the track")
):    
    img = generate_og.make_og_image(lyrics, title) 
    return Response(content=img, media_type="image/png")

@app.get("/get-og-title")
async def get_og(
    title: str = Query(..., description="The title of the track")
):    
    img = generate_og.make_title_image( title) 
    return Response(content=img, media_type="image/png")

#This function is only to tackle the problem of automatic spin down of instance on render due to inactivity 
def ping_server():
    try:
        requests.get("https://spotify-lyrics-share.onrender.com/")
        print("Pinged Server Successfully")
    except Exception as e:
        print(f"An error occurred while pinging the server: {e}")

scheduler = BackgroundScheduler()
scheduler.add_job(ping_server, "interval", minutes=10)
scheduler.start()