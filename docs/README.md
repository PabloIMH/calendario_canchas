# 📚 Documentación del Proyecto

## 🏗️ Arquitectura

### Estructura de Archivos
```
calendario_canchas/
├── index.html          # Aplicación principal
├── manifest.json       # Configuración PWA
├── sw.js              # Service Worker
├── icon-192.png       # Icono PWA (192x192)
├── icon-512.png       # Icono PWA (512x512)
├── .nojekyll         # Desactiva Jekyll en GitHub Pages
└── docs/             # Documentación
```

### Base de Datos Firestore

#### Colección: `reservations`
```javascript
{
  date: "2026-03-13",
  court: "Cancha Fútbol 7", 
  hour: "09:00",
  name: "Juan Pérez",
  phone: "+56912345678",
  note: "Partido amistoso",
  isPermanent: false
}
```

#### Colección: `permanent_reservations`
```javascript
{
  court: "Cancha Fútbol 7",
  hour: "09:00", 
  dayOfWeek: 5, // 0=Domingo, 1=Lunes, ..., 5=Viernes, 6=Sábado
  name: "Juan Pérez",
  phone: "+56912345678",
  note: "Reserva semanal permanente"
}
```

## 🔧 Configuración Firebase

1. **Crear Proyecto Firebase**
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Nuevo proyecto → "Canchas Reservas"

2. **Configurar Firestore**
   - Database → Crear base de datos
   - Reglas de seguridad (producción):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. **Configurar Authentication**
   - Authentication → Sign-in method
   - Habilitar "Email/Password"

4. **Obtener Credenciales**
   - Project settings → General → Your apps
   - Copia configFirebase en `index.html`

## 🚀 Deployment GitHub Pages

### Automático con GitHub Actions
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

### Manual
1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. Save

## 📱 PWA Features

### Service Worker Cache
- **Static assets**: HTML, CSS, JS, iconos
- **Network First**: Firebase requests
- **Cache First**: Recursos estáticos
- **Offline page**: Personalizada

### Web App Manifest
- **Display**: standalone
- **Orientation**: portrait
- **Theme color**: #3fd97a
- **Icons**: 192x192, 512x512

## 🎨 Guía de Estilos

### Colores
- **Primary**: #3fd97a (verde)
- **Secondary**: #0d1117 (ink)
- **Accent**: #f05252 (rojo)
- **Text**: #e8edf5 (blanco)

### Tipografía
- **Headings**: DM Serif Display
- **Body**: DM Sans
- **Weights**: 400, 600, 700, 800

### Componentes
- **Cards**: Glassmorphism con blur
- **Buttons**: Gradientes + hover effects
- **Modals**: Bottom sheet mobile-first

## 🔍 Debugging

### Console Logs
```javascript
// Ver reservas cargadas
console.log('📋 Reservas:', reservations);

// Ver permanentes
console.log('🔄 Permanentes:', permanentReservations);

// Ver stats
console.log('📊 Estadísticas:', {total, taken, free});
```

### Common Issues
- **Cache persistente**: Ctrl+Shift+R + limpiar cache
- **Firebase timeout**: Revisar reglas de seguridad
- **PWA no instala**: Verificar manifest.json

## 📊 Analytics

### Métricas importantes
- **Tiempo de carga**: < 2s
- **Tasa de instalación PWA**: > 15%
- **Reservas por día**: Track en Firestore
- **Usuarios activos**: Auth users count

## 🔄 Actualizaciones

### Versionamiento
- **Major**: Cambios breaking
- **Minor**: Nuevas features
- **Patch**: Bug fixes

### Release Process
1. Update version en manifest.json
2. Update cache-buster en HTML
3. Commit y push a main
4. Deploy automático a GitHub Pages
