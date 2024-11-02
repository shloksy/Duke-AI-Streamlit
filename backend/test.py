import streamlit as st

st.title("Name of App")
st.write("Enter your child's information below:")
name = st.text_input("Enter your child's name:")
grade = st.selectbox("Select their grade:", ["3rd","4th","5th","6th","7th","8th"])
subject = st.selectbox("Which subject would you like to focus on?", ["English Comprehension","Math"])

st.write("If you would like to recieve progress reports, enter your information below:")
parent_name = st.text_input("Enter your name:")
parent_email = st.text_input("Enter your email:")

uh9uyubuyb9ih
