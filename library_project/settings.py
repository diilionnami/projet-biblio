import os
from pathlib import Path

# --- BASE DIRECTORY ---
BASE_DIR = Path(__file__).resolve().parent.parent

# --- SECURITY WARNING ---
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-cle-de-test-pour-developpement-local')

DEBUG = os.environ.get('DEBUG', 'True') == 'True'

# Important : Autorise Render et tous les hôtes en production
ALLOWED_HOSTS = ['*']


# --- APPLICATION DEFINITION ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Bibliothèques tierces
    'rest_framework',
    'corsheaders',
    
    # Tes applications Django (ex: library)
    'library',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # WhiteNoise pour gérer les fichiers statiques sur Render
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',        # Middleware CORS pour le frontend React
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'library_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'frontend/dist'), os.path.join(BASE_DIR, 'frontend/build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'library_project.wsgi.application'


# --- DATABASE ---
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# --- PASSWORD VALIDATION ---
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# --- INTERNATIONALIZATION ---
LANGUAGE_CODE = 'fr-fr'

TIME_ZONE = 'Indian/Antananarivo'

USE_I18N = True

USE_TZ = True


# --- STATIC FILES (CSS, JavaScript, Images) ---
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Inclus les fichiers statiques générés par la compilation React s'ils existent
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'frontend/dist'),
    os.path.join(BASE_DIR, 'frontend/build'),
] if os.path.exists(os.path.join(BASE_DIR, 'frontend/dist')) or os.path.exists(os.path.join(BASE_DIR, 'frontend/build')) else []

# Configuration WhiteNoise pour la compression des statiques en production
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# --- DEFAULT PRIMARY KEY FIELD ---
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# --- CORS CONFIGURATION (REACT FRONTEND) ---
CORS_ALLOW_ALL_ORIGINS = True