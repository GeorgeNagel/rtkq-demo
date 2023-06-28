from django.contrib import admin
from django.urls import path, include

from posts.views import PostViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls'))
]
