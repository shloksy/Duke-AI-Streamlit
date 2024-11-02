import streamlit as st

user_type = st.radio("New User", "Returning User")
st.session_state["user_type"] = user_type

if st.session_state["user_type"] == "New User":
    st.subheader("Welcome, New User!")
    name = st.text_input("Enter your name:")
    email = st.text_input("Enter your email:")
    username = st.text_input("Enter a username")
    password = st.text_input("Enter a password")
    # You can add a submit button or other inputs to capture new user data
elif st.session_state["user_type"] == "Returning User":
    st.subheader("Welcome Back!")
    user_id = st.text_input("Enter your username:")
    password = st.text_input("Enter a password")
    # Additional functionality for returning users can be added here

# Display current selection for feedback
st.write(f"Currently selected: {st.session_state['user_type']}")


st.title("Name of App")
st.write("Enter your child's information below:")
st.write("If you would like to recieve progress reports, enter your information below:")
parent_name = st.text_input("Enter your name:")
parent_email = st.text_input("Enter your email:")
