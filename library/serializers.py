from rest_framework import serializers
from .models import Category, Author, Student, Book, Borrow, Penalty

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BorrowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Borrow
        fields = '__all__'

class PenaltySerializer(serializers.ModelSerializer):
    class Meta:
        model = Penalty
        fields = '__all__'