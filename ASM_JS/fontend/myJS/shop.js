
const baseurl = "https://duyvanphp.000webhostapp.com/";
// const baseurl = "http://localhost/ServerJS/";



const urlImg = baseurl + "img/";
const showurl = baseurl + "showproduct.php";


load(1);
fetch(showurl)
    .then(response => response.json())
    .then(data => {
        load(0);
        showProduct(data);
        console.log(data);
    })
    .catch(error => {
        toast({
            title: 'Thất Bại!',
            message: 'Không thể kết nối đến server',
            type: 'fail',
            duration: 4000
        });
        load(0);
        console.log(error);
    });


function showProduct(data) {
    const showproductdiv = document.getElementById("showproduct");
    data.forEach(element => {

        let div = document.createElement("div");
        div.classList.add("col-md-6", "col-lg-3", "ftco-animate","ftco-animated","fadeInUp");
        div.innerHTML = `
        <div class="product">
            <a href="product-single.html?id=${element.id}" class="img-prod"><img class="img-fluid customimg" src="${urlImg + element.img}" alt="">
                <!-- <span class="status">0%</span> -->
                <div class="overlay"></div>
            </a>
            <div class="text py-3 pb-4 px-3 text-center">
                <h3><a href="#">${element.pname}</a></h3>
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


function format(number) {
    return Number(number).toLocaleString();
}

function load(bool){
    let loading = document.getElementById('loading');
    if(bool == 1){
        loading.style.display = 'block';
    }else{
        loading.style.display = 'none';
    }
}