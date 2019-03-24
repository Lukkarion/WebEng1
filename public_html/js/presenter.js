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
                this.blogId = 1;
                this.owner  = result.displayName;
                console.log(`Nutzer ${this.owner} hat sich angemeldet.`); 
                document.querySelector('h1').innerHTML = this.owner;        //WebsiteÜberschrift kommt in view?!
            });
            
            //Navigation rendern
            model.getAllBlogs((result) => {
                let head = headView.render(result);
                this.blogId = result[0].id;
                router.navigateToPage('overview/' + this.blogId);
            });
                        
        } 
        if(!model.loggedIn && this.blogId != -1) { // Wenn der Nuzter eingelogged war und sich abgemeldet hat
            console.log(`Nutzer ${this.owner} hat sich abgemeldet.`);
            this.blogId = -1;
            this.owner = undefined;
        }
        
    },
        
    showBlog(bid) {
        console.log("Presenter: anzeigen eines Blogs");
            console.log(bid);
            model.getBlog(bid, (result) => {
                blogInfos.render(result);
            });
            
            model.getAllPostsOfBlog(bid, (result) => {
                let blog = blogView.render(result);
                this.replace(blog);
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