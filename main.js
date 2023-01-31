// tạo mảng gồm các object
var Products = [
    {
        id: 1,
        name: "iPhone9",
        price: 700,
        quantity: 0,
    },
    {
        id: 2,
        name: "Samsung",
        price: 400,
        quantity: 0,
    },
    {
        id: 3,
        name: "Nokia",
        price: 100,
        quantity: 0,
    },
    {
        id: 4,
        name: "Sony Xperia",
        price: 450,
        quantity: 0,
    },
    {
        id: 5,
        name: "Motorola",
        price: 180,
        quantity: 0,
    },
    {
        id: 6,
        name: "Oppo",
        price: 600,
        quantity: 0,
    },
    {
        id: 7,
        name: "bPhone",
        price: 90,
        quantity: 0,
    },
    {
        id: 8,
        name: "Xiaomi",
        price: 930,
        quantity: 0,
    },
    {
        id: 9,
        name: "1280",
        price: 310,
        quantity: 0,
    },
    {
        id: 10,
        name: "B32",
        price: 780,
        quantity: 0,
    },
    {
        id: 11,
        name: "iPhone 12 Promax",
        price: 1200,
        quantity: 0,
    },
    {
        id: 12,
        name: "iPhone 13 Promax",
        price: 1300,
        quantity: 0,
    },
    {
        id: 13,
        name: "iPhone 7 plus",
        price: 800,
        quantity: 0,
    },
    {
        id: 14,
        name: "Samsung Galaxy S20 Ultra",
        price: 1700,
        quantity: 0,
    },
    {
        id: 15,
        name: "Xiaomi Redmi Note 9",
        price: 760,
        quantity: 0,
    },
    {
        id: 16,
        name: "Samsung",
        price: 300,
        quantity: 0,
    },
    {
        id: 17,
        name: "OPPO A95",
        price: 1100,
        quantity: 0,
    },
    {
        id: 18,
        name: "Vivo V23e",
        price: 890,
        quantity: 0,
    },
    {
        id: 19,
        name: "OPPO A16K",
        price: 670,
        quantity: 0,
    },
    {
        id: 20,
        name: "iPhone XR 64GB",
        price: 990,
        quantity: 0,
    }
]
var addNew  = document.querySelector("#addnewproduct")

addNew.addEventListener("click", function(e){
    e.preventDefault()
    var NewName = document.querySelector("#newname")
    var NewPrice = document.querySelector("#newprice")
    if(NewName.value.trim() == ""){
        alert("Tên sản phẩm không được để trống")
        return false
    }
    if(isNaN(NewPrice.value) || NewPrice.value <= 0){
        alert("Giá sản phẩm phải là số dương")
        return false
    }
    var NewProduct = {
        id:Products.length + 1,
        name: NewName.value,
        price: NewPrice.value,
        quantity: 0,
    }
    Products.push(NewProduct)
    showProduct()
    document.querySelector("#myForm").reset();
})

var tableBody = document.querySelector("tbody")
// show dữ liệu ra bảng bằng templateString

function showProduct() {
    // for(var item of Products){
    //     console.log(item)
    // }
    // Đổ dữ liệu vào tbody của bảng table
    tableBody.innerHTML = Products.map(function (item) {// lặp qua mảng và gán 1 biến chạy item
        // trả về là một template String và gán giá trị cho từng cột bằng ${}
        // Có 2 sự kiện onchange *1: là sự kiện thay đổi giá trị của nút checkbox // *2: Là sự kiện thay đổi giá trị của thẻ input
        return `
      <tr id="Tr">
                <td><input onchange="showInput(${item.id})" type="checkbox" id="CheckBoxcon"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><input type="number" onchange="tinhTien(${item.id})" value="0" step="1" min="0" id="Input" disabled></td>
                <td id="showTien"></td>
                <td><button onclick="xoaSanPham(${item.id})">Xóa sản phẩm</button></td>
                <td><button onclick="capNhat(${item.id})">Cập nhật</button></td>
            </tr>
      `
    }).join("")
}
showProduct()

function xoaSanPham(id) {
    var check = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không")
    for (var item of Products) {
        if (item.id == id) {
            if (check == true) {
                var list_showTien = document.querySelectorAll("#showTien")
                var list_Tr = document.querySelectorAll("#Tr")
                list_Tr[Products.indexOf(item)].style.display = "none";
                list_showTien[Products.indexOf(item)].innerHTML = null;
                sumPrice.innerHTML = tinhTong(list_showTien)
            } else {
                return false
            }
        }
    }
}

