let order_id = document.getElementById("order_id")
let order_message = document.getElementById("order_message")
var getUrlString = location.href;
var url = new URL(getUrlString);
ordernum = url.searchParams.get('number')
var src = "/api/order/"+ordernum
fetch(src).then(function (response) {
    return response.json();
}).then(function (result) {
    if(result["data"]==null){
        order_id.textContent = "查無此訂單編號"

    }
    else{
        let order_status = result["data"]["status"]
        if( order_status == 0){
            order_message.textContent = "【已成功授權付款】感謝您的預約，祝您旅途愉快！"
        }
        else{
            order_message.textContent = "【授權失敗】請重新預約，謝謝您！"
        }
    }
})
order_id.textContent = ordernum ;
