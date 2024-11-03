from flask import Flask, request, jsonify
from dotenv import load_dotenv
from time import sleep
import logging
from deepgram.utils import verboselogs
from deepgram import (
    DeepgramClient,
    DeepgramClientOptions,
    LiveTranscriptionEvents,
    LiveOptions,
    Microphone,
)
import certifi
import ssl
import requests
import websocket

load_dotenv()

app = Flask(__name__)

is_finals = []
all_transcriptions = []  # List to store each finalized utterance

# Set the SSL context to use certifi's certificate bundle
ssl_context = ssl.create_default_context(cafile=certifi.where())
websocket.setdefaulttimeout(10)
websocket.enableTrace(True)

def get_speech():
    """Records speech, processes it through Deepgram, and returns the transcription."""
    try:
        deepgram = DeepgramClient('14bd690ee7c4bd6f9aacaef36e9f61792b16b58c')
        dg_connection = deepgram.listen.websocket.v("1")

        def on_open(self, open, **kwargs):
            print("Connection Open")

        def on_message(self, result, **kwargs):
            global is_finals, all_transcriptions
            sentence = result.channel.alternatives[0].transcript
            if len(sentence) == 0:
                return
            if result.is_final:
                print(f"Message: {result.to_json()}")
                is_finals.append(sentence)

                if result.speech_final:
                    utterance = " ".join(is_finals)
                    print(f"Speech Final: {utterance}")
                    all_transcriptions.append(utterance)  # Add final utterance to list
                    is_finals = []
                else:
                    print(f"Is Final: {sentence}")
            else:
                print(f"Interim Results: {sentence}")

        def on_metadata(self, metadata, **kwargs):
            print(f"Metadata: {metadata}")

        def on_speech_started(self, speech_started, **kwargs):
            print("Speech Started")

        def on_utterance_end(self, utterance_end, **kwargs):
            global is_finals
            print("Utterance End")
            if len(is_finals) > 0:
                utterance = " ".join(is_finals)
                print(f"Utterance End: {utterance}")
                is_finals = []

        def on_close(self, close, **kwargs):
            print("Connection Closed")

        def on_error(self, error, **kwargs):
            print(f"Handled Error: {error}")

        def on_unhandled(self, unhandled, **kwargs):
            print(f"Unhandled Websocket Message: {unhandled}")

        dg_connection.on(LiveTranscriptionEvents.Open, on_open)
        dg_connection.on(LiveTranscriptionEvents.Transcript, on_message)
        dg_connection.on(LiveTranscriptionEvents.Metadata, on_metadata)
        dg_connection.on(LiveTranscriptionEvents.SpeechStarted, on_speech_started)
        dg_connection.on(LiveTranscriptionEvents.UtteranceEnd, on_utterance_end)
        dg_connection.on(LiveTranscriptionEvents.Close, on_close)
        dg_connection.on(LiveTranscriptionEvents.Error, on_error)
        dg_connection.on(LiveTranscriptionEvents.Unhandled, on_unhandled)

        options: LiveOptions = LiveOptions(
            model="nova-2",
            language="en-US",
            smart_format=True,
            encoding="linear16",
            channels=1,
            sample_rate=16000,
            interim_results=True,
            utterance_end_ms="1000",
            vad_events=True,
            endpointing=300,
        )

        addons = {"no_delay": "true"}

        print("\n\nPress Enter to stop recording...\n\n")
        if not dg_connection.start(options, addons=addons):
            print("Failed to connect to Deepgram")
            return None

        microphone = Microphone(dg_connection.send)
        microphone.start()
        input("")  # Wait for user input to stop recording
        microphone.finish()
        dg_connection.finish()
        print("Finished")

        # Concatenate the collected transcriptions
        concat_transcript = "\n".join(all_transcriptions)
        print("\nFull Transcription:\n", concat_transcript)

        return concat_transcript  # Return the complete transcription

    except Exception as e:
        print(f"Could not open socket: {e}")
        return None