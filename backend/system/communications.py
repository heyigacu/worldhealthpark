import random
import string


from django.core import mail
from django.conf import settings


def generate_verification_code():
    # characters = string.ascii_letters + string.digits 
    characters = string.digits 
    code = ''.join(random.choice(characters) for _ in range(6)) 
    return code


def send_email(email, subject, message):
    settings.EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    code = generate_verification_code()
    message = f'{message}{code}'
    mail.send_mail(subject=subject,message=message,from_email=settings.EMAIL_HOST_USER,recipient_list=[email])
    return code
    
