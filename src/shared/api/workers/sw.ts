/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

// eslint-disable-next-line no-restricted-globals
const params = new URLSearchParams(location.search);
const mode = params.get('mode');
const isProduction = mode === 'production';
const prodAssets = ['/', '/index.html', '/assets/*'];
const devAssets = ['/', '/index.html', 'src/main.tsx'];

const assets = isProduction ? prodAssets : devAssets;

const addResourcesToCache = async (resources) => {
  const cache = await caches.open('v1');
  await cache.addAll(resources);
};

// eslint-disable-next-line no-restricted-globals
const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;

sw.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(addResourcesToCache(assets));
});

const enableNavigationPreload = async () => {
  if (sw.registration.navigationPreload) {
    await sw.registration.navigationPreload.enable();
  }
};

sw.addEventListener('activate', (event) => {
  event.waitUntil(enableNavigationPreload());
});

const putInCache = async (request: Request, response: Response) => {
  const isBrowserExtension = request.url.split(':')[0]?.includes('extension');
  if (isBrowserExtension) {
    return;
  }
  const cache = await caches.open('v1');
  await cache.put(request, response);
};

async function useCacheFirst(request: Request) {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    console.log('got from cache ', request.url);

    return responseFromCache;
  }

  try {
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());

    console.log('stored in cache', request.url);

    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(request.url);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

sw.addEventListener('fetch', (fetchEvent) => {
  fetchEvent.respondWith(useCacheFirst(fetchEvent.request));
});
