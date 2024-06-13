
// const baseurl = "http://localhost/ServerJS/";
// const baseurl = "https://duyvanphp.000webhostapp.com/";

// const url = baseurl + "addproduct.php";


const url = "http://localhost:3000/products";




const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let formdata = new FormData(form);

     var issend = true;
     var data = {};
    for(let [key, value] of formdata){
        if(key == 'price'){
            value = Number(value);
        }
        data[key] = value;
            if(!value){
                let tb = {
                    name : "Vui lòng nhập tên sản phẩm",
                    price : "Vui lòng nhập giá sản phẩm",
                    description : "Vui lòng nhập mô tả sản phẩm",
                    image : "Vui lòng nhập url hình ảnh sản phẩm"
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
    if(issend){
        Myfetch(url, data, (res) => {
            console.log(res);
            form.reset();
            toast({
                title: 'Thành Công!',
                message: "Thêm sản phẩm thành công!",
                type: 'success',
                duration: 2000
            });
        });
    }
    
});



function Myfetch(url, data, callback){
    let options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url,options)
    .then(response => response.json())
    .then(callback)
    .catch(error => {
        console.error(error);
    });
}


function load(bool){
    let loading = document.getElementById('loading');
    if(bool == 1){
        loading.style.display = 'block';
    }else{
        loading.style.display = 'none';
    }
}