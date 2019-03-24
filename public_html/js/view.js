"use strict";

const headView = {
    render (data) {
        console.log("View: render Header");
        
        let headPage = document.getElementById('head');
        console.log(data);
        console.log(headPage);
        helper.setDataInfo(headPage, data[0]);
        helper.setDataInfo(headPage, data[0].posts);
        helper.setDataInfo(headPage, data);
        let navi = document.getElementById("navigation");
        for(let blog of data){
            let li = navi.firstElementChild.cloneNode(true);
            li.innerHTML = li.innerHTML.replace("%blog", blog.name);
            const link = li.querySelector('a');
            link.setAttribute('href', '/blogView/' + blog.id);
            console.log(link);
            link.addEventListener('click', router.handleNavigationEvent);
            navi.append(li);
            li.setAttribute('href', 'blogView/' + blog.id);
            li.addEventListener('click', router.handleNavigationEvent);
        }   
        navi.firstElementChild.remove();
        
        return headPage;  
    }
};

const blogInfos = {
    render (data) {
        let info = document.querySelector('#templates #info').cloneNode(true);
        helper.setDataInfo(info, data);
        helper.setDataInfo(info, data.posts);
        
        const showBlogButton = info.querySelector('#showBlog');
        showBlogButton.addEventListener('click', function(evt) {
            console.log('Foo');
            evt.preventDefault();
            presenter.showFullBlog();
        });
        
        const main = document.querySelector('main');
        main.querySelector('#info').remove();
        main.insertBefore(info, main.firstChild);
    }
};

const blogView = {
    render(data) {
        
        console.log(data);
        const createHandleEvent = (post) => function (event) {
            console.log("handle");
            router.navigateToPage("/postView/" + post.id);
        };
        
        console.log("View: render von blogView");
        let all = document.querySelector('#templates #overview').cloneNode(true);
        for(let p of data){
            let post = all.querySelector('article').cloneNode(true);
            helper.setDataInfo(post, p);
            helper.setDataInfo(post,p.replies);
            let title = post.querySelector('h3');
            title.addEventListener("click", createHandleEvent(p));
            const deleteButton = post.querySelector('#deletePost');
            deleteButton.addEventListener('click', (evt) => {
                evt.preventDefault();
                presenter.deletePost(p.id);
                post.remove();
            });
            all.append(post);
        }
        all.firstElementChild.remove();
        
        return all;
    }
};

const postView = {
    render(data) {
        console.log("View: render von postView");        
        let page = document.querySelector('#templates #postView').cloneNode(true);
        helper.setDataInfo(page, data);
        let comments = page.querySelector('#comments');
        for(let i in data.comments) {
            const renderedComment = commentView.render(data.comments[i]);
            comments.append(renderedComment);
        }
        const overviewLink = page.querySelector('#overviewLink');
        overviewLink.setAttribute('href', 'blogView/' + presenter.blog.id);
        overviewLink.addEventListener('click', router.handleNavigationEvent);
        
        const editButton = page.querySelector('#editPost');
        console.log(editButton);
        editButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            presenter.editPost(data.id);
        });
        
        const deleteButton = page.querySelector('#deletePost');
        deleteButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            presenter.deletePost(data.id);
        });
        
        return page;        
    }
};

const commentView = {
    render(data) {
        console.log("View: render von commentView");
        console.log(data);
        let comment = document.querySelector('#templates #commentView').cloneNode(true);
        helper.setDataInfo(comment, data);
        helper.setDataInfo(comment, data.author);
        const deleteButton = comment.querySelector('#deleteButton');
        deleteButton.addEventListener('click', function(evt){
            evt.preventDefault();
            presenter.deleteComment(data.post.id, data.id);
            comment.remove();
        });
        return comment;
    }
};


const noPostView = {
    render() {
        return document.querySelector('#templates #noPosts').cloneNode(true);
    }
}


const editView = {
    render(data) {
        console.log("View: render von editView");        
        let edit = document.querySelector('#templates #post-edit').cloneNode(true);
        helper.setDataInfo(edit, data);       
        return page;        
    }
}

function fillForm(newTitle, newContent) {
    let title = document.querySelector("#form-title-input");
    let content = document.querySelector("#form-content-input");
    title.value = newTitle;
    content.value = newContent;
}

/** this should definitely be sanitized before using it! */
function readForm() {
    let title = document.querySelector("#form-title-input").value;
    let content = document.querySelector("#form-content-input").value;
    let obj = {};
    obj.title = title;
    obj.content = content;
    return obj;
}

const helper = {
    setDataInfo(element, object) {
        let cont = element.innerHTML;
        for(let key in object) {
            cont = cont.replace("%" + key, object[key]);
        }
        const shortDateRegex = /shortDate\(([^\)]*)\)/g;
        const shortDateFunctions = cont.match(shortDateRegex);
        for (let i = 0; shortDateFunctions != null && i < shortDateFunctions.length; ++i) {
            shortDateRegex.lastIndex = 0;
            const functionInfo = shortDateRegex.exec(shortDateFunctions[i].toString());
            const parameter = functionInfo[1];
            cont = cont.replace(shortDateFunctions[i], presenter.formatDate(false, object[parameter]));
        }
        
        const longDateRegex = /longDate\(([^\)]*)\)/g;
        const longDateFunctions = cont.match(longDateRegex);
        for (let i = 0; longDateFunctions != null && i < longDateFunctions.length; ++i) {
            longDateRegex.lastIndex = 0;
            const functionInfo = longDateRegex.exec(longDateFunctions[i].toString());
            const parameter = functionInfo[1];
            cont = cont.replace(longDateFunctions[i], presenter.formatDate(true, object[parameter]));
        }
        
        element.innerHTML = cont;
    }
};

