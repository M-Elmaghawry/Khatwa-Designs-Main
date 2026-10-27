(function () {
    'use strict';
    var link = document.getElementById('redirect-link');
    var target = new URL(link.getAttribute('href'), window.location.href);
    target.search = window.location.search;
    target.hash = window.location.hash;
    link.href = target.href;
    window.location.replace(target.href);
})();