var khoiPhuc = document.querySelector("#khoiphuc")

khoiPhuc.addEventListener("click", function (e) {
    e.preventDefault()
    for (var item of Products) {
        var list_Tr = document.querySelectorAll("#Tr")
        list_Tr[Products.indexOf(item)].style.display = "table-row";
    }
})

function capNhat(id) {
    for (var item of Products) {
        if (item.id == id) {
            var CapNhat = document.querySelector("#capnhat")
            CapNhat.innerHTML = `
            <form id="myForm1">
            <h2>Cập nhật sản phẩm ${item.name}</h2>
            <p>Mời chọn thuộc tính cần cập nhật:</p>
            <p><input type="checkbox" id="hanghoaupdate"> Hàng hóa
            <input type="checkbox" id="dongiaupdate"> Đơn giá</p>
            <input type="text" id="tenhanghoa" placeholder="Nhập tên hàng hóa mới">
            <input type="text" id="dongiamoi" placeholder="Nhập đơn giá mới"><br>
            <button id="update">Cập nhật</button>
            </form>
            `
            var hangHoaUpdate = document.querySelector("#hanghoaupdate")
            var donGiaUpdate = document.querySelector("#dongiaupdate")
            hangHoaUpdate.addEventListener("change", function () {
                document.querySelector("#tenhanghoa").style.display = "block"
                if (!hangHoaUpdate.checked) {
                    document.querySelector("#tenhanghoa").style.display = "none"
                }
            })
            donGiaUpdate.addEventListener("change", function () {
                document.querySelector("#dongiamoi").style.display = "block"
                if (!donGiaUpdate.checked) {
                    document.querySelector("#dongiamoi").style.display = "none"
                }
            })
            document.querySelector("#update").addEventListener("click", function (e) {
                e.preventDefault()
                var check = confirm("Bạn có chắc muốn cập nhật không ?")
                for (var item of Products) {
                    if (item.id == id) {
                        if (check == true) {
                            if (hangHoaUpdate.checked) {
                                item.name = document.querySelector("#tenhanghoa").value
                                showProduct()
                            }
                            if (donGiaUpdate.checked) {
                                item.price = document.querySelector("#dongiamoi").value
                                showProduct()
                            }
                            CapNhat.innerHTML = ""
                        } else {
                            return false
                        }
                    }
                }

            })
        }
    }
}

// document.querySelectorAll: tìm kiếm tất cả
// console.log(list_CheckBox);
var sumPrice = document.querySelector("#sumPrice")

// bắt sự kiện thay đổi giá trị của ô checkBox
document.querySelector("#CheckBoxCha").addEventListener("change", function (e) {
    e.preventDefault()
    var list_CheckBox = document.querySelectorAll("#CheckBoxcon")
    var list_Input = document.querySelectorAll("#Input")
    // Gán giá trị this.checked cho tất cả nút checkbox
    for (var i = 0; i < list_CheckBox.length; i++) {
        list_CheckBox[i].checked = this.checked
    }
    // Mở disabled cho thẻ input khi tất cả checkbox được checked
    for (var i = 0; i < list_Input.length; i++) {
        list_Input[i].disabled = !list_CheckBox[i].checked//nut checkbox ko dc bấm thì input ẩn
        // list_Input[i].disabled = !checkBoxCha.checked
    }
})
// hàm thực hiện chức năng hiện input khi bấm vào từng nút checkbox
function showInput(id) {
    for (var item of Products) {
        if (item.id == id) {
            var list_CheckBox = document.querySelectorAll("#CheckBoxcon")
            var list_Input = document.querySelectorAll("#Input")
            var checkBoxCha = document.querySelector("#CheckBoxCha")
            list_Input[Products.indexOf(item)].disabled = !list_CheckBox[Products.indexOf(item)].checked//nếu nút checkbox ko được tích thì input sẽ disabled 
            // var NewName = document.querySelector("#newname")
            // var NewPrice = document.querySelector("#newprice")
            // if(list_CheckBox[Products.indexOf(item)].checked){
            // NewName.value = item.name
            // NewPrice.value = item.price
            // }else{
            //     NewName.value = ""
            //     NewPrice.value = ""            
            // }
            checkBoxCha.checked = check();// gán giá trị true hoặc false nếu tất cả các nút checkbox được tích sẽ tích ô checkBoxCha
        }
    }
}
// tìm kiến đên tất cả các id="showTien"
var list_showTien = document.querySelectorAll("#showTien")
// hàm thực hiện chức năng tính Thành Tiền
function tinhTien(id) {
    // lặp qua mảng sau đó bắt id
    for (var item of Products) {
        if (item.id == id) {
            var list_Input = document.querySelectorAll("#Input")
            var list_showTien = document.querySelectorAll("#showTien")
            // đổ dữ liệu vào ô thành tiền = số lượng(giá trị của thẻ input) * đơn giá
            list_showTien[Products.indexOf(item)].innerHTML =
                list_Input[Products.indexOf(item)].value * item.price;
        }
    }
    // sau mỗi lần thay đổi giá trị của thẻ input sẽ phải cập nhật giá trị của Tổng Tiền
    sumPrice.innerHTML = tinhTong(list_showTien)
    /* sumPrice.innerHTML =  + Number(list_showTien[0].innerHTML) + Number(list_showTien[1].innerHTML)
     + Number(list_showTien[2].innerHTML)+ Number(list_showTien[3].innerHTML)+ Number(list_showTien[4].innerHTML)
     + Number(list_showTien[5].innerHTML)+ Number(list_showTien[6].innerHTML)*/
}
// hàm thực hiện chức năng tính tổng tiền tham số truyền vào là một mảng showTien
function tinhTong(list_showTien) {
    var sum = 0;
    // lặp hết qua các phần tử trong list_showTien
    // cộng dồn vào biến sum cho đến khi hết vòng lặp
    for (var i = 0; i < list_showTien.length; i++) {
        sum += Number(list_showTien[i].innerHTML);
    }
    // trả về giá trị sum để gán cho(đổ dữ liệu vào) sumPrice.innerHTML 
    return sum;
}

