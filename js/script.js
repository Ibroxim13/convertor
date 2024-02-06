const uzs = document.querySelector(".uzs"),
    usd = document.querySelector(".usd"),
    updatedTime = document.querySelector(".updated-time")

function changeConvertor(val1, val2, type) {
    const request = new XMLHttpRequest();

    request.open("GET", 'https://api.currencyapi.com/v3/latest?apikey=cur_live_HgUap65ENbFbrPNxKg2ZKDhWhJBKAxK9iDDmZS1P')
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    request.send()

    request.addEventListener("load", () => {
        if (request.status === 200) {
            const data = JSON.parse(request.response)
            if (type === "uzsToUsd") {
               val2.value = (+val1.value / data.data.UZS.value).toFixed(2) 
            }
            if(type ==="usdToUzs" ){
                val2.value = (+val1.value * (data.data.UZS.value)).toFixed(2)
            }          
            updatedTime.innerHTML = data.meta.last_updated_at
        }
        else {
            val2.value = "Something went wrong!"
        }
    })
}

uzs.addEventListener("input", (e) => changeConvertor(uzs, usd, "uzsToUsd"))
usd.addEventListener("input", (e) => changeConvertor(usd, uzs, "usdToUzs"))
