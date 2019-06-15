import { ProductCard } from './product/card.js';
import { ProductList } from './product/list.js';

const appElement = document.getElementById('app');

ProductCard.register();
ProductList.register();

const productList = ProductList.create();
appElement.appendChild(productList);

(async function () {
    let response = await fetch('products.json');
    productList.products = await response.json();

    response = await fetch('products.json');
    productList.products = await response.json();
})();