var MucGia = document.querySelector("#mucgia")
// Sự kiện thay đổi giá trị của thẻ select(onchange)
MucGia.addEventListener("change", function (e) {
    var list_showTien = document.querySelectorAll("#showTien")
    var list_Tr = document.querySelectorAll("#Tr")
    // Thẻ select có 4 giá trị 1,2,3,4
    // Sử dụng cấu trúc rẽ nhánh if - else if
    e.preventDefault()
    // show lại hết tất cả các dòng bị none trước khi muốn thay đổi giá trị tiếp theo
    for (var item of Products) {
        list_Tr[Products.indexOf(item)].style.display = "table-row";
    }
    // ẩn các dòng không hợp điều kiện của mức giá
    if (MucGia.value == 1) {
        for (var item of Products) {
            if (item.price >= 250) {
                list_Tr[Products.indexOf(item)].style.display = "none";
                // xóa các Thành Tiền của dòng bị ẩn
                // cập nhật lại Tổng Tiền sau đó
                list_showTien[Products.indexOf(item)].innerHTML = null;
                sumPrice.innerHTML = tinhTong(list_showTien)
            }
        }
        // ẩn các dòng không hợp điều kiện của mức giá
    } else if (MucGia.value == 2) {
        for (var item of Products) {
            if (item.price < 250 || item.price > 500) {
                list_Tr[Products.indexOf(item)].style.display = "none";
                list_showTien[Products.indexOf(item)].innerHTML = null;
                sumPrice.innerHTML = tinhTong(list_showTien)
            }
        }
        // ẩn các dòng không hợp điều kiện của mức giá
    } else if (MucGia.value == 3) {
        for (var item of Products) {
            if (item.price < 500) {
                list_Tr[Products.indexOf(item)].style.display = "none";
                list_showTien[Products.indexOf(item)].innerHTML = null;
                sumPrice.innerHTML = tinhTong(list_showTien)
            }
        }
    } else {
        // show tất cả các dòng
        list_Tr[Products.indexOf(item)].style.display = "table-row";
    }
})
// hàm check thực hiện chức năng trả check các nút checkBox con, nếu tất cả được chọn thì
// biến count sẽ bằng độ dài của mảng Products => trả về true, ngược lại trả về false
function check() {
    var count = 0;
    var list_CheckBox = document.querySelectorAll("#CheckBoxcon")
    for (var item of Products) {
        // lặp qua mảng nếu tất nút checkbox được chọn sẽ tăng biến count lên 1 đơn vị cho đến khi hết vòng lặp
        if (list_CheckBox[Products.indexOf(item)].checked == true) {
            count++;
        }
    }
    // nếu count bằng độ dài của mảng thì sẽ trả về giá trị true để gán cho nút checkBoxCha ngược lại false
    if (count == Products.length) {
        return true
    }
    return false
}


