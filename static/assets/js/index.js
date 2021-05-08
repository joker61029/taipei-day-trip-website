window.onload = function(){
    let src="/api/attractions";
    fetch(src).then(function (response) {
        return response.json();
    }).then(function (result) {
        for(let i=0; i<24; i++){
            let hyper = document.createElement("a");
            hyper.setAttribute("href", "attraction/"+result["data"][i].id);
            let box = document.createElement("div");
            box.setAttribute("id","change");
            box.classList.add("box");
            let newbox = document.getElementById("newbox");
            let img = document.createElement("img");
            let name = document.createElement("div");
            let mrt = document.createElement("div");
            let category = document.createElement("div");
            img.classList.add("image");
            img.setAttribute("src", result["data"][i].images[0]);
            name.classList.add("text");
            name.textContent = result["data"][i].name;
            mrt.textContent = result["data"][i].mrt;
            mrt.classList.add("mrt")
            category.textContent = result["data"][i].category;
            category.classList.add("category")
            newbox.appendChild(hyper);
            hyper.appendChild(box);
            box.appendChild(img);
            box.appendChild(name);
            box.appendChild(mrt);
            box.appendChild(category);
        }
    })
    var count = 2
    loading = false
    window.onscroll = function(){
        if(count != null && loading == false){
            if (Math.abs(document.body.clientHeight - document.documentElement.clientHeight) <= (document.documentElement.scrollTop || document.body.scrollTop)) {
                let src="/api/attractions?page="+count;
                loading = true;
                fetch(src).then(function (response) {
                    return response.json();
                }).then(function (result) {
                    for(let i=0; i<result["data"].length; i++){
                        let hyper = document.createElement("a");
                        hyper.setAttribute("href", "attraction/"+result["data"][i].id);
                        let box = document.createElement("div");
                        box.setAttribute("id","change");
                        box.classList.add("box");
                        let newbox = document.getElementById("newbox");
                        let img = document.createElement("img");
                        let name = document.createElement("div");
                        let mrt = document.createElement("div");
                        let category = document.createElement("div");
                        img.classList.add("image");
                        img.setAttribute("src", result["data"][i].images[0]);
                        name.classList.add("text");
                        name.textContent = result["data"][i].name;
                        mrt.textContent = result["data"][i].mrt;
                        mrt.classList.add("mrt")
                        category.textContent = result["data"][i].category;
                        category.classList.add("category")
                        newbox.appendChild(hyper);
                        hyper.appendChild(box);
                        box.appendChild(img);
                        box.appendChild(name);
                        box.appendChild(mrt);
                        box.appendChild(category);
                    }
                    count = result["nextPage"];
                    loading = false;
                })
                
            }
        }
    }
}

function search_key(){
    let nothing = document.getElementById("nothing")
    nothing.removeAttribute("class");
    document.getElementById("nothing").innerHTML = "";
    document.getElementById("newbox").innerHTML = "";
    let keyword = document.getElementById("keywords").value
    let src="/api/attractions?page=0&keywords="+keyword;
    fetch(src).then(function (response) {
        return response.json();
    }).then(function (result) {
        if(result["data"] == null){
            nothing.classList.add("no_found");
            nothing.textContent="沒有相關資料喔~(*￣3￣)╭(然後我不要再寫第三次了QuQ)";
        }
        else{
            for(let i=0; i<result["data"].length; i++){
                let hyper = document.createElement("a");
                hyper.setAttribute("href", "attraction/"+result["data"][i].id);
                let box = document.createElement("div");
                box.setAttribute("id","change");
                box.classList.add("box");
                let newbox = document.getElementById("newbox");
                let img = document.createElement("img");
                let name = document.createElement("div");
                let mrt = document.createElement("div");
                let category = document.createElement("div");
                img.classList.add("image");
                img.setAttribute("src", result["data"][i].images[0]);
                name.classList.add("text");
                name.textContent = result["data"][i].name;
                mrt.textContent = result["data"][i].mrt;
                mrt.classList.add("mrt")
                category.textContent = result["data"][i].category;
                category.classList.add("category")
                newbox.appendChild(hyper);
                hyper.appendChild(box);
                box.appendChild(img);
                box.appendChild(name);
                box.appendChild(mrt);
                box.appendChild(category);
            }
        }
        key_page = result["nextPage"];
    })

    var key_count = 1
    loading = false
    window.onscroll = function(){
        let keyword = document.getElementById("keywords").value;
        if(key_count != null && loading == false){
            if (Math.abs(document.body.clientHeight - document.documentElement.clientHeight) <= (document.documentElement.scrollTop || document.body.scrollTop)) {
                let src="/api/attractions?page="+key_count+"&keywords="+keyword;
                loading = true;
                fetch(src).then(function (response) {
                    return response.json();
                }).then(function (result) {
                    for(let i=0; i<result["data"].length; i++){
                        let hyper = document.createElement("a");
                        hyper.setAttribute("href", "attraction/"+result["data"][i].id);
                        let box = document.createElement("div");
                        box.setAttribute("id","change");
                        box.classList.add("box");
                        let newbox = document.getElementById("newbox");
                        let img = document.createElement("img");
                        let name = document.createElement("div");
                        let mrt = document.createElement("div");
                        let category = document.createElement("div");
                        img.classList.add("image");
                        img.setAttribute("src", result["data"][i].images[0]);
                        name.classList.add("text");
                        name.textContent = result["data"][i].name;
                        mrt.textContent = result["data"][i].mrt;
                        mrt.classList.add("mrt")
                        category.textContent = result["data"][i].category;
                        category.classList.add("category")
                        newbox.appendChild(hyper);
                        hyper.appendChild(box);
                        box.appendChild(img);
                        box.appendChild(name);
                        box.appendChild(mrt);
                        box.appendChild(category);
                    }
                    key_count = result["nextPage"];
                    loading = false;
                })
                
            }
        }
    }
}