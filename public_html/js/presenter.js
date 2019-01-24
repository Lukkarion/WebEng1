/*
0 * To change this license header, choose License Headers in Project Properties.
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
            
            document.querySelector('h1').innerHTML = this.owner;
            });
            
            model.getAllBlogs((result) => {     
//                result.sort(function(a,b) {
//                    if(a.updated < b.updated) return -1;
//                    if(a.updated == b.updated) return 0;
//                    if(a.updated > b.updated) return 1;
//                });
//                console.log(result[0].updated);
//                console.log(result[1].updated);
//                console.log(result[2].updated);
                
                router.navigateToPage("/blogView/" + result[2].id);
                //model.getAllPostsOfBlog(result[2].id, (result) => {
                //    this.showPost(result[0].id);
                //});
            });
            
        } 
        if(!model.loggedIn && this.blogId != -1) { // Wenn der Nuzter eingelogged war und sich abgemeldet hat
            console.log(`Nutzer ${this.owner} hat sich abgemeldet.`);
            this.blogId = -1;
            this.owner = undefined;
        }
        
    },
    
    showHead() {
        console.log("Presenter: anzeigen eines Heads");
            model.getAllBlogs((result) => {
                let page = headView.render(result);
            })
    
    },
    
    showBlog(bid) {
        console.log("Presenter: anzeigen eines Blogs");
            console.log(bid);
            model.getBlog(bid, (result) => {
                blogInfos.render(result);
            });
            
            model.getAllPostsOfBlog(bid, (result) => {
                let page = blogView.render(result);
                this.replace(page);
            })
    
    },
    
    showPost(pid){
        console.log("Presenter: anzeigen der Detailansicht eines Posts");
        model.getPost(pid, (result) => {
            console.log(result);
            let page = postView.render(result);
            model.getAllCommentsOfPost(this.blogId, pid, (result) => {
                page.append(commentView.render(result));
                console.log(page);
                this.replace(page);
            });
        })  
    },
    
    replace(page) {
        console.log("replace page");
        let main = document.getElementById('main-content');
        let content = main.firstElementChild;
        if(content){
           content.remove();
        }
        if(page){
            main.append(page);
        }
    },

    // Gibt den Post mit der Id bid aus
     renderPostsOfBlog(bid) {
        model.getAllPostsOfBlog(bid, (result) => {
                for (let post of result) {
                    console.log(post.title);
                    console.log(post.updated);
                    console.log(post.content);
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