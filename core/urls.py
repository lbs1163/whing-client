from django.urls import path

from . import views

urlpatterns = [
	path('', views.index, name='index'),
	path('signup/', views.signup, name='signup'),
	path('login/', views.log_in, name='login'),
	path('logout/', views.log_out, name='logout'),
	path('mypage/', views.mypage, name='mypage'),
	path('install/', views.install, name='install'),
	path('site/', views.site, name='site'),
	path('bb/', views.bb, name='bb'),
]