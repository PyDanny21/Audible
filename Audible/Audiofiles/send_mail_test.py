from django.core.mail import send_mail
from django.conf import settings

def send_test_email():
    subject = 'Test Email'
    message = 'This is a test email.'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['newmandanny99@gmail.com']
    send_mail(subject, message, email_from, recipient_list)

if __name__ == "__main__":
    import django
    django.setup()
    send_test_email()

