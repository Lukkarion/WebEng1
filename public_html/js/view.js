"use strict";

const headView = {
    render (data) {
        console.log("View: render Header");
        
        let headPage = document.getElementById('head');
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
  //      let a = page.querySelector("a");
//        a.addEventListener("click", router.handleNavigationEvent());
        return headPage;  
    }
}
const blogView = {
    render(data) {
        console.log("View: render von blogView");
        let all = document.getElementById("overview");
        all.removeAttribute("id");
        for(let i in data){
           let post = document.querySelector('article').cloneNode(true);
            helper.setDataInfo(post, data[i]);
            helper.setDataInfo(post, data[i].replies);
            all.append(post);
        }
        all.firstElementChild.remove();
        
        return all;
    }
};

const postView = {
    render(data) {
        console.log("View: render von postView");        
        let page = document.getElementById('post').cloneNode(true);
        helper.setDataInfo(page, data);
        document.getElementById('post').remove();
        return page;        
    }
};

const commentView = {
    render(data) {
        console.log("View: render con commentView");
        let post = document.getElementById("postView");
        post.removeAttribute("id");
        for(let i in data){
            let page = post.querySelector('article').cloneNode(true);
            helper.setDataInfo(page, data[i]);
            helper.setDataInfo(page, data[i].author);
            console.log(i);
            post.append(page);
        }
        post.firstElementChild.remove();
        return post;
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


