const CACHE_NAME = 'canchas-reservas-v1';
const STATIC_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,800;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('📱 Service Worker instalado');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_CACHE))
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia de cache: Network First con fallback a Cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Solo para peticiones GET
  if (request.method !== 'GET') return;
  
  // Para Firebase Firestore, siempre usar network
  if (request.url.includes('firestore.googleapis.com') || 
      request.url.includes('googleapis.com')) {
    event.respondWith(fetch(request));
    return;
  }
  
  // Para recursos estáticos, usar cache first
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          // Cache hit - devolver desde cache
          return response;
        }
        
        // Cache miss - intentar desde red
        return fetch(request)
          .then((response) => {
            // Si la respuesta es válida, guardar en cache
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(request, responseClone));
            }
            return response;
          })
          .catch(() => {
            // Si falla la red, devolver página offline
            if (request.destination === 'document') {
              return new Response(`
                <!DOCTYPE html>
                <html lang="es-CL">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Offline - Canchas Reservas</title>
                  <style>
                    body { 
                      font-family: 'DM Sans', sans-serif; 
                      background: linear-gradient(135deg, #0d1117, #020617);
                      color: #e8edf5; 
                      display: flex; 
                      align-items: center; 
                      justify-content: center; 
                      min-height: 100vh; 
                      margin: 0; 
                      text-align: center;
                      padding: 20px;
                    }
                    .offline-container {
                      max-width: 400px;
                      background: rgba(22, 28, 38, 0.9);
                      border: 1px solid rgba(255, 255, 255, 0.1);
                      border-radius: 22px;
                      padding: 40px 30px;
                      backdrop-filter: blur(10px);
                    }
                    .icon { font-size: 64px; margin-bottom: 20px; }
                    h1 { font-family: 'DM Serif Display', serif; font-size: 28px; margin-bottom: 16px; color: #3fd97a; }
                    p { color: #8b97ab; line-height: 1.6; margin-bottom: 24px; }
                    .retry-btn {
                      background: linear-gradient(135deg, #3fd97a, #1da854);
                      border: none;
                      color: white;
                      padding: 12px 24px;
                      border-radius: 14px;
                      font-weight: 700;
                      cursor: pointer;
                      font-size: 16px;
                      transition: transform 0.2s;
                    }
                    .retry-btn:hover { transform: translateY(-2px); }
                  </style>
                </head>
                <body>
                  <div class="offline-container">
                    <div class="icon">🏟️</div>
                    <h1>Sin Conexión</h1>
                    <p>No tienes conexión a internet. Por favor, verifica tu conexión y vuelve a intentarlo.</p>
                    <button class="retry-btn" onclick="window.location.reload()">Reintentar</button>
                  </div>
                </body>
                </html>
              `, {
                headers: { 'Content-Type': 'text/html' }
              });
            }
          });
      })
  );
});

// Sincronización en background
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-reservations') {
    event.waitUntil(syncReservations());
  }
});

async function syncReservations() {
  console.log('🔄 Sincronizando reservas en background...');
  // Lógica de sincronización cuando vuelve la conexión
}
