from PyPDF2 import PdfReader
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
import json
import time
import os
import sys

# Set OpenAI API key
os.environ["OPENAI_API_KEY"] = "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"

# Initialize the language model
llm = ChatOpenAI(model='gpt-4o-mini', temperature=0.8)

def generate_passage():
    """
    Generates a reading comprehension passage suitable for a grade 5 English curriculum.
    
    Returns:
        str: A short story or passage (100-150 words) for grade 5 reading levels.
    """
    # Define the prompt template for passage generation
    passage_template = PromptTemplate(
        input_variables=['placeholder'],
        template = """
        You are an AI language model designed to create reading comprehension passages and questions for a grade 5 English curriculum.
        
        Task:
        1. Generate a Passage: Create a short, engaging story (200-250 words) for 10- to 11-year-old students with new characters and new storylnes each time. Ensure the passage is age-appropriate, with simple vocabulary, friendly tone, and a theme such as friendship, teamwork, nature, or curiosity.
        2. Generate Questions: Based on the passage, create three comprehension questions that are suitable for 5th graders. Make sure each question directly relates to the passage.


        Strictly output the response in JSON format with the following structure:
        "passage": "<Your generated passage>",
            "questions": [
                "Question 1",
                "Question 2",
                "Question 3"
        """
    )

    # Set up the LangChain for generating the passage
    passage_chain = passage_template | llm
    response = passage_chain.invoke({"placeholder": ""})
    return response.content.strip()


def analyze_response(user_input):
    """
    Uses the LLM to analyze the kid's response for sentiment or understanding.
    
    Args:
        user_input (str): The response from the kid.
    
    Returns:
        str: A response or feedback based on the input.
    """
    analysis_prompt = PromptTemplate(
        input_variables=["user_input"],
        template="""Analyze the following response from a kid in terms of understanding and engagement.
        Provide feedback that would be encouraging and guide the kid to answer questions confidently.

        Kid's Response: "{user_input}"
        """
    )
    analysis_chain = analysis_prompt | llm
    response = analysis_chain.invoke({"user_input": user_input})
    return response.content.strip()

# Example usage:
if __name__ == "__main__":
    # Generate a passage
    data = generate_passage()
    passage_questions = json.loads(data)
    passage = passage_questions['passage']
    print("Chatbot:\n", passage)

    while True:
        user_input = input("Kid:")
        if user_input.lower() in ['ready', 'yes', 'yeah', 'yep','quit', 'bye', 'exit','okay']:
            break

    feedback_list = []

    for i in range(0,3):

        question = passage_questions['questions'][i]
        print("\nChatBot:\n", question)

        user_input = input("Kid:")
        if user_input.lower() in ['quit', 'bye', 'exit']:
            print("Chatbot: Goodbye! It was fun talking about the adventure.")
            break
        else:
            feedback = analyze_response(user_input)
            feedback_list.append(feedback)
            
    time.sleep(5)
    os.system('cls' if os.name == 'nt' else 'clear')
    print("Chatbot:\n", feedback_list)