/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

const router = {
    
    mapRouteToHandler: new Map(),
    
    // Fügt eine neue Route (URL, auszuführende Funktion) zu der Map hinzu
    addRoute: function (route, handler) {
        this.mapRouteToHandler.set(route, handler);
    },
    
    // Wird aufgerufen, wenn zu einer anderen Adresse navigiert werden soll
    navigateToPage(url){
        console.log("navigate to page");
        history.pushState(null, "", url);
        this.handleRouting();
    },
    
    // Wird als Eventhandler an ein <a>-Element gebunden
    handleNavigationEvent: function (event) {
        event.preventDefault();
        let url = event.target.href;
        router.navigateToPage(url);
    },
    
    // Wird als EventHandler aufgerufen, sobald die Pfeiltasten des Browsers betätigt werden
    handleRouting: function () {
        console.log("Navigation zu: " + window.location.pathname);
        const currentPage = window.location.pathname.split('/')[1];
        let routeHandler = this.mapRouteToHandler.get(currentPage);
        if (routeHandler === undefined)
            routeHandler = this.mapRouteToHandler.get(''); //Startseite
        routeHandler(window.location.pathname);
    }
};

// Selbsaufrufende Funktionsdeklaration: (function name(){..})();
(function initRouter() {
    // The "Homepage".
    router.addRoute('', function () {
        console.log("Router: Aufruf von initPage");
        presenter.initPage();
    });
    
    router.addRoute('blogView', function (url) {
        var id = url.split('/blogView/')[1].trim();
        presenter.showBlog(id);
    });
    
    router.addRoute('postView' , function(url) {
        var id = url.split('/postView/')[1].trim();
        presenter.showPost(id);
    });
    
    //Methoden an den router binden
    for (let key in router) {
        if(typeof router[key] === "function") {
            router[key].bind(router);
        }
    }
    
    if (window) {
        window.addEventListener('popstate', (event) => {
            router.handleRouting();
        });
    }
})();


