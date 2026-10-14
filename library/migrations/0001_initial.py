import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='Titre')),
                ('author', models.CharField(max_length=150, verbose_name='Auteur')),
                ('isbn', models.CharField(max_length=13, unique=True, verbose_name='ISBN')),
                ('published_year', models.IntegerField(verbose_name='Année de publication')),
                ('total_copies', models.PositiveIntegerField(default=1, verbose_name='Exemplaires totaux')),
                ('available_copies', models.PositiveIntegerField(default=1, verbose_name='Exemplaires disponibles')),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True, verbose_name='Nom de la catégorie')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Description')),
            ],
        ),
        migrations.CreateModel(
            name='Borrow',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('borrow_date', models.DateField(auto_now_add=True, verbose_name="Date d'emprunt")),
                ('due_date', models.DateField(verbose_name='Date limite de retour')),
                ('return_date', models.DateField(blank=True, null=True, verbose_name='Date de retour effective')),
                ('status', models.CharField(choices=[('BORROWED', 'En cours'), ('RETURNED', 'Retourné'), ('OVERDUE', 'En retard')], default='BORROWED', max_length=20, verbose_name='Statut')),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='borrows', to='library.book', verbose_name='Livre')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='borrows', to=settings.AUTH_USER_MODEL, verbose_name='Étudiant / Membre')),
            ],
        ),
        migrations.AddField(
            model_name='book',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='books', to='library.category', verbose_name='Catégorie'),
        ),
    ]
