from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    AuthorViewSet,
    StudentViewSet,
    BookViewSet,
    BorrowViewSet,
    PenaltyViewSet
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'authors', AuthorViewSet)
router.register(r'students', StudentViewSet)
router.register(r'books', BookViewSet)
router.register(r'borrows', BorrowViewSet)
router.register(r'penalties', PenaltyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]