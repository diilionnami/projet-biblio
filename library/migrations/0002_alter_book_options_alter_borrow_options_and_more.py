import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='book',
            options={'verbose_name': 'Livre', 'verbose_name_plural': 'Livres'},
        ),
        migrations.AlterModelOptions(
            name='borrow',
            options={'verbose_name': 'Emprunt', 'verbose_name_plural': 'Emprunts'},
        ),
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name': 'Catégorie', 'verbose_name_plural': 'Catégories'},
        ),
        migrations.RemoveField(
            model_name='borrow',
            name='due_date',
        ),
        migrations.RemoveField(
            model_name='borrow',
            name='status',
        ),
        migrations.RemoveField(
            model_name='borrow',
            name='user',
        ),
        migrations.RemoveField(
            model_name='category',
            name='description',
        ),
        migrations.AddField(
            model_name='borrow',
            name='borrower_name',
            field=models.CharField(default='Inconnu', max_length=200, verbose_name="Nom de l'emprunteur"),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='book',
            name='author',
            field=models.CharField(max_length=200, verbose_name='Auteur'),
        ),
        migrations.AlterField(
            model_name='book',
            name='available_copies',
            field=models.IntegerField(verbose_name='Exemplaires disponibles'),
        ),
        migrations.AlterField(
            model_name='book',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='library.category', verbose_name='Catégorie'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='book',
            name='total_copies',
            field=models.IntegerField(verbose_name='Exemplaires totaux'),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='book',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='library.book', verbose_name='Livre'),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='borrow_date',
            field=models.DateField(verbose_name="Date d'emprunt"),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='return_date',
            field=models.DateField(blank=True, null=True, verbose_name='Date de retour'),
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=100, verbose_name='Nom de la catégorie'),
        ),
    ]
