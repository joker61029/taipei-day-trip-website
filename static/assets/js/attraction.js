window.onload = function(){
    let slides = document.getElementById("slides");
    var img_src = document.getElementById("slides_image");
    let name = document.getElementById("attr_name");
    let data = document.getElementById("attr_data");
    let content = document.getElementById("attr_content");
    let address = document.getElementById("attr_address");
    let traffic = document.getElementById("attr_transport");     
    let url = location.pathname;
    url = url.split('/')[2];
    var src="/api/attraction/"+url;
    fetch(src).then(function (response) {
        return response.json();
    }).then(function (result) {
        var attr_data = result["data"][0];
        var attr_image = attr_data.images;
        name.textContent = attr_data.name;
        data.textContent = attr_data.category+" at "+ result["data"][0].mrt
        content.textContent = attr_data.description;
        address.textContent = attr_data.address;
        traffic.textContent = attr_data.transport;
        img_src.setAttribute("src", attr_data.images[0]);

        for(let i=0; i<attr_data.images.length; i++){
            let input = document.createElement("input");
            let label = document.createElement("label");
            let div = document.createElement("div");
            div.classList.add("slide_radio");
            label.classList.add("slide_item");
            input.setAttribute("type", "radio");
            input.setAttribute("name", "control");
            input.setAttribute("onclick","im("+i+")");
            input.setAttribute("id", "input_"+i);
            input.classList.add("time_input");
            if(i==0){
                input.setAttribute("checked", "checked");
            }
            slides.appendChild(label);
            label.appendChild(input);
            label.appendChild(div);
        }
    })
    let time_morn = document.getElementById('time-morn');
    let time_even = document.getElementById('time-even');
    let money = document.getElementById('money');
    time_morn.addEventListener('change', () => {
        money.textContent = "新台幣2000元"
    })
    time_even.addEventListener('change', () => {
        money.textContent = "新台幣2500元"
    })
}

var now_id = 0
function im(id){
    let url = location.pathname;
    url = url.split('/')[2];
    let src="/api/attraction/"+url;
    let img_src = document.getElementById("slides_image");
    fetch(src).then(function (response) {
        return response.json();
    }).then(function (result) {
        now_id = id;
        img_src.setAttribute("src", result["data"][0].images[now_id]);
    })
}

function change(count){
    let url = location.pathname;
    url = url.split('/')[2];
    let src="/api/attraction/"+url;
    let img_src = document.getElementById("slides_image");
    fetch(src).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (now_id+count+1 > result["data"][0].images.length){
            now_id = 0;
        }
        else if (now_id+count+1 <= 0 ){
            now_id = result["data"][0].images.length - 1;
        }
        else{
            now_id += count;
        }
        im(now_id);
        img_src.setAttribute("src", result["data"][0].images[now_id]);
        find_input = document.getElementById("input_"+now_id);
        find_input.click();
    })
}