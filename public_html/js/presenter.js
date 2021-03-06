/*
0 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

const presenter = {
    blog: undefined,
    owner: undefined,
    
    // Wird aufgerufen, wenn die Startseite angezeigt wird
    initPage() {
        if (model.loggedIn) { // Wenn der Nutzer eingeloggt ist

            // Nutzer abfragen und Anzeigenamen als owner setzen
            model.getSelf((result) => {
                this.owner  = result.displayName;
                console.log(`Nutzer ${this.owner} hat sich angemeldet.`); 
                document.querySelector('h1').innerHTML = this.owner;        //WebsiteÜberschrift kommt in view?!
            });
            
            //Navigation rendern
            model.getAllBlogs((result) => {
                let head = headView.render(result);
                this.blog = result[0];
                router.navigateToPage('blogView/' + this.blog.id);
            });
                        
        } 
        if(!model.loggedIn && this.blog !== undefined) { // Wenn der Nuzter eingelogged war und sich abgemeldet hat
            console.log(`Nutzer ${this.owner} hat sich abgemeldet.`);
            this.blog = undefined;
            this.owner = undefined;
        }
        
    },
        
    showBlog(bid) {
        console.log("Presenter: anzeigen eines Blogs");
            model.getBlog(bid, (result) => {
                this.blog = result;
                blogInfos.render(result);
            });
            
            model.getAllPostsOfBlog(bid, (result) => {
                let page;
                if (result === undefined) {
                    page = noPostView.render();
                } else {
                    page = blogView.render(result);
                }
                
                this.replace(page);
            })
    },
    
    showFullBlog() {
       const blogWindow = window.open(this.blog.url);
       blogWindow.opener = undefined;
    },
    
    showPost(pid){
        console.log("Presenter: anzeigen der Detailansicht eines Posts");
        model.getPost(pid, (result) => {
            const post = result;
            model.getAllCommentsOfPost(this.blog.id, pid, (result) => {
                post.comments = result;
                const page = postView.render(post);
                this.replace(page);
            });
        });
    },
    
    showEditPost(postId) {
        model.getPost(postId, (result) => {
            const page = editView.render({
                author: this.owner,
                title: result.title,
                content: result.content,
                postId: postId,
                saveCallback: (title, content) => {
                    model.updatePost(this.blog.id, postId, title, content, () => {
                       router.navigateToPage('/blogView/' + this.blog.id); 
                    });
                }
            });
            this.replace(page);
        });
    },
    
    showCreatePost() {
        const page = editView.render({
            author: this.owner,
            saveCallback: (title, content) => {
                model.addNewPost(this.blog.id, title, content, () => {
                   router.navigateToPage('/blogView/' + this.blog.id); 
                });
            }
        });
        this.replace(page);
    },
    
    editPost(pid) {
        if (pid) {
            let editpost = model.getPost(pid);
            this.replacePage(editView.render(editpost));
            fillForm(editpost.title, editpost.content);
        } else {
            this.replacePage(editView.render(null));
        }
    },
    
    deleteComment(postId, commentId){
        model.deleteComment(this.blog.id, postId, commentId, function(){});
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
            return text;
        }else{
            var options = {year: 'numeric', month: 'numeric', day: 'numeric'};
            let text = dateObj.toLocaleDateString('de-DE', options);
            return text;
        }

    },
    
    deletePost(postId) {
        model.deletePost(this.blog.id, postId, () => {
            router.navigateToPage('/blogView/' + this.blog.id);
        });
    },

    // Liest aus einem HTML-Dokument mit Bildern nur den Text und die URLs in <img> aus
    createPostContent(content) {
        let result = "";

        // Hier kommt Ihr Code hin

        return(result);
    }
};