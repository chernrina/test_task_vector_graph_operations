from django.views.generic.base import View
from .forms import LoginForm, RegistrationForm
from django.contrib.auth import authenticate,login
from django.http.response import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

class LoginView(View):

	def get(self,request,*args,**kwargs):
		form = LoginForm(request.POST or None)
		context = {'form': form}
		return render(request, 'login.html',context)

	def post(self,request, *args, **kwargs):
		form = LoginForm(request.POST or None)
		if form.is_valid():
			username = form.cleaned_data['username']
			password = form.cleaned_data['password']
			user = authenticate(username=username,password=password)
			if user:
				login(request,user)
				return HttpResponseRedirect('/lk/{}'.format(form.cleaned_data['username']))
		return render(request,'login.html',{'form':form})


class RegistrationView(View):

	def get(self,request,*args,**kwargs):
		form = RegistrationForm(request.POST or None)
		context = {'form': form}
		return render(request, 'registration.html',context)

	def post(self,request, *args, **kwargs):
		form = RegistrationForm(request.POST or None)
		if form.is_valid():
			new_user = form.save(commit=False)
			new_user.username = form.cleaned_data['username']
			new_user.save()
			new_user.set_password(form.cleaned_data['password'])
			new_user.save()

			user = authenticate(username=form.cleaned_data['username'],password=form.cleaned_data['password'])
			login(request,user)
			return HttpResponseRedirect('/')
		return render(request,'registration.html',{'form':form})