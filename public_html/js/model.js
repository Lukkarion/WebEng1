/* 
 * 
 /*
 * Adresse über die man auf die Webschnittstelle meines Blogs zugreifen kann:
 */
"use strict";

const model = {
    loggedIn: false,
    blogMap: new Map([]),
    postMap: new Map([]),
    commentMap: new Map([]),

    pathGetBlogs: 'blogger/v3/users/self/blogs',
    pathBlogs: 'blogger/v3/blogs',

    // Liefert den angemeldeten Nutzer mit allen Infos
    getSelf(callback) {
        var request = gapi.client.request({
            'method': 'GET',
            'path': 'blogger/v3/users/self'
        });
    // Execute the API request.
        request.execute(callback);
    },

    // Liefert alle Blogs des angemeldeten Nutzers
    getAllBlogs(callback) {
        var request = gapi.client.request({
            'method': 'GET',
            'path': this.pathGetBlogs
        });
    // Execute the API request.
        request.execute((result) => {
            this.blogMap.clear();
            if (result.items) {
                //Blogs werden unter ihrer id in blogMap gespeichert
                for (let blog of result.items) {
                    this.blogMap.set(blog.id, blog);
                }
            }
            callback(result.items);
        });
    },

    // Liefert alle Posts zu der  Blog-Id bid
    getAllPostsOfBlog(bid, callback) {
        var request = gapi.client.request({
            'method': 'GET',
            'path': this.pathBlogs + "/" + bid + '/posts'
        });

        request.execute((result) => {
            this.postMap.clear();
            if (result.items) {
                //Posts werden unter ihrer id in postMap gespeichert
                for (let p of result.items) {
                    this.postMap.set(p.id, p);
                }
            }
            callback(result.items);
        });
    },
    
    //Liefert den lokal gespeicherten Blog zu der bid
    getBlog(bid) {
        return this.blogMap.get(bid);
    },
    
    //Liefert den lokal gespeicherten Post zu der pid
    getPost(pid) {
        return this.postMap.get(pid);
    },
    
    // Liefert alle Kommentare zu dem Post pid im Blog bid
    getAllCommentsOfPost(bid, pid, callback) {
        var request = gapi.client.request({
            'method': 'GET',
            'path': this.pathBlogs + "/" + bid + '/posts/' + pid + "/comments"
        });

        request.execute((result) => {
            this.commentMap.clear();
            if (result.items) {
                //Comments werden unter ihrer id in commentMap gespeichert
                for (let c of result.items) {
                    this.commentMap.set(c.id, c);
                }
            }
            callback(result.items);
        });
    },

    // Löscht den Kommentar cid zu Post pid in Blog bid, Callback wird ohne result aufgerufen
    deleteComment(bid, pid, cid, callback) {
        var path = this.pathBlogs + "/" + bid + '/posts/' + pid + "/comments/" + cid;
        console.log(path);
        var request = gapi.client.request({
            'method': 'DELETE',
            'path': path
        });
        this.commentMap.remove(cid);
        request.execute(callback);
    },

    // Fügt einen neuen Post mit title und content hinzu, Callback wird mit neuem Post aufgerufen
    addNewPost(bid, title, content, callback) {
        var body = {
            kind: "blogger#post",
            title: title,
            blog: {
                id: bid
            },
            content: content
        };

        var request = gapi.client.request({
            'method': 'POST',
            'path': this.pathBlogs + "/" + bid + '/posts',
            'body': body
        });

        request.execute(callback);
    },

    // Aktualisiert title und content im geänderten Post pid in bid
    updatePost(bid, pid, title, content, callback) {
        var body = {
            kind: "blogger#post",
            title: title,
            id: pid,
            blog: {
                id: bid
            },
            content: content
        };

        var request = gapi.client.request({
            'method': 'PUT',
            'path': this.pathBlogs + "/" + bid + '/posts/' + pid,
            'body': body
        });

        request.execute(callback);
    },

    // Löscht den Post pid aus dem Blog bid, Callback wird ohne result aufgerufen
    deletePost(bid, pid, callback) {
        var path = this.pathBlogs + "/" + bid + '/posts/' + pid;
        console.log(path);
        var request = gapi.client.request({
            'method': 'DELETE',
            'path': path
        });
        request.execute(callback);
    }
};





