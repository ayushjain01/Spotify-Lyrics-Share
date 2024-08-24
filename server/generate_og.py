#CODE NEEDS TO BE CLEANED
from PIL import Image, ImageDraw, ImageFont
import io

def split_text(text, draw, font, max_width):
    lines = []
    lines_content = text.split('\n')
    current_line = ""
    print("lines_content", lines_content)
    for line_content in lines_content:
        words = line_content.split(" ")
        for word in words:
            print("here", word, current_line)
            test_line = f"{current_line} {word}".strip()
            text_width = draw.textlength(test_line, font=font)

            if text_width <= max_width:
                print("hereeee", word, current_line)

                current_line = test_line
            else:
                print("hessssreeee", word, current_line)
                if current_line:
                    lines.append(current_line)
                current_line = word

        if current_line:
            lines.append(current_line)
            current_line = ""

    return lines

def add_text_to_image(image_path, lyrics, lyrics_font_size, lyrics_font_path, song_title, song_title_font_size, song_title_font_path, text_color):
    base_image = Image.open(image_path)
    draw = ImageDraw.Draw(base_image)

    lyrics_font = ImageFont.truetype(lyrics_font_path, lyrics_font_size)
    song_title_font = ImageFont.truetype(song_title_font_path, song_title_font_size)

    max_text_width = 1084
    print(lyrics)
    lyrics_lines = split_text(lyrics, draw, lyrics_font, max_text_width)
    print(lyrics_lines)
    song_title_lines = split_text(song_title, draw, song_title_font, max_text_width)

    lyrics_height = lyrics_font_size * len(lyrics_lines) * 1.2
    song_title_height = song_title_font_size * len(song_title_lines) * 1.2

    text_x = 58
    text_y = ((base_image.height / 1.2) - lyrics_height - song_title_height) / 2

    for line in lyrics_lines:
        draw.text((text_x, text_y), line, fill=text_color, font=lyrics_font)
        text_y += lyrics_font_size * 1.2

    text_y += 20

    for line in song_title_lines:
        draw.text((text_x, text_y), line, fill=text_color, font=song_title_font)
        text_y += song_title_font_size * 1.2

    img_byte_array = io.BytesIO()
    base_image.save(img_byte_array, format="png")
    return img_byte_array.getvalue()

def add_text_to_title(image_path, song_title, song_title_font_size, song_title_font_path, text_color):
    base_image = Image.open(image_path)
    draw = ImageDraw.Draw(base_image)

    song_title_font = ImageFont.truetype(song_title_font_path, song_title_font_size)

    max_text_width = 1000
    song_title_lines = split_text(song_title, draw, song_title_font, max_text_width)
    song_title_height = song_title_font_size * len(song_title_lines) * 1.2

    text_y = ((base_image.height / 1.2) - song_title_height) / 2

    for line in song_title_lines:
        text_width = draw.textlength(line, font=song_title_font)
        text_x = (base_image.width - text_width) / 2

        draw.text((text_x, text_y), line, fill=text_color, font=song_title_font)
        text_y += song_title_font_size * 1.2

    img_byte_array = io.BytesIO()
    base_image.save(img_byte_array, format="png")
    return img_byte_array.getvalue()

def make_og_image(lyrics, song_title):
    template_image_path = r"assets/template.png"
    text_color = (255, 255, 255)

    lyrics_font_path = r"assets/NotoSans-Regular.ttf"
    song_title_font_path = r"assets/NotoSans-Bold.ttf"
    
    image_data = add_text_to_image(
        image_path=template_image_path,
        lyrics=lyrics,
        lyrics_font_size=45,
        lyrics_font_path=lyrics_font_path,
        song_title=song_title,
        song_title_font_size=55,
        song_title_font_path=song_title_font_path,
        text_color=text_color
    )
    
    return image_data

def make_title_image(song_title):
    template_image_path = r"assets/title.png"
    text_color = (39, 39, 39)

    song_title_font_path = r"assets/NotoSans-Bold.ttf"
    
    image_data = add_text_to_title(
        image_path=template_image_path,
        song_title=song_title,
        song_title_font_size=100,
        song_title_font_path=song_title_font_path,
        text_color=text_color
    )
    
    return image_data
