import streamlit as st

st.title("Name of App")
st.write("Enter your child's information below:")
st.write("If you would like to recieve progress reports, enter your information below:")
parent_name = st.text_input("Enter your name:")
parent_email = st.text_input("Enter your email:")
