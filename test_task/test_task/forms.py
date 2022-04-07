from django import forms
from django.contrib.auth.models import User

class LoginForm(forms.ModelForm):

	password = forms.CharField(widget=forms.PasswordInput)

	def __init__(self,*args,**kwargs):
		super().__init__(*args,**kwargs)
		for visible in self.visible_fields():
			visible.field.widget.attrs['class'] = 'form-control'

	def __str__(self):
		return self.as_div()

	def clean(self):
		username = self.cleaned_data['username']
		password = self.cleaned_data['password']

		if not User.objects.filter(username=username).exists():
			raise forms.ValidationError(f'User with login {username} not found.')

		user = User.objects.filter(username=username).first()
		if user:
			if not user.check_password(password):
				raise forms.ValidationError('Wrong password.')
		return self.cleaned_data

	class Meta:
		model = User
		fields = ['username','password']


class RegistrationForm(forms.ModelForm):

	confirm_password = forms.CharField(widget=forms.PasswordInput)
	password = forms.CharField(widget=forms.PasswordInput)

	def __init__(self,*args,**kwargs):
		super().__init__(*args,**kwargs)
		for visible in self.visible_fields():
			visible.field.widget.attrs['class'] = 'form-control'

	def clean_username(self):
		username = self.cleaned_data['username']
		if User.objects.filter(username=username).exists():
			raise forms.ValidationError(f'Name {username} is already exists')
		return username

	def clean(self):
		password = self.cleaned_data['password']
		confirm_password = self.cleaned_data['confirm_password']
		if password != confirm_password:
			raise forms.ValidationError('Password mismatch')
		return self.cleaned_data

	class Meta:
		model = User
		fields = ['username','password','confirm_password']
		
		