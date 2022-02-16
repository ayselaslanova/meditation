const bodybasket = document.querySelector('body')
// bodybasket.classList.add('loading-content');
sessionStorage.setItem('num', '9')
Storage.prototype.getArr = function(key) {
  dataCart = JSON.parse(this.getItem(key));
  if(dataCart != null){
    loadProducts(removeDuplicates(dataCart));
  } else {
    boxProducts.classList.add('empty');
  }
  return dataCart
}

Storage.prototype.getNewArr = function(key) {
  arr = JSON.parse(this.getItem(key));
  return arr
}

Storage.prototype.setArr = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}

//Функция замены объекта в массиве сопуствуюхих товаров
function pushObj ( id, obj, arr, key ) {
  if(arr.find(n => n.name == id)){
    arr = arr.filter(n => n.name !== id);
    arr.push(obj);
  }else{
    arr.push(obj);
  }
  if(key != undefined){
    localStorage.setArr(key, arr);
  }
  return arr;
}

// сумма объкта
function sumObj( obj ) {
  var sum = 0;
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      sum += parseFloat( obj[el] );
    }
  }
  return sum;
}

var dataCart = [];//массив с товарами
var dataNew = [];//массив с товарами копия

let relatedGoods = localStorage.getNewArr('allRelatedGoods');
let goodsPriceAll = {};


let totalPrictProducts = {};

const priceBox = document.querySelector('.info_price');//Блок с общей стоимостью
const boxProducts = document.querySelector('.box_products')//Блок с товарами

const headerQuantity = document.querySelector('.cart__quantity')





//Отображаю товары в DOM дереве
localStorage.getArr('products');




function objInStr (obj) {
  var str = '';
    for (var p in obj) {
      if (obj.hasOwnProperty(p) && obj[p] != '' && p != 'name') {
        str += obj[p] + '' + ' ';
      }
    }
    return str;
}
function loadProducts(data) {
  if(data.length == 0){
    boxProducts.classList.add('empty');
  } else {
    data.forEach(item => {
      boxProducts.classList.remove('empty');
      const productId = item.name;
      const productImage = item.img;
      const productTitle = item.title;
      const productPrice = item.price;
      const productSize = item.size.value;
      const productSizePrice = item.size.price;
      const productQuantity = item.quantity;
      const productVendor = item.vendorСode;
      const productVendorText = objInStr(productVendor);


      const productHydro = (item.hydro) ? ((item.hydro.class == 'hydro') ? true : false) : false;   
      const productSistem = (item.hydro) ? ((item.hydro.class == 'sistem') ? true : false) : false;

      let productTemplate = `
      <div class="product-item" id="${productId}">
         <button data-id="${productId}" class="deleted">Удалить</button>
         <div class="products_up">
             <div class="picture_up">
                 <img src="${productImage}" alt="">
             </div>
             <hr>
             <div class="product_box-right">
                 <div class="title_product">${productTitle}</div>

                 <div class="box_compl">
                     <div class="price_product">${productPrice}</div>
                     <div class="number_product">
                        <button data-id="${productId}" class=" btnPlus"></button>
                        <span class="quantity-value">${productQuantity}</span>
                        <button data-id="${productId}" class="btnMinus"></button>
                      </div>
                 </div>
                  <div class="product__info">
                    <span>Артикул:</span>
                    <span class="article" >${productVendor}</span>
                    <span class="article-related"></span>
                </div>
                <div class='size'>
                  ${productSize}
                </div>
                 <div class="give_box">
                     <img src="img/подарок.png" alt="">
                     <a class="modal-open modal-open__present" data-id=${productId} data-modal="presentModal" href=""><button id='submit'>Выбрать подарок</button></a>
                 </div>
             </div>
         </div>
        <div class="modal-links">
          <a href="" data-modal="addProduct" class="add_product modal-open">
               Сопутствующие товары
               <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <line x1="0.5" y1="-0.5" x2="8.41964" y2="-0.5" transform="matrix(-0.77986 0.625955 0.625955 0.77986 13.7783 1)" stroke="#8E8E8E" stroke-linecap="round"/>
                   <line x1="0.702907" y1="0.923047" x2="6.87912" y2="5.88038" stroke="#8E8E8E" stroke-linecap="round"/>
               </svg>
           </a>

          ${(productHydro) ?
            (`<a href="" data-modal="hydroModal" class="hydro_product modal-open">
              Настройки гидрованы
               <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <line x1="0.5" y1="-0.5" x2="8.41964" y2="-0.5" transform="matrix(-0.77986 0.625955 0.625955 0.77986 13.7783 1)" stroke="#8E8E8E" stroke-linecap="round"/>
                   <line x1="0.702907" y1="0.923047" x2="6.87912" y2="5.88038" stroke="#8E8E8E" stroke-linecap="round"/>
               </svg>
           </a>`) :
          (productSistem) ?
            (`<a href="" data-modal="sistemModal" class="sistem_product modal-open">
              ${item.hydro.title}
               <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <line x1="0.5" y1="-0.5" x2="8.41964" y2="-0.5" transform="matrix(-0.77986 0.625955 0.625955 0.77986 13.7783 1)" stroke="#8E8E8E" stroke-linecap="round"/>
                   <line x1="0.702907" y1="0.923047" x2="6.87912" y2="5.88038" stroke="#8E8E8E" stroke-linecap="round"/>
               </svg>
           </a>`)

          : ''}
        </div>


      </div>
      `
      boxProducts.insertAdjacentHTML('beforeend', productTemplate);
      dataNew.push(item);
    });
  }
    bodybasket.classList.remove('loading-content');

}



