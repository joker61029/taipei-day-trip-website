var url = location.pathname;
url = url.split('/')[2];
var attr_data = ""

function attraction_onload(){
    let slides = document.getElementById("slides");
    var img_src = document.getElementById("slides_image");
    let name = document.getElementById("attr_name");
    let data = document.getElementById("attr_data");
    let content = document.getElementById("attr_content");
    let address = document.getElementById("attr_address");
    let traffic = document.getElementById("attr_transport");     
    var src="/api/attraction/"+url;
    fetch(src).then(function (response) {
        return response.json();
    }).then(function (result) {
        attr_data = result["data"][0];
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
        let [today] = new Date().toISOString().split("T");
        let now_date = document.getElementById("date"); 
        now_date.setAttribute("min", today); 
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
    let img_src = document.getElementById("slides_image");
    now_id = id;
    img_src.setAttribute("src", attr_data.images[now_id]);
}

function change(count){
    let img_src = document.getElementById("slides_image");
    if (now_id+count+1 > attr_data.images.length){
        now_id = 0;
    }
    else if (now_id+count+1 <= 0 ){
        now_id = attr_data.images.length - 1;
    }
    else{
        now_id += count;
    }
    im(now_id);
    img_src.setAttribute("src", attr_data.images[now_id]);
    find_input = document.getElementById("input_"+now_id);
    find_input.click();
}

function booking_submit(){
    let login = document.getElementById("header_login");
    let date = document.getElementById("date").value;
    let check_date = document.getElementById("check_date");
    let src="/api/user";
    fetch(src).then(function (response) {
        return response.json();
    }).then(function (result) {
        if(result["data"] != null){
            if(date != ""){
                check_date.style.display="none";
                book_request();
            }
            else{
                check_date.style.display="flex";
            }
        }
        else{
            login.click();            
        }
    })
}


function book_request(){
    let name = document.getElementById("attr_name").textContent;
    let date = document.getElementById("date").value;
    let money = document.getElementById("money").textContent;
    let address = document.getElementById("attr_address").textContent;
    if(money == "新台幣2000元"){time = "afternoon"; money = 2000;}
    else{time = "evening"; money = 2500;}
    let toSend = {
        id : url,
        attr_name : name,
        address : address,
        img : attr_data.images[0],
        date : date,
        time : time,
        money : money
    }
    fetch("/api/booking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;"
        },
        body: JSON.stringify(toSend)
    }).then(function (response){
        if(response.status == 200){
            window.location.replace("/booking");
        }
    })
}