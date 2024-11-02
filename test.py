import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import math

st.title("Duke AI Hackathon test")

import streamlit as st

# Initialize session state for user type
if "user_type" not in st.session_state:
    st.session_state["user_type"] = None

# Buttons to set user type
if st.button("New User"):
    st.session_state["user_type"] = "new"
elif st.button("Returning User"):
    st.session_state["user_type"] = "returning"

# Show different content based on user type
if st.session_state["user_type"] == "new":
    st.subheader("Welcome, New User!")
    name = st.text_input("Enter your name:")
    email = st.text_input("Enter your email:")
    # You can add more fields and a submit button to save new user data
elif st.session_state["user_type"] == "returning":
    st.subheader("Welcome Back!")
    user_id = st.text_input("Enter your User ID:")
    # Additional functionality for returning users can go here
else:
    st.write("Please select if you are a New User or a Returning User.")

# Display current selection for feedback
st.write(f"Current selection: {st.session_state['user_type']}")

