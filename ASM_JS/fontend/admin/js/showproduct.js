// const baseurl = "http://localhost/ServerJS/";
const baseurl = "https://duyvanphp.000webhostapp.com/";

let url = baseurl + "showproduct.php";
let urlImg = baseurl + "img/";

load(1);
fetch(url,{
    method: 'GET',
    timeout: 20000,
})
    .then(response => response.json())
    .then(data => {
        load(0);
        showProduct(data);
    })
    .catch(error => {
        load(0);
        toast({
            title: 'Thất bại!',
            message: "Lỗi kết nối đến server!",
            type: 'fail',
            duration: 4000
        });
        console.error(error);
    });


function showProduct(data) {
    let tbody = document.getElementById("tbody");
    data.forEach(e => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${e.id}</td>
            <td>${e.pname}</td>
            <td>${format(e.price)} VND</td>
            <td>${e.des}</td>
            <td>
                <div class="hinh">
                    <img src="${urlImg + e.img}" alt="">
                </div>
            </td>
            <td><a href="editproduct.html?id=${e.id}">Sửa</a></td>
            <td><a class="dell" data-id="${e.id}" href="#">Xóa</a></td>
            `;
        tbody.appendChild(tr);

        tr.querySelector(".dell").addEventListener("click", function (e) {
            e.preventDefault();
            const id = e.target.getAttribute("data-id");
            const check = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
            if (check) {
                delrow(id, tr);
            }
        });

    });
}


// xoa san pham

function delrow(id, tr) {
    load(1);
    fetch(baseurl + "delproduct.php?id=" + id, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            load(0);
            if(data.status == 1){
                toast({
                    title: 'Thành Công!',
                    message: data.message,
                    type: 'success',
                    duration: 4000
                });
                tr.remove();
            }else{
                toast({
                    title: 'Thất bại!',
                    message: data.message,
                    type: 'fail',
                    duration: 4000
                });
            }
        })
        .catch(error => {
            load(0);
            toast({
                title: 'Thất bại!',
                message: error,
                type: 'fail',
                duration: 4000
            });
            console.error(error);
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