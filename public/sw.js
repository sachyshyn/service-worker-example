/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
// eslint-disable-next-line no-restricted-globals
const sw = self;
sw.addEventListener('install', (event) => {
    console.log(event);
});
sw.addEventListener('fetch', (event) => {
    console.log(event.request);
});
