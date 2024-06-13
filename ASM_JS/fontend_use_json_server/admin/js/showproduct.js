

const myurl = "http://localhost:3000/products";

function showProduct(data) {
    let tbody = document.getElementById("tbody");
    data.forEach(e => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${format(e.price)} VND</td>
            <td>${e.description}</td>
            <td>
                <div class="hinh">
                    <img src="${e.image}" alt="">
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
                MyfetchDelete(myurl,id,function(data){
                    tr.remove();
                    toast({
                        title: 'Thành Công!',
                        message: "Xóa sản phẩm thành công!",
                        type: 'success',
                        duration: 2000
                    });
                });
            }
        });

    });
}




Myfetch(myurl, function(data){
    console.log(data);
    showProduct(data);
});


 function Myfetch(url,callback){
    fetch(url)
    .then(response => response.json())
    .then(callback)
    .catch(error => {
        console.error(error);
    });
}

function MyfetchDelete(url,id,callback){
    url = url + "/" + id;
    fetch(url,{
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(callback)
    .catch(error => {
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