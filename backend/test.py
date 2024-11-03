from speechtotext import get_speech

def main():
    transcription = get_speech()

    print("Transcription received in main_app:\n", transcription)
    # Pass `transcription` to your LLM for further processing if needed


if __name__ == "__main__":
    main()
