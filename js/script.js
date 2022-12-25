// cruds
// c => create 
// r => retrive - display
//  u => update
// d => delete
//  s => search
var productName = document.getElementById('productName');
var productCategory = document.getElementById('productCategory')
var productPrice = document.getElementById('productPrice')
var productDesc = document.getElementById('productDesc')
var searchValue = document.getElementById('searchValue')
var addBtn = document.getElementById('addProduct')

var currentIndex= 0;

if(localStorage.getItem('allproduct')== null){
  var productContainer=[]
}else{
  var productContainer = JSON.parse(localStorage.getItem('allproduct'))
  // console.log(productList)
  display()
}

addBtn.onclick=function(){
  if(validateProduct() == true && productName.value !='' && productCategory.value != '' && productDesc.value != '' && productPrice.value !='' ){
    if(addBtn.innerHTML == 'AddProduct'){
      createProduct()
    }else{
      updateProdct()
    }
  
    localStorage.setItem('allproduct',JSON.stringify(productContainer))
    clearForm()
    display()
  }else{
    alert('not Valid')
  }

}

// create
function createProduct(){

var product ={
  pname:productName.value,
  price : productPrice.value,
  category:productCategory.value,
  desc:productDesc.value
}
productContainer.push(product)
}

function getProductInfo(index){
  currentIndex =index;
  //  console.log(index)
  productName.value= productContainer[index].pname;
  productPrice.value=productContainer[index].price;
  productCategory.value=productContainer[index].category;
  productDesc.value=productContainer[index].desc;
  addBtn.innerHTML ='updateProduct';
  }

  function updateProdct(){
    // alert('update')
    var product ={
      pname:productName.value,
      price : productPrice.value,
      category:productCategory.value,
      desc:productDesc.value
    }
  productContainer[currentIndex] = product;
  addBtn.innerHTML ='AddProduct';
 
  }
  

// clear
function clearForm(){
  productName.value='';
  productPrice.value='';
  productCategory.value='';
  productDesc.value='';
}
// display
function display(){
  var trs='';
  for(var i =0 ; i<productContainer.length;i++){
    trs +=`<tr>
         
    <td>${i+1}</td>
    <td>${productContainer[i].pname}</td>
    <td>${productContainer[i].price}</td>
    <td>${productContainer[i].category}</td>
    <td>${productContainer[i].desc}</td>
    <td>
      <button class="btn btn-info" onclick="getProductInfo(${i})" ><i class="fa fa-solid fa-edit"></i></button>
    </td>
    <td>
      <button class="btn btn-danger" onclick="delet(${i})"><i class="fa-solid fa-trash"></i></button>
    </td>
  </tr>`
  }
  document.getElementById('tableBody').innerHTML=trs
}

// delete
function  delet(index){
console.log(index)
productContainer.splice(index,1)
console.log(productContainer)
localStorage.setItem('allproduct',JSON.stringify(productContainer))
display()
}
// event 
// keyup
// keydown
// search
function searchProdct(){
var trs='';
for(var i =0 ; i<productContainer.length;i++){
  if(productContainer[i].pname.toLowerCase().includes(searchValue.value.toLowerCase()))
  {
    trs +=`<tr>
    <td>${i+1}</td>
    <td>${productContainer[i].pname}</td>
    <td>${productContainer[i].price}</td>
    <td>${productContainer[i].category}</td>
    <td>${productContainer[i].desc}</td>
    <td>
      <button class="btn btn-info" onclick="getProductInfo(${i})"><i class="fa fa-solid fa-edit"></i></button>
    </td>
    <td>
      <button class="btn btn-danger" onclick="delet(${i})"><i class="fa-solid fa-trash"></i></button>
    </td>
  </tr>`
  }

}
document.getElementById('tableBody').innerHTML=trs
}

var pnameAlert = document.getElementById('pnameAlert')
function validateProduct(){
  var pnameRegex = /^[A-Z][a-z]{3,10}$/;
  var pname=productName.value;
  if(/^[A-Z]/.test(pname) == true){
      if(/[a-z]{3,10}$/.test(pname) == true){
        pnameAlert.classList.add('d-none')
        productName.classList.add('is-valid')
        productName.classList.remove('is-invalid')
     
          return true;
      }else{
        pnameAlert.innerHTML='productname should be between 3-10 char'
        productName.classList.add('is-invalid')
        productName.classList.remove('is-valid')
         pnameAlert.classList.remove('d-none')
         return false;
      }
  }else{
    pnameAlert.innerHTML ='please start with capital letter'
   productName.classList.add('is-invalid')
   productName.classList.remove('is-valid')
    pnameAlert.classList.remove('d-none')
    return false;
  }
}

var proName = ' nokia mobile  3pp mobile '
var x =proName.replace( /\s/ig ,'')
console.log(x)


// Update Product
// Search => hilight 

//==========================================================================================================
// Regular Expression
// ? => zero or one => {0,1}
// * => zero or more => {0,}
// + => one or more => {1,}

// /^01[0125][0-9]{8}$/;
// /^(002){0,1}01[0125][0-9]{8}$/; 
// /^(002)?01[0125][0-9]{8}$/; 
// /^(002)*01[0125][0-9]{8}$/;
// /^(002)+01[0125][0-9]{8}$/;

// /^[a-z]/ig

// var regex = /^[A-Z]/;
// // var productName = "samsung";
// var productName = "Samsung";
// console.log(regex.test(productName));

// var productName = "  Samsung";
// var productName1 = "Samsung  ";

// console.log(productName.trim()) // clear space to start 
// console.log(productName1.trimEnd()) // clear space to end

// var prooductName2 = "web and development and designer"
// console.log(prooductName2.replace(/and/g, "&"))
// console.log(prooductName2.replace(/\s/g, "&"))

// var prooductName3 = "web and development AND designer"
// console.log(prooductName3.replace(/\s/ig, "&"))











