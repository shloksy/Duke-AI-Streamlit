import os
from fiscus import FiscusClient, FiscusUser, FiscusLogLevel
import base64

def encode_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def email_html_template(image_path):
    image_base64 = encode_image_to_base64(image_path)
    return """
    <html>
    <body>
        <img src="data:image/jpeg;base64,{image_base64}" alt="Image" style="width:100%;height:auto;">
        <h1>Hello,</h1>
        <p>This is a test email sent via API.</p>
    </body>
    </html>
    """

def send_email():
    # Initialize the FiscusClient
    fiscus_client = FiscusClient(api_key=os.getenv('FISCUS_API_KEY'), logging_level=FiscusLogLevel.DEBUG)

    # Initialize the FiscusUser with the client
    fiscus_user = FiscusUser(user_id="aditya.raju@duke.edu", client=fiscus_client)

    image_path = "~/logo.jpeg"

    # Use the FiscusClient to send an email
    email_response = fiscus_client.execute(
        connector_name="gmail", # Identifying the connector (Gmail in this case)
        operation="send_email", # Specifying the action we want to perform
        user=fiscus_user, # Using the FiscusUser object to authenticate the user
        params={
            # Setting up the email data required by Gmail API
            "emailData": {
                "headers": [
                    {"name": "To", "value": "shloksy@gmail.com"},   # Email recipient
                    {"name": "From", "value": "aditya.raju@duke.edu"}, # Email sender
                    {"name": "Subject", "value": "Test Email"}  # Subject line
                ],
                "body": {
                    "mimeType": "text/plain", # Specifying the type of email content
                    "data": email_html_template(image_path) # Email body content
                }
            }
        }
    )

    if email_response.success:
        print(email_response.data)
    else:
        print(email_response.error)

    # Printing the result to verify whether the email was successfully sent.
    # If the email was sent, we receive a success message; otherwise, we handle any errors.
    print(f"Email sent successfully: {email_response.result}")

# Call the function
send_email()