from app import db, login
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column
from flask_login import UserMixin
from werkzeug.security import check_password_hash
from datetime import datetime, timezone
from typing import List

@login.user_loader
def load_user(id):
    return Users.query.get(id)

class Users(db.Model, UserMixin):
    id:              Mapped[int]      = mapped_column(db.Integer, primary_key=True)
    email:           Mapped[str]      = mapped_column(db.Text, unique=True, nullable=False, index=True)
    password:        Mapped[str]      = mapped_column(db.String(128), nullable=False, index=True)
    profile_picture: Mapped[str]      = mapped_column(nullable=False, index=True)
    passwords:       Mapped[List["Passwords"]] = db.relationship('Passwords', backref='user')
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
class Passwords(db.Model):
    id:            Mapped[int]      = mapped_column(db.Integer, primary_key=True)
    user_id:       Mapped[int]      = mapped_column(db.Integer, db.ForeignKey('users.id'))
    name:          Mapped[str]      = mapped_column(db.Text, nullable=False, index=True)
    username:      Mapped[str]      = mapped_column(db.Text, nullable=True)
    password:      Mapped[str]      = mapped_column(db.Text, nullable=True)
    website:       Mapped[str]      = mapped_column(db.Text, nullable=True)
    details:       Mapped[str]      = mapped_column(db.Text, nullable=True)
    creation_date: Mapped[datetime] = mapped_column(nullable=False, index=True, default=lambda: datetime.now(timezone.utc))
    last_edited:   Mapped[datetime] = mapped_column(nullable=False, index=True, default=lambda: datetime.now(timezone.utc))