from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('',views.index,name='index'),
    path('signup/',views.signup,name='signup'),
    path('signin/',views.signin,name='signin'),
    path('signout/',views.signout,name='signout'),
    path('activate/<uidb64>/<token>',views.ActivateAccount.as_view(),name='activate'),
    path('upload/',views.upload,name='upload'),
    path('listen/<str:pk>/',views.listen,name='listen'),
]

if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)