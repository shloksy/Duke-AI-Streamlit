# send_email.py
import os

from fiscus import FiscusClient
from flask import session
from build_email import get_email_content

def send_email():
    client = FiscusClient(
        api_key=os.getenv('FISCUS_API_KEY'),
        user_id='aditya'
    )

    auth = client.user.authenticate_connector('gmail')
    if auth.success:
        print(auth.data)
    else:
        print(auth.error)

    # Get the rendered HTML content
    html_content, error = get_email_content()
    if error:
        return {'error': error}

    email_response = client.execute(
        connector_name="gmail",
        operation="send_email",
        params={
            "emailData": {
                "headers": [
                    {"name": "To", "value": session.get('parent_email')},
                    {"name": "From", "value": "rajuaditya626@gmail.com"},
                    {"name": "Subject", "value": "LeapLearn: Student Update"}
                ],
                "body": {
                    "mimeType": "text/html",  # Change to text/html for HTML content
                    "data": html_content,
                }
            }
        }
    )

    if email_response.result:
        return {'success': 'Email sent successfully'}
    else:
        return {'error': 'Failed to send email'}

if __name__ == '__main__':
    send_email()