//Функция удаления товара
function deleteProduct(id) {
   const index = dataCart.findIndex(obj => obj.name === id);
   const indexRelated = relatedGoods.findIndex(obj => obj.name === id);
   if (index !== -1) {
     dataCart.splice(index, 1);
     localStorage.setArr('products', dataCart);
   }
  if (indexRelated !== -1) {
     relatedGoods.splice(indexRelated, 1);
     localStorage.setArr('allRelatedGoods', relatedGoods);
   }

 }




function format(a){
  var point = "";
  //Пока удаляю, но сохраняю целую часть...
  var x = String(a).replace(/(\.|,)\d+/, function(m){ point = m; return ""; });

  x = x.split("").reverse().join("")
       .replace(/(\d{3})/g,"$1 ")
       .split("").reverse().join("");
  //Разбил в массив, перевернул, расставил пробелы, перевернул обратно.
  return x + point;
}

function addHTML (el, text) {
  return el.innerHTML = text;
}



//функция удаления дубликатов в мвссиве
function removeDuplicates(arr) {

    const result = [];
    const duplicatesIndices = [];

    // Перебираем каждый элемент в исходном массиве
    arr.forEach((current, index) => {

        if (duplicatesIndices.includes(index)) return;

        result.push(current);

        // Сравниваем каждый элемент в массиве после текущего
        for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {

            const comparison = arr[comparisonIndex];
            const currentKeys = Object.keys(current);
            const comparisonKeys = Object.keys(comparison);

            // Проверяем длину массивов
            if (currentKeys.length !== comparisonKeys.length) continue;

            // Проверяем значение ключей
            const currentKeysString = currentKeys.sort().join("").toLowerCase();
            const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
            if (currentKeysString !== comparisonKeysString) continue;

            // Проверяем индексы ключей
            let valuesEqual = true;
            for (let i = 0; i < currentKeys.length; i++) {
                const key = currentKeys[i];
                if ( current[key] !== comparison[key] ) {
                    valuesEqual = false;
                    break;
                }
            }
            if (valuesEqual) duplicatesIndices.push(comparisonIndex);

        } // Конец цикла
    });
    return result;
}

const deliveryInputs = document.querySelectorAll('input[name="delivery"]');

