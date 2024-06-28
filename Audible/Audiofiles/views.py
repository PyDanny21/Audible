from django.shortcuts import render,redirect,get_object_or_404
from django.template.loader import render_to_string
from django.http import HttpResponse
from django.contrib import messages
from django.contrib import auth
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes,DjangoUnicodeDecodeError,force_str
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
import os
from PyPDF2 import PdfReader
import pyttsx3
from .models import PDF_File
from .forms import PDFUploadForm
import datetime
# getting token
from .utils import generate_token,TokenGenerator
import threading

# Create your views here.
@login_required(login_url='signin')
def index(request):
    greet_time=datetime.datetime.now().hour
    def time():
        if greet_time<12:
            return 'Good morning'
        elif greet_time<=16:
            return 'Good afternoon'
        else:
            return 'Good evening'
    time_now=time()
    audio=PDF_File.objects.all()
    return render(request,'index.html',{
        'greet':time_now,
        'audio':audio,
    })

#threading

class EmailThread(threading.Thread):
    def __init__(self,email_message):
        self.email_message=email_message
        threading.Thread.__init__(self)
    def run(self):
        self.email_message.send()

        
def signup(request):
    if request.method=='POST':
        username=request.POST['username']
        email=request.POST['email']
        password=request.POST['password']
        password2=request.POST['password2']
        if password==password2:
            try:
                if User.objects.filter(username=username).exists():
                    messages.warning(request,'Username exists')
                    return render(request,'signup.html')
                elif User.objects.filter(email=email).exists():
                    messages.warning(request,'Email exists!')
                    return render(request,'signup.html')
                else:
                    user=User.objects.create_user(username=username,email=email,password=password)
                    user.is_active=False
                    user.save()
                    current_site=get_current_site(request)
                    email_subject='Activate Your Account'
                    message=render_to_string('activate.html',{
                        'user':user,
                        'domain':'127.0.0.1:8000',
                        'uid':urlsafe_base64_encode(force_bytes(user.pk)),
                        'token':generate_token.make_token(user)
                    })
                    email_message=EmailMessage(email_subject,message,settings.EMAIL_HOST_USER,[email],)
                    EmailThread(email_message).start()

                    messages.success(request,f'Activate Your Account. Activation link sent to your gmail')
                    return redirect('signin')
            except Exception:
                messages.warning(request,'error occured')
        else:
            messages.warning(request,'password is not matching!')
            return render(request,'signup.html')
            
    else:
        return render(request,'signup.html')
    
class ActivateAccount(View):
    def get(self,request,uidb64,token):
        try:
            uid=force_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(pk=uid)
        except Exception as identifier:
            user=None
        if user is not None and generate_token.check_token(user,token):
            user.is_active=True
            user.save()
            messages.success(request,'Account activated successfully!')
            return redirect('signin')
        return render(request,'activatefail.html')

def signin(request):
    if request.method=='POST':
        username=request.POST['username']
        password=request.POST['password']
        user=authenticate(username=username,password=password)
        if user is not None:
            login(request,user)
            messages.success(request,'Login successful')
            return redirect('/')
        else:
            messages.error(request,'Invalid credentials')
            return redirect('signin')

    return render(request,'login.html')

@login_required(login_url='signin')
def signout(request):
    logout(request)
    messages.success(request,'Logout successful')
    return redirect('signin')

# Create your views here.
# @login_required()
def upload(request):
    if request.method=='POST':
        form=PDFUploadForm(request.POST,request.FILES)
        if form.is_valid():
            pdf_instance=form.save(commit=False)
            # pdf_instance.user=request.user
            pdf_file=request.FILES['pdf_file']
            extraction=PdfReader(pdf_file)
            text=''
            for page in extraction.pages:
                text+=page.extract_text()
            #converting to audio
            engine=pyttsx3.init('sapi5')
            voices=engine.getProperty('voice')
            # print(voices)
            engine.setProperty('voice','HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_EN-US_ZIRA_11.0')
            audio_name=f'{pdf_instance.title}.mp3'
            audio_path=os.path.join(settings.MEDIA_ROOT,f'Audio/',audio_name)
            os.makedirs(os.path.dirname(audio_path),exist_ok=True)
            engine.save_to_file(text,audio_path)
            engine.runAndWait()

            #save audio to model
            pdf_instance.audio=f'Audio/{audio_name}'
            pdf_instance.save()
            return redirect('index')
    else:
        form=PDFUploadForm()
    return render(request,'upload.html',{
        'form':form
    })
    
def listen(request,pk):
    listen_audio=get_object_or_404(PDF_File,pk=pk)
    greet_time=datetime.datetime.now().hour
    def time():
        if greet_time<12:
            return 'Good morning'
        elif greet_time<=16:
            return 'Good afternoon'
        else:
            return 'Good evening'
    time_now=time()
    audio=PDF_File.objects.all()[0:5]
    Allaudio=PDF_File.objects.all()[0:10]
    return render(request,'index.html',{
        'greet':time_now,
        'audio':audio,
        'Allaudio':Allaudio,
        'listen':listen_audio,
    })