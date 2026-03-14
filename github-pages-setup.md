# 🚀 GitHub Pages Setup Guide

## 📋 Pasos para Subir a GitHub Pages

### 1. 📁 Preparar Archivos
Asegúrate que tienes todos estos archivos en tu carpeta:
```
✅ index.html
✅ manifest.json  
✅ sw.js
✅ icon-192.png
✅ icon-512.png
✅ .nojekyll
✅ README.md
```

### 2. 🔄 Inicializar Git
```bash
# Abre terminal en tu carpeta del proyecto
cd "c:\Users\newpc delf.gamer\Desktop\Canchas"

# Inicializa repositorio Git
git init
git add .
git commit -m "🎉 Initial commit - Canchas Reservas PWA"
```

### 3. 🔗 Conectar con GitHub
```bash
# Agrega tu repositorio remoto
git remote add origin https://github.com/PabloIMH/calendario_canchas.git

# Cambia a branch main (GitHub Pages usa main por defecto)
git branch -M main
```

### 4. 📤 Subir a GitHub
```bash
# Sube todos los archivos
git push -u origin main
```

### 5. ⚙️ Activar GitHub Pages
1. Ve a tu repositorio: https://github.com/PabloIMH/calendario_canchas
2. Click **Settings** (⚙️)
3. En la sección "Pages" del menú izquierdo
4. **Source**: "Deploy from a branch"
5. **Branch**: `main`
6. **Folder**: `/ (root)`
7. Click **Save** 🚀

### 6. 🌐 Ver tu App Live
Tu aplicación estará disponible en:
```
https://pabloimh.github.io/calendario_canchas/
```

## 🔧 Configuración Adicional

### Custom Domain (Opcional)
1. En Settings → Pages → Custom domain
2. Agrega tu dominio personalizado
3. Configura DNS según instrucciones de GitHub

### GitHub Actions (Opcional)
Para deploy automático cada vez que hagas cambios:
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 📱 PWA en GitHub Pages

### ✅ Features Activadas
- **Service Worker**: Cache inteligente
- **Web App Manifest**: Instalable como app
- **HTTPS**: Automático en GitHub Pages
- **Responsive**: Mobile-first design

### 🧪 Testing
1. **Lighthouse**: Verifica PWA score
2. **Mobile**: Prueba instalación en Android
3. **Desktop**: Prueba en Chrome/Edge
4. **Offline**: Verifica funcionalidad sin internet

## 🚨 Troubleshooting

### Si no funciona:
1. **Verifica .nojekyll**: Debe existir archivo vacío
2. **Limpia cache**: Ctrl+Shift+R en navegador
3. **Revisa Console**: F12 para errores
4. **Firebase config**: Asegúrate que las credenciales son correctas

### Deploy fallido:
```bash
# Force push si hay problemas
git push -f origin main
```

### PWA no instala:
- Verifica manifest.json syntax
- Revisa HTTPS (requerido para PWA)
- Limpia cache del navegador

## 🎉 Resultado Final

Tu app estará disponible como:
- **📱 PWA Instalable**: Desde cualquier dispositivo
- **🌐 Web App**: Directo en navegador  
- **📲 Mobile Native**: Experiencia app-like
- **🔄 Offline Ready**: Funciona sin internet

**¡Listo para compartir tu sistema de reservas con el mundo!** 🏟️✨
