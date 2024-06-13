
const url = "http://localhost:3000/products";

const urlGet = window.location.href;
const Ourl = new URL(urlGet);
const id = Ourl.searchParams.get("id");

if (!id) {
    window.location.href = "index.html";
}



Myfetchone(url,id,(data)=>{
    console.log(data);
    showProductone(data);
});

function showProductone(data) {
    const img = document.getElementById("img");
    const aimg = img.parentElement;
    const pname = document.getElementById("pname");
    const price = document.getElementById("price");
    const des = document.getElementById("des");
    
    img.src =  data.image;
    aimg.href =  data.image;
    pname.innerHTML = data.name;
    price.innerHTML = format(data.price) + " VND";
    des.innerHTML = data.description;
}


Myfetch(url, function(data){
    showProducts(data);
});



function showProducts(data) {

    const showproductdiv = document.getElementById("showall");
    
    data.forEach(element => {
        let div = document.createElement("div");
        div.classList.add("col-md-6", "col-lg-3", "ftco-animate","fadeInUp","ftco-animated");
        div.innerHTML = `
        <div class="product">
        <a href="product-single.html?id=${element.id}" class="img-prod"><img class="img-fluid customimg" src="${element.image}" alt="">
            <!-- <span class="status">40%</span> -->
            <div class="overlay"></div>
        </a>
        <div class="text py-3 pb-4 px-3 text-center">
            <h3><a href="#">${element.name}</a></h3>
            <div class="d-flex">
                <div class="pricing">
                    <p class="price">
                        <!-- <span class="mr-2 price-dc">$120.00</span> -->
                        <span class="price-sale">${format(element.price)} VND</span>
                    </p>
                </div>
            </div>
            <div class="bottom-area d-flex px-3">
                <div class="m-auto d-flex">
                    <a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center">
                        <span><i class="ion-ios-menu"></i></span>
                    </a>
                    <a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">
                        <span><i class="ion-ios-cart"></i></span>
                    </a>
                    <a href="#" class="heart d-flex justify-content-center align-items-center ">
                        <span><i class="ion-ios-heart"></i></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
        `;
        showproductdiv.appendChild(div);
    });
}



function Myfetchone(url,id, callback) {
    url = url + "/" + id;
    fetch(url)
        .then(response => response.json())
        .then(callback)
        .catch(error => {
            console.error(error);
        });
}

function Myfetch(url,callback){
    fetch(url)
    .then(response => response.json())
    .then(callback)
    .catch(error => {
        console.error(error);
    });
}


function format(number) {
    return Number(number).toLocaleString();
}
