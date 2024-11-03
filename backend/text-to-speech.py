import os
import json
import requests
from pydub import AudioSegment
from pydub.playback import play

def text_to_speech(text, output_file='output.mp3'):
    url = "https://api.deepgram.com/v1/speak?model=aura-asteria-en"
    headers = {
        "Authorization": f"Token {os.getenv('DEEPGRAM_API_KEY')}",
        "Content-Type": "application/json",
    }
    data = json.dumps({"text": text})

    response = requests.post(url, headers=headers, data=data, stream=True)

    if response.status_code == 200:
        with open(output_file, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"MP3 file saved as {output_file}")
        play_audio(output_file)
        os.remove(output_file)
        print(f"MP3 file {output_file} deleted")
    else:
        print(f"Error: {response.status_code}, {response.text}")

def play_audio(file_path):
    audio = AudioSegment.from_mp3(file_path)
    play(audio)

if __name__ == "__main__":
    text = "The sun had just begun to rise over the sleepy town of Millfield."
    text_to_speech(text)