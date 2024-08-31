


const productDiv = document.querySelector(".products");

async function getAllData(){
    const data = await fetch("https://dummyjson.com/products");
    const dataJSON = await data.json();
    const products = dataJSON.products;
    addProducts(products);   
}

// cartBtn.addEventListener('click', () => {
//   cart.classList.toggle('show');
//   document.querySelector('.products').style.display = cart.classList.contains('show') ? 'none' : 'flex';
// });



function addProducts(products){

   for(let prod of products){
     const card = document.createElement("div");
     card.className = "product";
     productDiv.appendChild(card);
     const arrImg = new Array();
     for(let image of prod.images){
      arrImg.push(image);
     }

     const imageDiv = document.createElement("div");
     imageDiv.className = "img_con";
       
     let currentIndex = 0;

     // backwaard button
     const backwardBtn = document.createElement("button");
     backwardBtn.textContent = "<<";
     imageDiv.appendChild(backwardBtn);
     backwardBtn.addEventListener('click',()=>{
     currentIndex =  backwardFunc(img,arrImg,currentIndex)
    });

      card.appendChild(imageDiv);
      
       //adding default image
      const img = document.createElement("img");
      img.src = arrImg[0];

      img.className = "imgClass";
      imageDiv.appendChild(img);

     const h4 = document.createElement("h4");
     h4.textContent = prod.title;
     h4.className = "h4Class";
     card.appendChild(h4);
     const price = document.createElement("p");
     price.textContent =`$${prod.price}`;
     card.appendChild(price);
     
     const cartButton = document.createElement("button");
     cartButton.textContent = "Add To Cart";
     cartButton.className = "addToCartBtn";
     card.appendChild(cartButton);
     let qunatity = 0;
     cartButton.addEventListener('click',()=>{
      qunatity = addToCart(prod.id,prod.title,prod.price,qunatity);
   });

     //forward btn
     const forwardBtn = document.createElement("button");
     forwardBtn.textContent = ">>";
     imageDiv.appendChild(forwardBtn);
     forwardBtn.addEventListener('click',()=>{
       currentIndex = forwardFunc(img,arrImg,currentIndex);
    });

     
   }
 
}
getAllData();

function addImage(img,newSrc){

   img.src = newSrc;
  //  img.className = "imgClass";
  //  card.appendChild(img);
}
function forwardFunc(card,arrImg,i){
  if(i<arrImg.length-1){
    i++;
  }
  else{
    i = 0;
  }

  addImage(card,arrImg[i]);
  return i;
}
function backwardFunc(card,arrImg,i){
  if(i>0){
    i= i-1;
  }
  else{
    i = arrImg.length-1;
  }
   addImage(card,arrImg[i]);
   return i;
}
const cartDetail = document.getElementById('cart');
document.getElementById("cartBtn").addEventListener('click',()=>{
  document.getElementById('cart').classList.toggle("show");
  document.querySelector(".products").style.display = cart.classList.contains("show")?'none':'flex';
  cartDetail.innerHTML = "";
  displayCart();
})

const cartArray = new Array();

// document.getElementById("checkoutBtn").addEventListener('click',()=>calculateTotal(cartArray));



function addToCart(id1,title1,price1,qunatity1){
  const findexIndex = cartArray.findIndex(obj=> obj.id === id1);
  if(findexIndex!=-1){
    qunatity1++;
    cartArray[findexIndex].qunatity = qunatity1;
  }
  else{
    qunatity1 = 1;
    const pro = {
      id : id1,
      title:title1,
      price:price1,
      qunatity:qunatity1,
      
    };
    cartArray.push(pro);
  }
  return qunatity1;
}

function displayCart(){

  cartDetail.innerHTML = ""; 

   for(currInd of cartArray){

    const reduceItemBtn = document.createElement("button");
    reduceItemBtn.textContent = "-"
    reduceItemBtn.className = "reduceItemBtn";


    reduceItemBtn.addEventListener('click',()=>{
        if(currInd.qunatity>1){
          currInd.qunatity--;
        }
        else{
          const index = cartArray.indexOf(currInd);
          if (index > -1) {
          cartArray.splice(index, 1);
        }
      }
      displayCart();
   });

     const div = document.createElement('div');

     const span1 = document.createElement('span');

     span1.textContent = currInd.title;

     span1.className = "headingClass";

     const span2 = document.createElement('span');
     span2.className = "otherText";

     span2.textContent = `$${currInd.price}`;

     const span3 = document.createElement('span');

     span3.textContent = `Quant:${currInd.qunatity}`;
     span3.className = "otherText";

     div.appendChild(reduceItemBtn);

     div.appendChild(span1);

     div.appendChild(span2);

     div.appendChild(span3);

     div.className = "cart_item";

     cart.appendChild(div);
   }
   const checkoutBtn = document.createElement("button");
   checkoutBtn.textContent = "Checkout"
   cart.appendChild(checkoutBtn);
   checkoutBtn.setAttribute('id',"checkoutBtn");
   checkoutBtn.addEventListener('click',()=>calculateTotal(cartArray));
}

function calculateTotal(cartArray){
  let totalPrice = 0;
  for(currIndex of cartArray){
     totalPrice = totalPrice + currIndex.qunatity*currIndex.price;
  }
  if(cartArray.length>0){
  alert(`Thankyou for shopping. Your total price is $${totalPrice.toFixed(2)}`);
  }
  else{
    alert(`Oops You didn't add items in a cart !!`);
  }
  cartDetail.textContent = "";
}