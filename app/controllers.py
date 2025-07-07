from cryptography.fernet import Fernet
import base64

def decrypt_passwords(key, passwords):
    accounts = []
    for password in passwords:
        # Attempt to decrypt each field or return an empty string
        name = key.decrypt(password.name).decode('utf-8') if password.name != "" else ""
        username = key.decrypt(password.username).decode('utf-8') if password.username != "" else ""
        passkey = key.decrypt(password.password).decode('utf-8') if password.password != "" else ""
        website = key.decrypt(password.website).decode('utf-8') if password.website != "" else ""
        details = key.decrypt(password.details).decode('utf-8') if password.details != "" else ""
        
        # Create the dictionary for the accounts
        account = {
            "id": password.id,
            "user_id": password.user_id,
            "name": name,
            "username": username,
            "password": passkey,
            "website": website,
            "details": details,
            "creation_date": password.creation_date,
            "last_edited": password.last_edited
        }
        accounts.append(account)

    return sorted(accounts, key=lambda account: account["name"].lower())