deliveryInputs.forEach(input => {
  const inputPrice = input.dataset.price;
  if (input.checked) {
    if (input.id == "delivery") {
      addHTML(document.querySelector('.box_price-delivery_price span'), 'В черте КАДа - 1400рублей, за КАДом +30руб за километр');
    }
    else {
      addHTML(document.querySelector('.box_price-delivery_price span'), inputPrice);
    }
    //    addHTML(document.querySelector('.price_delivery'), inputPrice + ' ' + '₽');
  }
  input.addEventListener('input', function () {
    if (input.id == "delivery") {
      addHTML(document.querySelector('.box_price-delivery_price span'), 'В черте КАДа - 1400рублей, за КАДом +30руб за километр');
    }
    else {
      addHTML(document.querySelector('.box_price-delivery_price span'), inputPrice);
    }
  })
})



//Модальное окно сопуствующих товаров
const modalRelated = document.querySelector('.related-modal');
const modalHydro = document.querySelector('.hydro-modal');
const modalSistem = document.querySelector('.sistem-modal');
if(modalRelated || modalHydro || modalSistem){
  const products = document.querySelectorAll('.product-item');
  const bodyModal = document.querySelectorAll('.modal__body');

  products.forEach(product => {
    const btnModalRelated = product.querySelector('.add_product');
    const btnModalHydro = product.querySelector('.hydro_product');
    const btnModalSistem = product.querySelector('.sistem_product')
    const productTitle = product.querySelector('.title_product');
    const objGoods = relatedGoods.find(elem => elem.name == product.id);
    const objProduct = dataCart.find(obj => obj.name == product.id);


    //Манипуляция с количкстом товара
    const boxQuantity = product.querySelector('.number_product');
    const boxQuantityValue = boxQuantity.querySelector('.quantity-value');
    boxQuantity.addEventListener('click', function(e) {
      let targetElem = e.target;
      if(targetElem.classList.contains('btnPlus')){
        if(objProduct.quantity != 10){
          objProduct.quantity = objProduct.quantity + 1;
          boxQuantityValue.innerHTML = objProduct.quantity;
          // manipulationPrice(product.id, product);
          finishPrice(objGoods.goods, product.id)
          totalPrice();
        }
      }
      if(targetElem.classList.contains('btnMinus')){
        if(objProduct.quantity != 1){
          objProduct.quantity =  objProduct.quantity - 1;
          boxQuantityValue.innerHTML = objProduct.quantity;
          // manipulationPrice(product.id, product);
          finishPrice(objGoods.goods, product.id)
          totalPrice();
        }
      }

    })


    //удаление товара
    const deleteBtn = product.querySelector('.deleted');

    deleteBtn.addEventListener('click', function() {
      deleteProduct(product.id);
      product.remove();
      totalPrictProducts[product.id] = 0;
      totalPrice();
      headerQuantity.innerHTML = dataCart.length;
      if(dataCart.length == 0){
        boxProducts.classList.add('empty')
      }
    })

    //При открытии модального окна
    btnModalRelated.addEventListener('click', function(){
      createFormRealeted(product.id, 'create');
      modalAside(document.querySelector('.related-modal'), objGoods)
      // clickInput(product.id, product, objGoods.goods);
      clickInput(modalRelated, product.id)
    })
    if(btnModalHydro){
      btnModalHydro.addEventListener('click', function(e) {
          e.preventDefault()
        createFormHydro(product.id, 'create')
      })
    }
    if(btnModalSistem){
      btnModalSistem.addEventListener('click', function(e) {
          e.preventDefault()
        createFormSistem(product.id, 'create')
      })
    }

    // manipulationPrice(product.id, product);
    finishPrice(objGoods.goods, product.id)




    //  при закрытии модального окна
    bodyModal.forEach(body => {
      const modalClose = body.querySelector('.modal__close');
      modalClose.addEventListener('click', function(){  
        if(modalClose.classList.contains('related-modal__close')){
          setTimeout(createFormRealeted, 500, product.id, 'delete')
        }else if(modalClose.classList.contains('hydro-modal__close')){
          setTimeout(createFormHydro, 500, product.id, 'delete')
        }
      })
    })


    modalPresentsOpen(product);
  })
  totalPrice();

}



