import os
import json
import requests
from pydub import AudioSegment
from pydub.playback import play
from speechtotext import get_speech  # Import the speech-to-text function
import certifi
import ssl

# Set the SSL context to use certifi's certificate bundle
ssl_context = ssl.create_default_context(cafile=certifi.where())

def text_to_speech(text, output_file='output.mp3'):
    url = "https://api.deepgram.com/v1/speak?model=aura-asteria-en"
    headers = {
        "Authorization": f"Token {os.getenv('DEEPGRAM_API_KEY')}",
        "Content-Type": "application/json",
    }
    data = json.dumps({"text": text})

    try:
        response = requests.post(url, headers=headers, data=data, stream=True, verify=certifi.where())

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
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")

def play_audio(file_path):
    try:
        audio = AudioSegment.from_mp3(file_path)
        play(audio)
    except Exception as e:
        print(f"Failed to play audio: {e}")

def read_passage_from_file(file_path='passage.json'):
    with open(file_path, 'r') as file:
        data = json.load(file)
    passage = data['passage']
    questions = data['questions']
    return passage, questions

if __name__ == "__main__":
    passage, questions = read_passage_from_file()
    print("Passage generated. It will not be read aloud.")

    for question in questions:
        input("Press Enter to hear the next question...")
        text_to_speech(question)
        print("Listening for the student's answer...")
        answer = get_speech()  # Capture the student's spoken answer
        print(f"Student's answer: {answer}")
        # Here you can add logic to save the answer or process it further