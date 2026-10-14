from rest_framework import viewsets
from .models import Category, Author, Student, Book, Borrow, Penalty
from .serializers import (
    CategorySerializer,
    AuthorSerializer,
    StudentSerializer,
    BookSerializer,
    BorrowSerializer,
    PenaltySerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BorrowViewSet(viewsets.ModelViewSet):
    queryset = Borrow.objects.all()
    serializer_class = BorrowSerializer

class PenaltyViewSet(viewsets.ModelViewSet):
    queryset = Penalty.objects.all()
    serializer_class = PenaltySerializer