async function initCart(){
    await loadComponents();
    let iconCart = document.querySelector('.icon-cart');
    let body = document.querySelector('body');
    let closeBtn = document.querySelector('.close');

    iconCart.addEventListener('click', () => {
        body.classList.toggle('show-cart');
    });

    closeBtn.addEventListener('click', () => {
        body.classList.toggle('show-cart');
    });
    
    document.querySelector('.cart-list').addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
            let product_id = positionClick.parentElement.parentElement.dataset.id;
            let type = 'minus';
            if(positionClick.classList.contains('plus')) {
                type = 'plus';
            }
            changeQuantity(product_id, type);
        } 
    });

    const changeQuantity = (product_id, type) => {
        let positionItemInCart= carts.findIndex((value) => value.product_id == product_id);
        if(positionItemInCart >= 0){
            switch (type) {
                case 'plus':
                    carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                    break;
                
                default:
                    let valueChange = carts[positionItemInCart].quantity - 1;
                    if(valueChange > 0){
                        carts[positionItemInCart].quantity = valueChange;
                    }
                    else{
                        carts.splice(positionItemInCart, 1);
                    }
                    break;
            }
        }
        addCartToMemory();
        addCartToHTML();
    }

    if(localStorage.getItem('cart')) {
        carts = JSON.parse(localStorage.getItem('cart'));
        //callar json filen 2 gånger, men funkar, sååå dont fix what aint broken
        fetch('json/products.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            addCartToHTML();
        })
    }
    
    if(listProductHTML) {
        listProductHTML.addEventListener('click', (event) => {
            let positionClick = event.target;
            if(positionClick.classList.contains('addCart')) {
                let product_id = positionClick.parentElement.dataset.id;
                addToCart(product_id);
            }
        });
        
        initApp();
    }   
}

initCart();

let listProductHTML = document.querySelector('.list-products');
let listProducts = [];
let carts = [];



const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="pcb product">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">
                    Add To Cart
                </button>
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }
    else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        })
    }
    else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts))
}

const addCartToHTML = () => {
    let listCartsHTML = document.querySelector('.cart-list');
    listCartsHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length > 0){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
            <div class="image">
                <img src="${info.image}" alt="">
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="total-price">
                $${Number.parseFloat(info.price * cart.quantity).toFixed(2)}
            </div>
            <div class="quantity">
                <span class="minus"><</span>
                <span>${cart.quantity}</span>
                <span class="plus">></span>
            </div>
            `;
        listCartsHTML.appendChild(newCart);
        })
    }
    document.querySelector('.icon-cart span').innerText = totalQuantity;
}


const initApp = () => {
    //tar data från json
    fetch('json/products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();

        //tar cart från minne
        if(localStorage.getItem('cart')) {
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