//отображаю форму сопутсвующих товаров
function createFormRealeted (id, action) {
  const box = modalRelated.querySelector('.modal__content');
    const arr = relatedGoods;
    if(arr != null){
      const obj = arr.filter(n => n.name == id);
      const objGoods = obj[0];
      const goods = objGoods.goods;
      const arrContent = []
      for(key in goods){
        let template = ``;
        const inf = goods[key];
          if(inf.arr) {
            const currentObj = inf.arr.find(item => item.id == inf.chosen);
            template = `
              <div class="related__card related-card ${key}">
                ${inf.default ? `<button data-id="${id}"  data-coll="${key}" class="aside-modal__open" ></button>` : '' }
                ${!inf.default ?
                  `<div class="check-choice">
                      <input name='${key}' class="def" data-coll="${key}"  type="checkbox" data-id="${id}" id='${id + inf.title}' ${inf.checked ? 'checked' : ''} />
                      <label for='${id + inf.title}'>
                        <span class="related-card__check">
                          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-check fa-w-16 fa-3x"><path fill="#fff" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" class=""></path></svg>
                        </span>
                      </label>
                   </div>` : ''}
                <label>
                  <span class="related-card__img">
                    <img src="${currentObj.img}" alt="">
                  </span>
                  <span class="related-card__desc">
                    <span class="related-card__price">
                      <span class="related-card__price"><span class="related-card__price_new">${(inf.default) ? `${currentObj.price}` : `${currentObj.price}₽`}</span><span class="related-card__price_old">${currentObj.priceOld ? currentObj.priceOld + '₽' : ''}</span></span>
                    </span>
                    <span class="related-card__title">${inf.title}</span>
                  </span>
                </label>
              </div>`
          } else {
            template = `
             <div class="form-related " id="${id}">
               <div class="related__card related-card ${key} ${inf.default ? 'lock' : ''}" >
                 <input  data-vendor="${inf.vendor}" data-price="${inf.price}" name="${key}" value="yes" type="checkbox" id="${key}Id" ${inf.checked ? 'checked' : ''}>
                 <label for="${key}Id">
                   <span class="related-card__img">
                     <span class="related-card__check">
                       <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-check fa-w-16 fa-3x"><path fill="#fff" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" class=""></path></svg>
                     </span>
                     <img src="${inf.img}" alt="">
                   </span>
                   <span class="related-card__desc">
                     <span class="related-card__price">
                       <span class="related-card__price_new">${inf.price}₽</span>
                     </span>
                     <span class="related-card__title">${inf.title}</span>
                     <span class="related-card__vendor">
                        <span>Артикул:</span>
                       <span>${inf.vendor}</span>
                     </span>
                   </span>
                 </label>
               </div>
            </div>
          `
          }

        arrContent.push(template);

      }
      box.innerHTML = arrContent.join(' ')
    }

  
 

}

//отображаю форму списка гидромассажа
function createFormHydro(id, action){
  const box = modalHydro.querySelector('.modal__content');
  if(action == 'create'){
    if(arr != null){
      const objProduct = dataCart.filter(n => n.name == id)[0];
      const obj = objProduct.hydro;

      for(key in obj){
        const template = `
        ${ (key != 'price' && key != 'type' && key != 'class') ?
          (
            `<div class="hydro-item">
              <p class="hydro-item__name">${key}</p>
              ${(obj[key] != 'yes') ? `:<p class="hydro-item__value">${obj[key]}</p>` : ''}
              </div>`
          ) : ''
        }
        `
        box.insertAdjacentHTML('beforeend', template);
      }
    }
  }
  if(action == 'delete'){
    box.innerHTML = '';
  }
}


function createFormSistem(id, action){
  const box = modalSistem.querySelector('.modal__content');
  if(action == 'create'){
    if(arr != null){
      const objProduct = dataCart.filter(n => n.name == id)[0];
      const obj = objProduct.hydro;

        const template = `
        <div class="sistem">
          <div class="sistem__wrapper">
            <div class="sistem__img">
              <img src='${obj.img}'>
            </div>
            <div class="sistem__desc">
              <div>
                <h3>${obj.title}</h3>
                <div class="sistem__price">
                  <p class="value">Цена:</p>
                  <p class="new">${obj.price}₽</p>
                  <p class="old">${obj.priceOld + '₽'}</p>
                </div>
              </div>
              <p class="sistem__text">${obj.text}</p>
            </div>
          </div>
        </div>
        `
        box.innerHTML = template;
    }
  }
  if(action == 'delete'){
    box.innerHTML = '';
  }
}


