function member() {
    let signing = document.getElementById("mem_sign");
    signing.style.display="none";
    let running = document.getElementById("mem_login");
    running.style.display="flex";
};

function login_close() {
    let running = document.getElementById("mem_login");
    running.style.display="none";
};

function to_sign_up(){
    let running = document.getElementById("mem_login");
    running.style.display="none";
    let signing = document.getElementById("mem_sign");
    signing.style.display="flex";
};

function sign_close(){
    let signing = document.getElementById("mem_sign");
    signing.style.display="none";
}