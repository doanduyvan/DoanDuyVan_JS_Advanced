
const url = "http://localhost:3000/products";


const currentUrl = window.location.href;
const Ourl = new URL(currentUrl);
const id = Ourl.searchParams.get("id");
if (!id) {
    window.location.href = "index.html";
}


const form = document.getElementById("form");
let pname = form.querySelector("input[name='name']");
let price = form.querySelector("input[name='price']");
let des = form.querySelector("textarea[name='description']");
let img = form.querySelector("#previewImage");
let inputimg = form.querySelector("input[name='image']");
const idform = form.querySelector("input[name='id']");
idform.value = id;


var dataOld = {};
Myfetch(url,id, (data) => {
    dataOld = { ...data };
    showProduct(data);
    undoForm();
});

function undoForm() {
    const reset = document.getElementById("reset");
    reset.addEventListener("click", (e) => {
        e.preventDefault();
        showProduct(dataOld);
    });
};


function showProduct(data) {
    pname.value = data.name;
    price.value = data.price;
    des.value = data.description;
    img.src = data.image;
    inputimg.value = data.image;
}

// submit form

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("submit");
    let formdata = new FormData(form);
    // check validate
    var issend = true;
    var data = {};
    for (let [key, value] of formdata) {
        if(key == 'price'){
            value = Number(value);
        }
        data[key] = value;
        if (!value) {
            let tb = {
                name: "Vui lòng nhập tên sản phẩm",
                price: "Vui lòng nhập giá sản phẩm",
                description: "Vui lòng nhập mô tả sản phẩm",
                image: "Vui lòng nhập url hình ảnh sản phẩm"
            }
            toast({
                title: 'Warning',
                message: tb[key],
                type: 'warning',
                duration: 3000
            });
            issend = false;
        }
    }

    if (issend) {
        Myfetchput(url, id, data, (res) => {
            toast({
                title: 'Thành Công!',
                message: "Sửa sản phẩm thành công!",
                type: 'success',
                duration: 1000
            });
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        });
    }
});




function Myfetch(url,id, callback) {
    url = url + "/" + id;
    fetch(url)
        .then(response => response.json())
        .then(callback)
        .catch(error => {
            console.error(error);
        });
}

function Myfetchput(url, id, data, callback) {
    url = url + "/" + id;
    let options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url, options)
        .then(response => response.json())
        .then(callback)
        .catch(error => {
            console.error(error);
        });
}

function load(bool) {
    let loading = document.getElementById('loading');
    if (bool == 1) {
        loading.style.display = 'block';
    } else {
        loading.style.display = 'none';
    }
}