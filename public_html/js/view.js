"use strict";

const headView = {
    render (data) {
        console.log("View: render Header");
        
        let headPage = document.getElementById('head');
        console.log(data);
        console.log(headPage);
        helper.setDataInfo(headPage, data[0]);
        helper.setDataInfo(headPage, data[0].posts);
        let navi = document.getElementById("navigation");
        for(let blog of data){
            let li = navi.firstElementChild.cloneNode(true);
            li.innerHTML = li.innerHTML.replace("%blog", blog.name);
            navi.append(li);
        }
        navi.firstElementChild.remove();
        helper.setDataInfo(headPage, data);
        return headPage;  
    }
};

const blogInfos = {
    render (data) {
        let info = document.querySelector('main');
        console.log(info);
        console.log(data);
        helper.setDataInfo(info, data);
        helper.setDataInfo(info, data.posts);
        
        const showBlogButton = info.querySelector('#showBlog');
        console.log(showBlogButton);
        showBlogButton.addEventListener('click', function(evt) {
            console.log('Foo');
            evt.preventDefault();
            presenter.showFullBlog();
        });       
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
        overviewLink.setAttribute('href', '/blogView/' + presenter.blog.id);
        overviewLink.addEventListener('click', router.handleNavigationEvent);
        
        return page;        
    }
};

const commentView = {
    render(data) {
        console.log("View: render con commentView");
        let comment = document.querySelector('#templates #commentView').cloneNode(true);
        helper.setDataInfo(comment, data);
        helper.setDataInfo(comment, data.author);
        return comment;
    }
};

const helper = {
    setDataInfo(element, object) {
        let cont = element.innerHTML;
        for(let key in object) {
            cont = cont.replace("%" + key, object[key]);
        }
        element.innerHTML = cont;
    }
};


