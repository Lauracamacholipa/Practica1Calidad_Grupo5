// pacman/js/resources.js
(function() {
    let resourceCache = {};
    let readyCallbacks = [];

    function load(urlOrArr) {
        if (urlOrArr instanceof Array) {
            urlOrArr.forEach(url => _load(url));
        } else {
            _load(urlOrArr);
        }
    }

    function _load(url) {
        if (resourceCache[url]) return resourceCache[url];

        const img = new Image();
        img.onload = function() {
            resourceCache[url] = img;
            if (isReady()) readyCallbacks.forEach(f => f());
        };
        resourceCache[url] = false;
        img.src = url;
    }

    function get(url) {
        return resourceCache[url];
    }

    function isReady() {
        return Object.values(resourceCache).every(r => r);
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    const resObj = { load, get, isReady, onReady };

    if (typeof window !== 'undefined') window.resources = resObj;
    if (typeof module !== 'undefined' && module.exports) module.exports = resObj;
})();
