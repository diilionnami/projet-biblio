# --- STATIC FILES (CSS, JavaScript, Images) ---
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Indique à Django où trouver les fichiers construits par Vite
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'frontend/dist'),
]

# Utilisation de WhiteNoise pour compresser et servir les statiques en production
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'