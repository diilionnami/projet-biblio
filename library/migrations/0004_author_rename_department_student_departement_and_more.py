import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0003_student_alter_book_options_alter_borrow_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('biography', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.RenameField(
            model_name='student',
            old_name='department',
            new_name='departement',
        ),
        migrations.RenameField(
            model_name='student',
            old_name='first_name',
            new_name='nom',
        ),
        migrations.RenameField(
            model_name='student',
            old_name='last_name',
            new_name='prenom',
        ),
        migrations.RenameField(
            model_name='student',
            old_name='phone',
            new_name='telephone',
        ),
        migrations.RemoveField(
            model_name='book',
            name='available_copies',
        ),
        migrations.RemoveField(
            model_name='book',
            name='published_year',
        ),
        migrations.RemoveField(
            model_name='book',
            name='total_copies',
        ),
        migrations.RemoveField(
            model_name='borrow',
            name='is_returned',
        ),
        migrations.RemoveField(
            model_name='student',
            name='level',
        ),
        migrations.AddField(
            model_name='book',
            name='copies',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AddField(
            model_name='borrow',
            name='status',
            field=models.CharField(default='En cours', max_length=50),
        ),
        migrations.AddField(
            model_name='student',
            name='niveau',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='book',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='books', to='library.category'),
        ),
        migrations.AlterField(
            model_name='book',
            name='isbn',
            field=models.CharField(blank=True, max_length=50, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='book',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='borrows', to='library.book'),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='borrows', to='library.student'),
        ),
        migrations.AlterField(
            model_name='book',
            name='author',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='books', to='library.author'),
        ),
        migrations.CreateModel(
            name='Penalty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reason', models.CharField(max_length=255)),
                ('amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('date', models.DateField(auto_now_add=True)),
                ('paid', models.BooleanField(default=False)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='penalties', to='library.student')),
            ],
        ),
    ]
