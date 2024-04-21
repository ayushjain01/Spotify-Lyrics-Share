from colorthief import ColorThief
import requests
from io import BytesIO
from PIL import Image

def get_colors(image_url):
    # Open the image with PIL and convert it to RGB mode
    image = Image.open(requests.get(image_url, stream=True).raw).convert('RGB')

    # Convert the PIL Image object to bytes and then to a BytesIO object
    image_bytes = BytesIO()
    image.save(image_bytes, format='PNG')  # Save as PNG for compatibility
    image_bytes.seek(0)  # Reset the pointer to the beginning of the stream

    # Create a ColorThief object using the BytesIO object
    ct = ColorThief(image_bytes)

    # Get the dominant color
    dominant_color = ct.get_color(quality=1)
    
    # Determine text color based on dominant color
    if dominant_color[0] < 125:
        if dominant_color[1] > 125:
            text_color = (0, 0, 0)
        else:
            text_color = (255, 255, 255)
    else:
        text_color = (255, 255, 255)

    return tuple(dominant_color), text_color

print(get_colors("https://www.101computing.net/wp/wp-content/uploads/complementary-colours.png"))