////события по клику на input сопутсвующего товара

// function clickInput(id, product, goods){
//   const inputs = modalRelated.querySelectorAll('input');
//   inputs.forEach(input => {
//     input.addEventListener('click', function() {
//       console.log(goods)
//       const goodsItem = goods[this.name]; // объект доп. товаров
//       collectRelated(this, id, goodsItem); //Добовляю в объект сопутсвующтх товаров значения
//       manipulationPrice(id, product);// манипуляция с ценой на продукт
//       totalPrice(); // вывожу общую стоимость на все товары
//       addVedroCode(id, product, goods);
//     })
//   })
// }

function clickInput (block, id) {
  const currentGoods = relatedGoods.find(obj => obj.name == id);
  const inputs = block.querySelectorAll('input');
  inputs.forEach(input => {
    if( input.classList.contains('def')){
      if(input.checked) {
        const name = input.name;
        const obj = currentGoods.goods[name];

        if(input.checked){
          сostBath[name] = input.dataset.price;
          vendorСode[name] = input.dataset.vendor;
          inputsCheks[name] = 'yes';
          obj['checked'] = true;

        } else {
          сostBath[name] = 0;
          vendorСode[name] = '';
          inputsCheks[name] = 'none';
          obj['checked'] = false;
        }
        finishPrice(currentGoods.goods, id);
      }
      input.addEventListener('click', () => currentClick(input, currentGoods, id))

    }

  })
}
function currentClick(input, currentObj, id){
  const name = input.name
  const obj = currentObj.goods[name];

  //Добовляю новые значения в артикул
   if(!input.classList.contains('def')){
    if(input.checked){
      obj['checked'] = true;
      if(obj.arr){

        const subObj = obj.arr.find(item => item.id == input.id);
        obj.chosen = subObj.id;
        changeSubObj(subObj, name);
      }
      // vendorСode[input.name] = input.dataset.vendor;
      // inputsCheks[input.name] = 'yes';
    } else {
      obj['checked'] = false;
      // vendorСode[name] = '';
      // inputsCheks[name] = 'none';
    }

   }

  finishPrice(currentObj.goods, id);
}

function changeSubObj (obj, name) {
  const carts = document.querySelectorAll(`.${name}`);
  carts.forEach(cart => {
    const cartImg = cart.querySelector('img');
    const cartPrice = cart.querySelector('.related-card__price_new');
    const cartPriceOld = cart.querySelector('.related-card__price_old');

    cartImg.src = obj.img;
    cartPrice.innerHTML = obj.price;
    cartPriceOld.innerHTML = obj.priceOld ? obj.priceOld : ''
  })
}



function finishPrice (goods, id) {
  const productObj = dataCart.find(item => item.name == id);

  const product = boxProducts.querySelector(`#${id}` );

  const hydroPrice = (productObj.hydro) ? productObj.hydro.price : 0;
  const priceDiv = product.querySelector('.price_product')
  let priceObj = {}
  for(key in goods){
    const mainObj = goods[key];
    if(mainObj.checked == true) {
      if(mainObj.arr){
        const currentObj = mainObj.arr.find(item => item.id == mainObj.chosen);
        priceObj[key] = currentObj.price;
      } else{
        priceObj[key] = mainObj.price;
      }
    } else {
       priceObj[key] = 0
    }
  }
  let sum = (+productObj.price.replace(/[^0-9]/g, '') + +hydroPrice + Number(productObj.size.price) + sumObj(priceObj)) * productObj.quantity;
  console.log(sum)
  priceDiv.innerHTML = format(sum) + '₽';
  totalPrictProducts[id] = sum;
  // totalPrice['price'] = format(+price.replace(/[^0-9]/g, '') + +sum(priceObj) + +sizePriceState) +  '₽';
  // priceboxes.forEach(item => {
    // item.innerHTML = format(+price.replace(/[^0-9]/g, '') + +sum(priceObj) + +sizePriceState) +  '₽';
  // })
  // pushObj(`product${id}`, totalPrice, newPrice, 'totalPrice');
}


