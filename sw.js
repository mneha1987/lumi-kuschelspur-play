const CACHE='lumi-1.1.0';
const FILES=["./", "index.html", "manifest.webmanifest", "Build/Web.data.unityweb", "Build/Web.framework.js.unityweb", "Build/Web.loader.js", "Build/Web.wasm.unityweb", "icons/icon.png", "icons/touch-icon.png", "StreamingAssets/lumi-intro.mp4", "welcome/Nunito.ttf", "welcome/nursery.png", "welcome/teddy.png"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('lumi-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  if(event.request.headers.has('range'))return;
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request)));
});
