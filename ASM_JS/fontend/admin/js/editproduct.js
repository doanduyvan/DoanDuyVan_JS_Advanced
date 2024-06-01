const baseurl = "https://duyvanphp.000webhostapp.com/";
// const baseurl = "http://localhost/ServerJS/";



const currentUrl = window.location.href;
const Ourl = new URL(currentUrl);
const id = Ourl.searchParams.get("id");

if(!id || isNaN(Number(id))){
    window.location.href = "index.html";
}


const urlImg = baseurl + "img/";
const showurl = baseurl + "showproduct.php?id=" + id;
const editurl = baseurl + "editproduct.php";

const form = document.getElementById("form");
let pname = form.querySelector("input[name='name']");
let price = form.querySelector("input[name='price']");
let des = form.querySelector("textarea[name='des']");
let img = form.querySelector("#previewImage");
let inputimg = form.querySelector("input[name='img']");
const reset = document.getElementById("reset");
const idform = form.querySelector("input[name='id']");
idform.value = id;

load(1);
fetch(showurl)
    .then(response => response.json())
    .then(data => {
        load(0);
        showProduct(data);
        reset.addEventListener("click", function(e){
            showProduct(data);
        });
        // console.log(data);
    })
    .catch(error =>{
        load(0);
        toast({
            title: 'Thất Bại!',
            message: "Lỗi kết nối đến server!",
            type: 'fail',
            duration: 4000
        });
        console.error(error);
    });

function showProduct(data) {
    pname.value = data.pname;
    price.value = data.price;
    des.value = data.des;
    img.src = urlImg + data.img;
    inputimg.value = '';
}

// submit form

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let formdata = new FormData(form);
    
    // check validate
     var issend = true;
    for(let [key, value] of formdata){
       
        let input = form.querySelector(`input[name="${key}"]`);
        if(input instanceof HTMLInputElement && input.type == 'file'){
               
        }else{
            // sử lí các thẻ input không có type là file
            if(!value){
                let tb = {
                    name : "Vui lòng nhập tên sản phẩm",
                    price : "Vui lòng nhập giá sản phẩm",
                    des : "Vui lòng nhập mô tả sản phẩm",
                }
                toast({
                    title: 'Warning',
                    message: tb[key],
                    type: 'warning',
                    duration: 5000
                });
                issend = false;
            }
        }   
    }

    if(issend){
        load(1);
        fetch(editurl, {
            method: 'POST',
            body: formdata
        })
        .then(response => response.json())
        .then(data=>{
            load(0);
            console.log(data);
            if(data.status == 1){
                toast({
                    title: "Thành Công!",
                    message: "Sửa sản phẩm thành công",
                    type: 'success',
                    duration: 4000
                });
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);

            }else{
                toast({
                    title: "Thất Bại!",
                    message: "Sửa sản phẩm thất bại",
                    type: 'fail',
                    duration: 4000
                });
            }
        })
        .catch(error => {
            load(0);
            toast({
                title: 'Thất Bại!',
                message: error,
                type: 'fail',
                duration: 4000
            });
        });
        
    }
    
});



function load(bool){
    let loading = document.getElementById('loading');
    if(bool == 1){
        loading.style.display = 'block';
    }else{
        loading.style.display = 'none';
    }
}