/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

const presenter = {
    blogId: -1,
    owner: undefined,
    
    // Wird aufgerufen, wenn die Startseite angezeigt wird
    initPage() {
        if (model.loggedIn) { // Wenn der Nutzer eingeloggt ist

            // Nutzer abfragen und Anzeigenamen als owner setzen
            model.getSelf((result) => {
            this.owner  = result.displayName;
            console.log(`Nutzer ${this.owner} hat sich angemeldet.`);
            this.blogId = 1;
            });
            
            model.getAllBlogs((result) => {
                console.log(result);
                this.blogId = result[0].id;
                console.log(this.blogId);
            
                let blog = model.getBlog(this.blogId);
                console.log(blog.name);
                console.log(blog.updated);
                console.log(this.owner);
                console.log(this.formatDate(true, blog.updated));
                console.log(this.renderPostsOfBlog(this.blogId));
            });
            

        } 
        if(!model.loggedIn && this.blogId != -1) { // Wenn der Nuzter eingelogged war und sich abgemeldet hat
            console.log(`Nutzer ${this.owner} hat sich abgemeldet.`);
            this.blogId = -1;
            this.owner = undefined;
        }
    },

    // Gibt den Post mit der Id bid aus
    renderPostsOfBlog(bid) {
        model.getAllPostsOfBlog(bid, (posts) => {
            console.log(posts);
            for(let p of posts){
                console.log(p.title);
                console.log(p.updated);
                console.log(p.content);
            }
        });
    },

    // Formatiert den Datum-String in date in zwei mögliche Datum-Strings: 
    // long = false: 24.10.2018
    // long = true: Mittwoch, 24. Oktober 2018, 12:21
    formatDate(long, date) {
        let dateObj = new Date(date);
        if(long){
            var options = {weekday: 'long', year: 'numeric', month: 'long',
                            day: 'numeric', hour: 'numeric', minute: 'numeric'};
            let text = dateObj.toLocaleDateString('de-DE', options);
            return(text);
        }else{
            var options = {year: 'numeric', month: 'numeric', day: 'numeric'};
            let text = dateObj.toLocaleDateString('de-DE', options);
            return(text);
        }

    },

    // Liest aus einem HTML-Dokument mit Bildern nur den Text und die URLs in <img> aus
    createPostContent(content) {
        let result = "";

        // Hier kommt Ihr Code hin

        return(result);
    }
};