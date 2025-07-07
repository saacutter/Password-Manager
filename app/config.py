import os
from dotenv import load_dotenv

class Config:
    # Load the environment variables from the .env file
    load_dotenv()
   
    # Set the secret key
    SECRET_KEY = os.environ['SECRET_KEY'] or "this-is-a-secret-key"

    # Set the database URL
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL") or "sqlite:///" + os.path.join(os.path.abspath(os.path.dirname(__file__)), "app.db")

    # Set configuration variables for file uploading
    MAX_CONTENT_LENGTH = (1024 * 1024)*3 # Maximum filesize of 3MB
    UPLOAD_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.webp', '.svg', '.json', '.csv']
    UPLOAD_PATH = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'static/profilepictures')

    TEMPLATES_AUTO_RELOAD = True