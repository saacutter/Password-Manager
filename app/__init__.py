from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from app.config import Config

# Initialise the Flask server
application = Flask(__name__)
application.config.from_object(Config)

# Initialise the components of the application
login = LoginManager()
login.login_view = 'login' # This sets the page that should be rendered when there is a page that requires a log in to view
login.init_app(application)
db = SQLAlchemy()
db.init_app(application)
migrate = Migrate(application, db)

# Make the necessary directories for storing images on the server if they don't exist
os.makedirs(application.config['UPLOAD_PATH'], exist_ok=True) # This is used to create the directory for user profile pictures

from app import routes