function manipulationPrice(id, product) {
  const productObj = dataCart.find(item => item.name == id);
  const priceDiv = product.querySelector('.price_product');
  let sum = (+productObj.price.replace(/[^0-9]/g, '') + Number(productObj.size.price) + sumObj(goodsPriceAll)) * productObj.quantity;
  priceDiv.innerHTML = format(sum) + '₽';
  totalPrictProducts[id] = sum;
}



//Вывожу общую стоимость всех товаров
function totalPrice (){
  priceBox.innerHTML =  format(sumObj(totalPrictProducts)) + '₽ ';
}


//Собираю цены на активные доп.товары
function collectPriceGoods (id, obj){
  for(key in obj) {
    const goodsInf = obj[key];
    if(goodsInf.checked){
      goodsPriceAll[key] = goodsInf.price;
    } else {
      goodsPriceAll[key] = 0;
    }
  }
}


//Добовляю в объект сопутсвующтх товаров значения
function collectRelated (input, id, goods) {
  if(input.checked){
    goods['checked'] = true;
    goodsPriceAll[input.name] = input.dataset.price;

  } else {
    goods['checked'] = false;
    goodsPriceAll[input.name] = 0;
  }
}





function addVedroCode(id, product, goods) {
  const vendorDiv = product.querySelector('.article-related');
  let obj = {}
  for(key in goods) {
    const objInf = goods[key];

    if(objInf.checked){
      obj[key] = objInf.vendor;
    } else {
      obj[key] = '';
    }
  }
  // vendorDiv.innerHTML = objInStr(obj)

}




if(document.querySelectorAll('.price_product').length > 0){
  const itemPriceDiv = document.querySelectorAll('.price_product');
  let oneTotalPrice = [];
  itemPriceDiv.forEach(item => {
    const price = item.textContent.replace(/[^0-9]/g, '');
    oneTotalPrice.push(price);
  })
  priceBox.innerHTML = format(sumObj(oneTotalPrice)) + '₽';
} else {
  priceBox.innerHTML = 0 + '₽';
}

var PageLoaded = false;
window.onload = function() {
   PageLoaded = true;
}



function modalAside (block, obj) {
  const modal = document.querySelector('.aside-modal')

  const btnsOpen = block.querySelectorAll('.aside-modal__open');
  const btnsClose = modal.querySelectorAll('.aside-modal__close');

  const inputCheck = block.querySelectorAll('.check-choice input');


  btnsOpen.forEach(btn => {
    btn.addEventListener('click', function() {
      modal.classList.add('active');
      block.style.overflow = "hidden";
      createRelatedForModal(btn.dataset.coll, btn.dataset.id, 'create')
    })
  })




  inputCheck.forEach(input => {
    input.addEventListener('click', function() {
      const goods = obj.goods[input.name];
      if(input.checked) {
        body.classList.add('lock')
        block.style.overflow = "hidden";
        modal.classList.add('active');
        createRelatedForModal(input.dataset.coll,input.dataset.id, 'create')
        goods.checked = true
        finishPrice(goods, input.dataset.id)
      } else{
        goods.checked = false
        finishPrice(goods, input.dataset.id)
      }
    })
  })

  btnsClose.forEach(btn => {
    btn.addEventListener('click', function(){
      modal.classList.remove('active');
      block.style.overflow = "auto";
      createRelatedForModal(btn.dataset.coll, btn.dataset.id, 'delete')
    })
  })
}


