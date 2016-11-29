from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import views
from django.contrib.auth.decorators import login_required
from django.views.generic.base import TemplateView, RedirectView

from .views import HomePageView

urlpatterns = [
    url(r'^$', login_required(HomePageView.as_view()), name='home'),
    url(r'^admin/', admin.site.urls),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
