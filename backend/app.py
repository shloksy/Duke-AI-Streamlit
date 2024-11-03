from flask import Flask, request, jsonify, session
import sqlite3
import os
from flask_cors import CORS
from email_utils.send_email import send_email

app = Flask(__name__)
CORS(app)

def create_connection():
    conn = sqlite3.connect('users.db')
    return conn

def create_table(conn):
    sql = '''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        grade TEXT NOT NULL,
        subject TEXT,
        parent_name TEXT NOT NULL,
        parent_email TEXT NOT NULL,
        password TEXT NOT NULL
    );
    '''
    try:
        cur = conn.cursor()
        cur.execute(sql)
    except sqlite3.Error as e:
        print(e)

def create_user(conn, user):
    sql = ''' INSERT INTO users(name, grade, subject, parent_name, parent_email, password)
              VALUES(?,?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, user)
    conn.commit()
    return cur.lastrowid

def initialize_database():
    if not os.path.exists('users.db'):
        conn = create_connection()
        create_table(conn)
        conn.close()

@app.route('/')
def index():
    return "Welcome to the Flask App!"

@app.route('/api/create_user', methods=['POST'])
def create_user_endpoint():
    data = request.get_json()
    child_name = data['childName']
    grade_level = data['gradeLevel']
    parent_name = data['parentName']
    parent_email = data['parentEmail']
    password = data['password']
    conn = create_connection()
    user_id = create_user(conn, (child_name, grade_level, None, parent_name, parent_email, password))
    conn.close()
    return jsonify({'user_id': user_id})

@app.route('/api/sign_in', methods=['POST'])
def sign_in_endpoint():
    data = request.get_json()
    parent_email = data['parentEmail']
    password = data['password']

    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE parent_email=? AND password=?", (parent_email, password))
    user = cur.fetchone()
    conn.close()

    if user:
        return jsonify({'status': 'success', 'message': 'Sign-in successful'})
    else:
        return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    # Clear the session or perform any other log out logic
    session.clear()

    # Send the email
    result = send_email()
    if 'success' in result:
        return jsonify({'success': True, 'message': 'Logged out and email sent successfully'})
    else:
        return jsonify({'success': False, 'message': 'Failed to send email'}), 500

if __name__ == '__main__':
    initialize_database()
    app.run(debug=True)