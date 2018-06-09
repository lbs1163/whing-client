from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout

def index(request):
	return render(request, "core/index.html", {})

def signup(request):
	return render(request, "core/signup.html", {})

def log_in(request):
	if request.method == 'GET':
		return render(request, "core/login.html", {})
	elif request.method == 'POST':
		username = 'lbs1163'
		password = request.POST.get('password', False)
		user = authenticate(username=username, password=password)
		if user is not None:
			login(request, user)
			return redirect('index')
		else:
			return render(request, "core/login.html", {})

def log_out(request):
	logout(request)
	return redirect('index')

def mypage(request):
	return render(request, "core/mypage.html", {"pagename": "My Page"})

def install(request):
	return render(request, "core/install.html", {"pagename": "Install Plugin"})

def site(request):
	return render(request, "core/site.html", {"pagename": "Admin"})

def bb(request):
	return render(request, "core/bb.html", {"pagename": "Board"})