#!/usr/bin/env bash
set -o errexit

python -m pip install --upgrade pip
python -m pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# Création automatique d'un superutilisateur (modifie l'email, le pseudo et le mot de passe selon tes envies)
python manage.py shell -c "
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'MonMotDePasse123')
    print('Superutilisateur créé avec succès !')
"