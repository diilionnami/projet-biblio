from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Author(models.Model):
    name = models.CharField(max_length=150)
    biography = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Student(models.Model):
    matricule = models.CharField(max_length=50, unique=True)
    prenom = models.CharField(max_length=100)
    nom = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)
    telephone = models.CharField(max_length=20, blank=True, null=True)
    departement = models.CharField(max_length=100)
    niveau = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.matricule} - {self.prenom} {self.nom}"

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='books')
    isbn = models.CharField(max_length=50, unique=True, blank=True, null=True)
    copies = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.title

class Borrow(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='borrows')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='borrows')
    borrow_date = models.DateField(auto_now_add=True)
    return_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=50, default='En cours')

    def __str__(self):
        return f"{self.student} -> {self.book}"

class Penalty(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='penalties')
    reason = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    date = models.DateField(auto_now_add=True)
    paid = models.BooleanField(default=False)

    def __str__(self):
        return f"Pénalité {self.student} - {self.amount}"