import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0002_alter_book_options_alter_borrow_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('matricule', models.CharField(max_length=50, unique=True)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('department', models.CharField(max_length=100)),
                ('level', models.CharField(default='L1', max_length=10)),
                ('phone', models.CharField(blank=True, max_length=20, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
            ],
        ),
        migrations.AlterModelOptions(
            name='book',
            options={},
        ),
        migrations.AlterModelOptions(
            name='borrow',
            options={},
        ),
        migrations.AlterModelOptions(
            name='category',
            options={},
        ),
        migrations.RemoveField(
            model_name='borrow',
            name='borrower_name',
        ),
        migrations.AddField(
            model_name='borrow',
            name='is_returned',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='category',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='book',
            name='author',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='book',
            name='available_copies',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='book',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='library.category'),
        ),
        migrations.AlterField(
            model_name='book',
            name='isbn',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='book',
            name='published_year',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='book',
            name='title',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='book',
            name='total_copies',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='book',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='library.book'),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='borrow_date',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='borrow',
            name='return_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AddField(
            model_name='borrow',
            name='student',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='library.student'),
            preserve_default=False,
        ),
    ]
