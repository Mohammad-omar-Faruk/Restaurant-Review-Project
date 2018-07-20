/*if (navigator.serviceWorker) {
    navigator.serviceWorker.register('service_worker.js')
        .then(registration =>
            console.log(`Registration succeeded with ${registration.scope}`)
        ).catch(error =>
            console.log(`Registration failed with + ${error}`)
        )
};

const cacheVersion = 'cache-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheVersion).then(cache =>
            cache.addAll([
            './',
            './js/main.js',
            './js/dbhelper.js',
            './js/restaurant_info.js',
            './css/styles.css',            
            './data/restaurants.json',
            './img/1.jpg',
            './img/2.jpg',
            './img/3.jpg',
            './img/4.jpg',
            './img/5.jpg',
            './img/6.jpg',
            './img/7.jpg',
            './img/8.jpg',
            './img/9.jpg',
            './img/10.jpg',
            './index.html',
            './restaurant.html'            
            ]))
    );
});


self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			if (response) return response;
			return fetch(event.request);
		})
	);
});
*/
//The recent cache
const currentCache = 'restaurantsCache-v1';

//service worker install event and caching while installing 
self.addEventListener('install', event => {
    //urls to be cached
    const urlsToCache = [
        './',
            './js/main.js',
            './js/dbhelper.js',
            './js/restaurant_info.js',
            './css/styles.css',            
            './data/restaurants.json',
            './img/1.jpg',
            './img/2.jpg',
            './img/3.jpg',
            './img/4.jpg',
            './img/5.jpg',
            './img/6.jpg',
            './img/7.jpg',
            './img/8.jpg',
            './img/9.jpg',
            './img/10.jpg',
            './index.html',
            './restaurant.html'           
    ];
    event.waitUntil(
        caches.open(currentCache).then(cache => cache.addAll(urlsToCache)).catch(error => {
            console.log(error);
        })
    );
    
});

//service worker activate event and deleting older caches while activating
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.filter(cacheName => cacheName !== currentCache).map(cacheName => caches.delete(cacheName))
        ))
    );
});

/*service worker fetch event and respond with cache if there is something in cache.
If not responding from network. If the response status is 404 then respond with 404 image*/
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            return fetch(event.request).then(response => {
                if (response.status === 404) {
                    //free download and personal use png from https://pngtree.com/freepng/404-error-vector_2871439.html
                    return fetch('./img/404.png');
                }
                return response;
            })
        })
    );

});
