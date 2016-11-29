from django.conf import settings
from django.views.generic.base import TemplateView

class HomePageView(TemplateView):
    template_name = 'home.html'
    redirect_field_name = None
