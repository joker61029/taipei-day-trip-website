var user_login = null
function header_onload(){
    var req = new XMLHttpRequest();
    req.open("GET", "/api/user");
    req.onload = function(){
        let login = document.getElementById("header_login");
        let logout = document.getElementById("header_logout");
        let src="/api/user";
        fetch(src).then(function (response) {
            return response.json();
        }).then(function (result) {
            user_login = result["data"];
            if(user_login != null){
                login.style.display="none";
                logout.style.display="inline";
            }
            else{
                login.style.display="inline";
                logout.style.display="none";              
            }
        })
    };
    req.send();
}


function sign_up(){
    let sign_name = document.getElementById("sign_name").value;
    let sign_email = document.getElementById("sign_email").value;
    let sign_password = document.getElementById("sign_password").value;
    var success = document.getElementById("sign_up_success");
    if(sign_name != "" && sign_email != "" && sign_password !=""){
        let toSend = {
            name : sign_name,
            email : sign_email,
            password : sign_password
        }
        fetch("/api/user",{
            method: "POST",
            headers: {
                "Content-Type": "application/json;"
            },
            body: JSON.stringify(toSend)
        }).then(function (response) {
            if(response.status === 200){
                success.textContent = "註冊成功，請重新登入";
                setTimeout("location.reload()",2000)
            }
            else if(response.status === 400){
                success.textContent = "註冊失敗，此帳號已被註冊";
            }
        })
    }
    else{
        success.textContent = "請填寫完整註冊資料";
    }
}
function login(){
    let login_email = document.getElementById("user_email").value;
    let login_password = document.getElementById("user_password").value;
    var success = document.getElementById("login_success");
    if(login_email != "" && login_password != ""){
        let toSend = {
            email : login_email,
            password : login_password
        };
        fetch("/api/user",{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json;"
            },
            body: JSON.stringify(toSend)
        }).then(function (response) {
            console.log(response.status);
            if(response.status === 200){
                success.textContent = "登入成功，網頁將自動跳轉";
                setTimeout("location.reload()",1000)
            }
            else if(response.status === 400){
                success.textContent = "登入失敗，帳號或密碼錯誤";
            }
        })
    }
    else{
        success.textContent = "請填寫完整登入資料";
    }
}

function logout(){
    let req = new XMLHttpRequest();
    req.open("DELETE", "/api/user");
    req.setRequestHeader("Content-Type", "application/json");
    req.send();
    window.location.reload();
}
function go_booking(){
    let login = document.getElementById("header_login");
    if(user_login != null){
        window.open("/booking");
    }
    else{
        login.onclick();
    }
}



header = '<nav class="header">\
<a href="/"><div class="header_name">台北一日遊</div></a>\
<div class="ul">\
    <li onclick="go_booking()" style="display: inline; margin: 10px; cursor: pointer;">預定行程</li>\
    <li id="header_login" onclick="member()" style="display: inline; margin: 10px; cursor: pointer;">登入/註冊</li>\
    <li id="header_logout" onclick="logout()" style="display: none; margin: 10px; cursor: pointer;">登出系統</li>\
</div>\
</nav>\
<div id="mem_login" class="mem_bg_model">\
<div class="mem_table">\
    <div class="mem_box"></div>\
    <div class="mem_login">登入會員帳號</div>\
    <img class="mem_close" onclick="login_close()" src="/static/assets/image/icon_close.png">\
    <form>\
        <input class="mem_input" id="user_email" type="email" autocomplete="off" placeholder="輸入電子郵件" required>\
        <input class="mem_input" id="user_password" type="password" autocomplete="off" placeholder="輸入密碼" required>\
        <button class="mem_btn" type="button" onclick="login()">登入帳戶</button>\
    </form>\
    <div id="login_success"></div>\
    <div class="mem_sign">還沒有帳戶？<div onclick="to_sign_up()" style="cursor: pointer;">點此註冊</div></div>\
</div>\
</div>\
<div id="mem_sign" class="mem_bg_model">\
<div class="mem_table">\
    <div class="mem_box"></div>\
    <div class="mem_login">註冊會員帳號</div>\
    <img class="mem_close" onclick="sign_close()" src="/static/assets/image/icon_close.png">\
    <form>\
        <input class="mem_input" id="sign_name" type="text" autocomplete="off" placeholder="輸入姓名" required>\
        <input class="mem_input" id="sign_email" type="email" autocomplete="off" placeholder="輸入電子郵件" required>\
        <input class="mem_input" id="sign_password" type="password" autocomplete="off" placeholder="輸入密碼" required>\
        <button class="mem_btn" type="button" onclick="sign_up()">註冊新帳戶</button>\
    </form>\
    <div id="sign_up_success"></div>\
    <div class="mem_sign" >已經有帳戶了？<div onclick="member()" style="cursor: pointer;">點此登入</div></div>\
</div>\
</div>' ;

document.write(header);






