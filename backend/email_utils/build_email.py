# build_email.py
from jinja2 import Environment, FileSystemLoader

def get_email_content():
    # Load the email template
    env = Environment(loader=FileSystemLoader('backend/email_utils'))
    template = env.get_template('email_template.html')

    # Render the template
    html_content = template.render()

    return html_content, None