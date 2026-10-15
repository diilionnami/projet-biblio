#!/usr/bin/env bash
# Exit on error
set -o errexit

# Upgrade pip and install dependencies explicitly
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

# Run Django commands
python manage.py collectstatic --no-input
python manage.py migrate