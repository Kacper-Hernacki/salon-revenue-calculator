const CACHE_NAME = 'salon-calculator-v1.0.0';
const STATIC_CACHE_NAME = 'salon-calculator-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'salon-calculator-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/favicon.svg'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Error caching static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName.startsWith('salon-calculator-')) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
      .catch(error => {
        console.error('Service Worker: Error during activation:', error);
      })
  );
});

// Fetch event - implement cache strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and external URLs (except for same-origin)
  if (request.method !== 'GET' || 
      (url.origin !== self.location.origin && !shouldCacheExternal(url))) {
    return;
  }
  
  // Different strategies for different types of requests
  if (url.pathname === '/') {
    // Homepage - Cache First with Network Fallback
    event.respondWith(cacheFirstStrategy(request));
  } else if (isStaticAsset(url.pathname)) {
    // Static assets - Cache First
    event.respondWith(cacheFirstStrategy(request));
  } else if (isAPIRequest(url.pathname)) {
    // API requests - Network First with Cache Fallback
    event.respondWith(networkFirstStrategy(request));
  } else {
    // Other requests - Stale While Revalidate
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Cache First Strategy - good for static assets
async function cacheFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache First Strategy failed:', error);
    return new Response('Offline content not available', { 
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Network First Strategy - good for API calls
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Stale While Revalidate Strategy - good for frequently updated content
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(error => {
      console.error('Network request failed:', error);
      return cachedResponse;
    });
  
  return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticAsset(pathname) {
  const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.woff2', '.woff'];
  return staticExtensions.some(ext => pathname.endsWith(ext));
}

function isAPIRequest(pathname) {
  return pathname.startsWith('/api/');
}

function shouldCacheExternal(url) {
  // Cache external resources from trusted CDNs
  const allowedDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'cdnjs.cloudflare.com'
  ];
  return allowedDomains.includes(url.hostname);
}

// Message handling for cache management
self.addEventListener('message', event => {
  const { type } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_VERSION':
      event.ports[0].postMessage({
        version: CACHE_NAME
      });
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches()
        .then(() => {
          event.ports[0].postMessage({
            success: true,
            message: 'All caches cleared'
          });
        })
        .catch(error => {
          event.ports[0].postMessage({
            success: false,
            error: error.message
          });
        });
      break;
      
    default:
      console.log('Unknown message type:', type);
  }
});

// Utility function to clear all caches
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(
    cacheNames.map(cacheName => {
      if (cacheName.startsWith('salon-calculator-')) {
        return caches.delete(cacheName);
      }
    })
  );
}

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'email-submission') {
    event.waitUntil(syncEmailSubmissions());
  }
});

async function syncEmailSubmissions() {
  // Get pending submissions from IndexedDB or localStorage
  try {
    const pendingSubmissions = JSON.parse(
      await getFromIndexedDB('pendingEmailSubmissions') || '[]'
    );
    
    for (const submission of pendingSubmissions) {
      try {
        const response = await fetch('/api/submit-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submission)
        });
        
        if (response.ok) {
          // Remove from pending list
          const index = pendingSubmissions.indexOf(submission);
          pendingSubmissions.splice(index, 1);
        }
      } catch (error) {
        console.error('Failed to sync submission:', error);
      }
    }
    
    // Update pending submissions
    await saveToIndexedDB('pendingEmailSubmissions', JSON.stringify(pendingSubmissions));
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Simple IndexedDB wrapper functions (implement as needed)
async function getFromIndexedDB(key) {
  // Implement IndexedDB get operation
  return localStorage.getItem(key);
}

async function saveToIndexedDB(key, value) {
  // Implement IndexedDB set operation
  localStorage.setItem(key, value);
}

// Push notification handling (optional)
self.addEventListener('push', event => {
  if (!event.data) {
    return;
  }
  
  const options = {
    body: event.data.text(),
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Calculate Revenue',
        icon: '/icons/calculator-icon.png'
      },
      {
        action: 'close',
        title: 'Close notification',
        icon: '/icons/close-icon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Salon Calculator', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});