/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// eslint-disable-next-line no-restricted-globals
const params = new URLSearchParams(location.search);
const mode = params.get('mode');
const isProduction = mode === 'production';
const prodAssets = ['/', '/index.html', '/assets/*'];
const devAssets = ['/', '/index.html', 'src/main.tsx'];
const assets = isProduction ? prodAssets : devAssets;
const addResourcesToCache = (resources) => __awaiter(this, void 0, void 0, function* () {
    const cache = yield caches.open('v1');
    yield cache.addAll(resources);
});
// eslint-disable-next-line no-restricted-globals
const sw = self;
sw.addEventListener('install', (installEvent) => {
    installEvent.waitUntil(addResourcesToCache(assets));
});
const enableNavigationPreload = () => __awaiter(this, void 0, void 0, function* () {
    if (sw.registration.navigationPreload) {
        yield sw.registration.navigationPreload.enable();
    }
});
sw.addEventListener('activate', (event) => {
    event.waitUntil(enableNavigationPreload());
});
const putInCache = (request, response) => __awaiter(this, void 0, void 0, function* () {
    var _a;
    const isBrowserExtension = (_a = request.url.split(':')[0]) === null || _a === void 0 ? void 0 : _a.includes('extension');
    if (isBrowserExtension) {
        return;
    }
    const cache = yield caches.open('v1');
    yield cache.put(request, response);
});
function useCacheFirst(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const responseFromCache = yield caches.match(request);
        if (responseFromCache) {
            console.log('got from cache ', request.url);
            return responseFromCache;
        }
        try {
            const responseFromNetwork = yield fetch(request);
            putInCache(request, responseFromNetwork.clone());
            console.log('stored in cache', request.url);
            return responseFromNetwork;
        }
        catch (error) {
            const fallbackResponse = yield caches.match(request.url);
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
    });
}
sw.addEventListener('fetch', (fetchEvent) => {
    fetchEvent.respondWith(useCacheFirst(fetchEvent.request));
    // fetchEvent.waitUntil(
    //   caches.match(fetchEvent.request).then((cacheRes) => {
    //     return (
    //       cacheRes ||
    //       fetch(fetchEvent.request).then(async (fetchResponse) => {
    //         const type = fetchResponse.headers.get('content-type');
    //         const saveToCache = async (cacheName: string) => {
    //           return caches.open(cacheName).then((cache) => {
    //             cache.put(fetchEvent.request, fetchResponse.clone());
    //             return fetchResponse;
    //           });
    //         };
    //         const isBrowserExtension = fetchEvent.request.url.split(':')[0]?.includes('extension');
    //         if (isBrowserExtension) {
    //           return;
    //         }
    //         if (type?.match(/^font\//i) || fetchEvent.request.url.match(/fonts.gstatic.com/i)) {
    //           return saveToCache(FONT_CACHE_NAME);
    //         } else if (type?.match(/^image\//i) || fetchEvent.request.destination === 'image') {
    //           return saveToCache(IMAGE_CACHE_NAME);
    //         } else if (fetchEvent.request.url.includes('jsonplaceholder')) {
    //           return saveToCache(DYNAMIC_CACHE_NAME);
    //         }
    //         return;
    //       })
    //     );
    //   })
    // );
});
