"use strict";

const blogView = {
    render(data) {
        console.log("View: render von blogView");
        
        let headPage = document.getElementById('head');
        helper.setDataInfo(headPage, data);
        let page = document.getElementById('blogView').cloneNode(true);
        page.removeAttribute("id");
        
        helper.setDataInfo(page, data);
        let a = page.querySelector("a");
        a.addEventListener("click", router.handleNavigationEvent());
        return page;        
    }
};

const postView = {
    render(data) {
        console.log("View: render von postView");
         let handleEvent = function (event) {
             
         }
        
        let page = document.getElementById('postView').cloneNode(true);
        page.removeAttribute("id");
        helper.setDataInfo(page, data);
        let a = page.querySelector("a");
        a.EventListener("click", handleEvent);
        return page;        
    }
};

const helper = {
    setDataInfo(element, object) {
        console.log("Ersetze daten");
        let cont = element.innerHTML;
        console.log(cont);
        for(let key in object) {
            cont = cont.replace("%" + key, object[key]);   
        }
        element.innerHTML = cont;
        
        console.log(element);        
        console.log(object);
    }
};


