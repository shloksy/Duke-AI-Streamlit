import streamlit as st

# Radio button for selecting user type
user_type = st.radio("Are you a New User or Returning User?", ("New User", "Returning User"))

# Store the user type selection in session state
st.session_state["user_type"] = user_type

# Display content based on the selected user type
if st.session_state["user_type"] == "New User":
    st.subheader("Welcome, New User!")
    name = st.text_input("Enter your name:")
    email = st.text_input("Enter your email:")
    # You can add a submit button or other inputs to capture new user data
elif st.session_state["user_type"] == "Returning User":
    st.subheader("Welcome Back!")
    user_id = st.text_input("Enter your User ID:")
    # Additional functionality for returning users can be added here

# Display current selection for feedback
st.write(f"Currently selected: {st.session_state['user_type']}")
