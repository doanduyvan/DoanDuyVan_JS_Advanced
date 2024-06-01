
// const baseurl = "http://localhost/ServerJS/";
const baseurl = "https://duyvanphp.000webhostapp.com/";

const url = baseurl + "addproduct.php";

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let formdata = new FormData(form);
    
    // check validate
     var issend = true;
    for(let [key, value] of formdata){
       
        let input = form.querySelector(`input[name="${key}"]`);
        if(input instanceof HTMLInputElement && input.type == 'file'){
            if(value.size == 0){
                toast({
                    title: 'Warning',
                    message: 'vui lòng thêm hình ảnh cho sản phẩm',
                    type: 'warning',
                    duration: 5000
                });
                issend = false;
            }
           
        
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
        fetch(url, {
            method: 'POST',
            body: formdata
        })
        .then(response => response.json())
        .then(data=>{
            load(0);
            if(data.status == 1){
                form.reset();
            }
            toast({
                title: data.title,
                message: data.message,
                type: data.type,
                duration: 4000
            });
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
        
    }else{

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