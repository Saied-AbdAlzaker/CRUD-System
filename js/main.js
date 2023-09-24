var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var searchInput = document.getElementById('searchInput');
var addBtn = document.getElementById('addBtn');
var clearBtn = document.getElementById('clearBtn');
var inputs = document.getElementsByClassName('form-control');
var searchInput = document.getElementById('searchInput');
var textAlert = document.getElementById("textAlert");
var nameAlert = document.getElementById('nameAlert');
var numberAlert = document.getElementById('numberAlert');
var categoryAlert = document.getElementById('categoryAlert');

var currentIndex=0;
// -------------------------------
var products = [];

if (JSON.parse(localStorage.getItem('productsList')) != null) {
    products = JSON.parse(localStorage.getItem('productsList'));
    displayData()
} 

addBtn.onclick = function () {
    if (productNameInput.value != '' && productPriceInput.value != '' && productCategoryInput.value != '' && productDescInput.value != '') {
        if (addBtn.innerHTML == 'Add product') {  //add mode
            addProduct();
        }
        else {  //update mode
            updateProduct()
        }
        textAlert.classList.add("d-none");
        displayData();
        clearForm();
    } else {
        textAlert.classList.remove("d-none");
        addBtn.removeAttribute('disabled');
        clearBtn.removeAttribute('disabled');
    }
}
// -------------------------------
function addProduct() {
    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
    }
    products.push(product);
    localStorage.setItem('productsList', JSON.stringify(products));
}
// -------------------------------
function displayData() {
    var cartona = '';
    for (var i = 0; i < products.length; i++) {
        cartona += `<tr>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].desc}</td>
                <td><button onclick="getProductInfo(${i})" class='btn btn-warning'>Update</button></td>
                <td><button onclick="deleteProduct(${i})" class='btn btn-danger'>Delete</button></td>
               </tr>`
    }
    document.getElementById('tableBody').innerHTML = cartona;
}
// -------------------------------
function deleteProduct(index) {
    products.splice(index, 1);
    displayData();
    localStorage.setItem('productsList', JSON.stringify(products))
}
// -------------------------------
function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = ''
    }
}
// --------------------------------
searchInput.onkeyup = function () {
    var cartona = '';
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) {
            cartona += `<tr>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].desc}</td>
            <td><button onclick="getProductInfo(${i})" class='btn btn-warning'>Update</button></td>
            <td><button onclick="deleteProduct(${i})" class='btn btn-danger'>Delete</button></td>
           </tr>`
        }

    }
    document.getElementById('tableBody').innerHTML = cartona
}
// --------------------------------
function getProductInfo(index) {
    currentIndex=index;
    var currentProduct = products[index];
    productNameInput.value = currentProduct.name;
    productPriceInput.value = currentProduct.price;
    productCategoryInput.value = currentProduct.category;
    productDescInput.value = currentProduct.desc;
    addBtn.innerHTML = 'Update product';
}
// --------------------------------
function updateProduct(){
    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
    }
    products[currentIndex]=product;
    localStorage.setItem('productsList', JSON.stringify(products))
    addBtn.innerHTML = 'Add product';
    addBtn.removeAttribute('disabled');
    clearBtn.removeAttribute('disabled');
}
//---------------------------------------
// Validation
productNameInput.onkeyup = function(){
    var nameRejex = /^[A-Z][a-z]{2,8}$/;
    if(nameRejex.test(productNameInput.value)) // Valid
    {
        addBtn.removeAttribute('disabled');
        productNameInput.classList.add('is-valid');
        productNameInput.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
    } else // Not Valid
    {
        addBtn.disabled = 'true';
        productNameInput.classList.add('is-invalid');
        productNameInput.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');
    }
}
// --------------------------------------
// function validateProduct(){
//     var pnameRegex = /^[A-Z][a-z]{3,10}$/;
//     var pname=productName.value;
//     if(pnameRegex.test(pname) == true){
//        return true;
//     }else{
//       return false;
//     }
//   }
//---------------------------------------
productPriceInput.onkeyup = function(){
    var numberRejex = /^[0-9]{2,8}$/;
    if(numberRejex.test(productPriceInput.value)) // Valid
    {
        addBtn.removeAttribute('disabled');
        productPriceInput.classList.add('is-valid');
        productPriceInput.classList.remove('is-invalid');
        numberAlert.classList.add('d-none');
    } else // Not Valid
    {
        addBtn.disabled = 'true';
        productPriceInput.classList.add('is-invalid');
        productPriceInput.classList.remove('is-valid');
        numberAlert.classList.remove('d-none');
    }
}
//---------------------------------------
productCategoryInput.onkeyup = function(){
    var categoryRejex = /^[a-z]{2,10}$/;
    if(categoryRejex.test(productCategoryInput.value)) // Valid
    {
        addBtn.removeAttribute('disabled');
        productCategoryInput.classList.add('is-valid');
        productCategoryInput.classList.remove('is-invalid');
        categoryAlert.classList.add('d-none');
    } else // Not Valid
    {
        addBtn.disabled = 'true';
        productCategoryInput.classList.add('is-invalid');
        productCategoryInput.classList.remove('is-valid');
        categoryAlert.classList.remove('d-none');
    }
}
  
