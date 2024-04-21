from flask import Flask, request
from flask_caching import Cache
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hello World"

@app.route("/health")
def health_check():
    return "API is running"

def to_english(lang, text):
    if lang!="english":
        eng_text =get_llm_response(llm_client, text, lang.capitalize(), "English")
    else:
        eng_text = text
    return eng_text

def make_cache_key(*args, **kwargs):
    return request.url + str(request.data)

@app.route("/get-lyrics/<query>", methods=["POST"])
def translate(query):
    

@app.route("/detect-emotions/<source>", methods=["POST"])
# @cache.cached(timeout=3000, key_prefix=make_cache_key)
def detect_emotions(source):
    text = request.data.decode("utf-8")
    text = to_english(source, text)
    emotions = get_emotion(text)
    return emotions