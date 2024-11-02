import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import math

st.title("Duke AI Hackathon test")

if st.button("New Users"):
    st.session_state["button_clicked"] = "new"
elif st.button("Returning Users"):
    st.session_state["button_clicked"] = "returning"
