from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, PasswordField, SubmitField, FileField, DateField, TextAreaField
from wtforms.validators import DataRequired, Optional, Email, EqualTo, Regexp, Length, ValidationError
from flask_wtf.file import FileAllowed
import sqlalchemy as sa
from app import db, models
from flask_login import current_user
from PIL import Image

class LoginForm(FlaskForm):
    email         = StringField('Email Address', validators=[DataRequired()])
    password      = PasswordField('Password', validators=[DataRequired()])
    remember_user = BooleanField('Remember Me')
    submit        = SubmitField('Log In')

class RegistrationForm(FlaskForm):
    email            = StringField('Email Address', validators=[DataRequired(), Email(message="The email address must be a valid email address")])
    password         = PasswordField('Password', validators=[DataRequired(), Length(min=8, message="The password must be at least 8 characters long"), Regexp(r'^[a-zA-Z0-9!"#$%&\'()*+,-./:;<=>?@\[\\\]^_`{|}~]+$', message="The password must contain only letters, numbers, and !@#$%^&*()_+=-")])
    password_confirm = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password', message="The passwords do not match")])
    submit           = SubmitField('Sign Up')
    
    def validate_email(self, field):
        # Check if email is already used
        existing_user = db.session.scalar(sa.select(models.Users).where(models.Users.email == field.data))
        if existing_user:
            raise ValidationError("A user with this email address already exists")

class EditProfileForm(FlaskForm):
    email           = StringField('Email Address', validators=[DataRequired(), Email(message="The email address must be a valid email address")])
    password        = PasswordField('Password', validators=[Optional(), Length(min=8, message="The password must be at least 8 characters long"), Regexp(r'^[a-zA-Z0-9!"#$%&\'()*+,-./:;<=>?@\[\\\]^_`{|}~]+$', message="The password must contain only letters, numbers, and !@#$%^&*()_+=-")])
    profile_picture = FileField('Profile Picture', validators=[FileAllowed(['jpeg', 'jpg', 'png', 'webp', '.svg'], message="The profile image can only be in .png, .jpeg, .svg or .webp format")])
    submit          = SubmitField('Save Changes')
    
    def validate_email(self, field):
        # Check if email is already used
        existing_user = db.session.scalar(sa.select(models.Users).where(models.Users.email == field.data.lower()))
        if existing_user and existing_user.id != current_user.id:
            raise ValidationError("A user with this email address already exists")
    
    def validate_image(form, field):
        # Ensure an image was uploaded
        if not field.data:
            return 
        
        # Save the uploaded image to the server if one was uploaded
        image = field.data
        img_filename = secure_filename(image.filename)
        if img_filename != "":
            # Ensure that the image is roughly square (with a 50px tolerance)
            img = Image.open(image)   
            if abs(img.width - img.height) > 50:
                raise ValidationError("The profile image must be square")
            image.seek(0) # Reset the file point to the start so that it can be saved to the server properly

class AddPasswordForm(FlaskForm):
    name     = StringField('Service Name', validators=[DataRequired()])
    username = StringField('Username / Email Address')
    password = StringField('Password')
    website  = StringField('Website')
    details  = StringField('Description')
    submit   = SubmitField('Add')

class EditPasswordForm(FlaskForm):
    name     = StringField('Service Name', validators=[DataRequired()])
    username = StringField('Username / Email Address')
    password = StringField('Password')
    website  = StringField('Website')
    details  = StringField('Description')
    submit   = SubmitField('Save Changes')