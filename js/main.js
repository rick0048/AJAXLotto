document.addEventListener("DOMContentLoaded", init);

let page = document.querySelectorAll(".page");

function init() {
    console.log(page);
}
document.getElementById("btnSend").addEventListener("click", function () {

    var min = document.getElementById("digits").value;
    console.log("Min is: " + min);
    var max = document.getElementById("max").value;
    console.log("Max is: " + max);
    
    page[0].classList.toggle("active");
    page[1].classList.toggle("active");

    let formdata = new FormData();
    let url = "https://davidst.edumedia.ca/mad9014/nums.php";

    formdata.append("digits", min);
    formdata.append("max", max);

    let customSettings = {
        method: "POST",
        mode: "cors",
        body: formdata
    };

    let request = new Request(url, customSettings);
    console.log("Request is: \n");
    console.log(request);
    console.log("Request body is: \n");
    console.log(request.body);
    
    fetch(request)
        .then(function (response) {
            console.log("Response is: \n"); // https://sitechecker.pro/http-status-codes/
            console.log(response);

            return response.json();
        })
        .then(
            function (data) {
                console.log("Data is: \n");
                console.log(data);
                
                if (data["code"] != 0) {
                    alert("Error: " + data["message"]);
                    page[0].classList.toggle("active");
                    page[1].classList.toggle("active");
                    return;
                }
                
                let display = document.querySelector(".num_list");
                display.innerHTML = "";

                for (let item in data.numbers) {
                    let listItems = document.createElement("li");
                    listItems.innerHTML = data.numbers[item];
                    display.appendChild(listItems);
                }
            }
        ).catch(function (error) {
            alert("Error: " + error.message);
        });
})

document.getElementById("btnBack").addEventListener("click", function () {

    page[0].classList.toggle("active");
    page[1].classList.toggle("active");


})
