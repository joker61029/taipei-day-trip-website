TPDirect.setupSDK(20436, 'app_WCn21YF66ckSDyTGES99QWRpbT7GjtpMlzOL6BWINvjwkyqgazfgTGz9Ha1c', 'sandbox')
TPDirect.card.setup({
            fields: {
                number: {
                    element: document.getElementById('card-number'),
                    placeholder: '**** **** **** ****'
                },
                expirationDate: {
                    element: document.getElementById('tappay-expiration-date'),
                    placeholder: 'MM / YY'
                },
                ccv: {
                    element: document.getElementById('card-cvc'),
                    placeholder: '後三碼'
                }
            },
            styles: {
                'input': {
                    'color': 'gray'
                },
                'input.ccv': {
                    // 'font-size': '16px'
                },
                ':focus': {
                    'color': 'black'
                },
                '.valid': {
                    'color': 'green'
                },
                '.invalid': {
                    'color': 'red'
                },
                '@media screen and (max-width: 400px)': {
                    'input': {
                        'color': 'orange'
                    }
                }
            }
        })
        // listen for TapPay Field
        TPDirect.card.onUpdate(function (update) {
            /* Disable / enable submit button depend on update.canGetPrime  */
            /* ============================================================ */

            // update.canGetPrime === true
            //     --> you can call TPDirect.card.getPrime()
            // const submitButton = document.querySelector('button[type="submit"]')
            if (update.canGetPrime) {
                // submitButton.removeAttribute('disabled')
                $('button[type="submit"]').removeAttr('disabled')
            } else {
                // submitButton.setAttribute('disabled', true)
                $('button[type="submit"]').attr('disabled', true)
            }


            /* Change card type display when card type change */
            /* ============================================== */

            // cardTypes = ['visa', 'mastercard', ...]
            var newType = update.cardType === 'unknown' ? '' : update.cardType
            $('#cardtype').text(newType)



            /* Change form-group style when tappay field status change */
            /* ======================================================= */

            // number 欄位是錯誤的
            if (update.status.number === 2) {
                setNumberFormGroupToError('.card-number-group')
            } else if (update.status.number === 0) {
                setNumberFormGroupToSuccess('.card-number-group')
            } else {
                setNumberFormGroupToNormal('.card-number-group')
            }

            if (update.status.expiry === 2) {
                setNumberFormGroupToError('.expiration-date-group')
            } else if (update.status.expiry === 0) {
                setNumberFormGroupToSuccess('.expiration-date-group')
            } else {
                setNumberFormGroupToNormal('.expiration-date-group')
            }

            if (update.status.cvc === 2) {
                setNumberFormGroupToError('.cvc-group')
            } else if (update.status.cvc === 0) {
                setNumberFormGroupToSuccess('.cvc-group')
            } else {
                setNumberFormGroupToNormal('.cvc-group')
            }
        })

        $('form').on('submit', function (event) {
            event.preventDefault()
            
            // fix keyboard issue in iOS device
            forceBlurIos()
            
            const tappayStatus = TPDirect.card.getTappayFieldsStatus()
            // console.log(tappayStatus)

            // Check TPDirect.card.getTappayFieldsStatus().canGetPrime before TPDirect.card.getPrime
            if (tappayStatus.canGetPrime === false) {
                alert('請確實填寫表格內容')
                return
            }

            // Get prime
            TPDirect.card.getPrime(function (result) {
                if (result.status !== 0) {
                    // alert('get prime error ' + result.card.prime)
                    return 
                }                
                fetch("/api/booking").then(function(response){
                    return response.json();
                }).then(function(ord_result){
                    let apiord = ord_result["data"]
                    let contact_name = document.getElementById("contact_name").value;
                    let contact_email = document.getElementById("contact_email").value;
                    let contact_phone = document.getElementById("contact_phone").value;
                    let order = {
                        price : apiord["price"],
                        trip : {
                            attraction : {
                                id : apiord["attraction"].id,
                                name : apiord["attraction"].name,
                                address : apiord["attraction"].address,
                                image : apiord["attraction"].image
                            },
                            date : apiord["date"],
                            time : apiord["time"]
                        },
                        contact : {
                            name : contact_name,
                            email : contact_email,
                            phone : contact_phone
                        }
                    }
                    let toSend = {
                        prime : result.card.prime,
                        order : order
                    }
                    fetch("/api/orders",{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;"
                        },
                        body: JSON.stringify(toSend)
                    }).then(function (booking_response) {
                        if(booking_response.status === 200){                            
                            booking_response.json().then(function(text){
                            window.location.replace("/thankyou?number="+text["data"].number);
                            })
                        }
                        else if(booking_response.status === 400){
                            alert("訂單建立失敗，將自動整理頁面")
                            window.location.reload();
                        }
                        else if(booking_response.status === 403){
                            window.location.reload("/");
                        }
                    })
                })
                
                
                
            })
        })

        function setNumberFormGroupToError(selector) {
            $(selector).addClass('has-error')
            $(selector).removeClass('has-success')
        }

        function setNumberFormGroupToSuccess(selector) {
            $(selector).removeClass('has-error')
            $(selector).addClass('has-success')
        }

        function setNumberFormGroupToNormal(selector) {
            $(selector).removeClass('has-error')
            $(selector).removeClass('has-success')
        }
        
        function forceBlurIos() {
            if (!isIos()) {
                return
            }
            var input = document.createElement('input')
            input.setAttribute('type', 'text')
            // Insert to active element to ensure scroll lands somewhere relevant
            document.activeElement.prepend(input)
            input.focus()
            input.parentNode.removeChild(input)
        }
        
        function isIos() {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        }