function createRelatedForModal (collection, id, action) {
    const currentGoods = relatedGoods.find(item => item.name == id);
    const mainObj = currentGoods.goods[collection];
    const arr = mainObj.arr;
    const block = document.querySelector('.aside-modal__content');
    const relatedArr = []
    arr.forEach((obj) => {
      tempalte = `
      <div class="related__card related-card" >
        <input class="${key}" data-vendor="${obj.vendor}" data-price="${obj.price}" name="${collection}" value="yes" type="radio" id="${obj.id}" ${mainObj.chosen == obj.id ? 'checked' : ''}>
        <label  for="${obj.id}">
          <span class="related-card__img">
            <span class="related-card__check">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-check fa-w-16 fa-3x"><path fill="#fff" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" class=""></path></svg>
            </span>
            <img src="${obj.img}" alt="">
          </span>
          <span class="related-card__desc">
            <span class="related-card__price">
              <span class="related-card__price_new">${obj.price}₽</span>
              <span class="related-card__price_old">${obj.priceOld ? obj.priceOld  + '₽': ''}</span>
            </span>
            <span class="related-card__title">${obj.title}</span>
            <span class="related-card__vendor">
              <span>Артикул:</span>
              <span>${obj.vendor}</span>
            </span>
          </span>
        </label>
      </div>
      `
      relatedArr.push(tempalte)
    })
    block.innerHTML = relatedArr.join(' ');
    clickInput(block, id)

  
}



//Функционал связанный с подарками 
let presents;
async function fetchPresents () {
  const url = '/json/presents.json'
  const response = await fetch(url);
  if(response.ok){
    presents = await response.json()
  } else {
    alert("Ошибка, перезагрузите страницу")
  }
}
fetchPresents();
const modalPresents = document.querySelector('.present-modal');
function modalPresentsOpen(product){
  const modalOpen = product.querySelector('.modal-open__present');

  modalOpen.addEventListener('click', () => {
    modalPresents.querySelector('.modal__content').innerHTML = presentTemplate(presents, product.id).join(' ');
    btnsPresentsClick()
  })

}

function presentTemplate(presents, id){
  const currentProduct = dataCart.find(obj => obj.name == id);
  
  console.log('currentProduct: ', currentProduct);
  const arr = [];
  presents.forEach((present) => {
    const tempalte = `
      <div class="present-card">
        <div class="present-card__wrapper">
          <h3>${present.name}</h3>
          <div class="present-card__center">
            <div class="present-card__img">
              <img src="${present.img}"/>
            </div>
          </div>
          <div class="present-card__btns">
            <div class="present-card__add
            ${currentProduct.present && currentProduct.present.vendor == present.vendor ? 'hide' : ''}
            ">
              <input type="radio" data-id="${id}" data-vendor="${present.vendor}" data-name="${present.name}" id="${present.vendor}" name="present" 
               checked='${currentProduct.present && currentProduct.present.vendor == present.vendor ? true : false}'/>
              <label for="${present.vendor}">Выбрать</label>            
            </div>
            <button class="present-card__delete 
             ${currentProduct.present && currentProduct.present.vendor == present.vendor ? '' : 'hide'}">Удалить</button>
          </div>
        </div>
      </div>
    `

    arr.push(tempalte)
  })
  return arr
}

function btnsPresentsClick() {
  const inputs =  modalPresents.querySelectorAll('input');
  const btnDelete = modalPresents.querySelectorAll('.present-card__delete');
  
  inputs.forEach(input => {
    input.addEventListener('click', () => {
      inputsPresentManipulation(inputs)
    })
  })
  
  btnDelete.forEach(btn => {
    const input = btn.previousElementSibling.querySelector('input');
    btn.addEventListener('click', () => {
      input.checked = false;
      const currentProduct = dataCart.find(obj => obj.name == input.dataset.id);
      currentProduct.present = false;
      inputsPresentManipulation()
    })
  })
}
function inputsPresentManipulation() {
  const inputs =  modalPresents.querySelectorAll('input');
  inputs.forEach(input => {
    const btnRemove = input.parentNode.nextElementSibling;
    if(input.checked) {
      const currentProduct = dataCart.find(obj => obj.name == input.dataset.id);
      console.log('currentProduct: ', currentProduct);
      currentProduct.present = {name: input.dataset.name, vendor: input.id};
      btnRemove.classList.remove('hide');
      input.parentNode.classList.add('hide');
    } else {
      btnRemove.classList.add('hide');
      input.parentNode.classList.remove('hide');
    }
  })
}