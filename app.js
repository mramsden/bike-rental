import { ProductCard } from './product/card.js';
import { ProductList } from './product/list.js';
import { ProductRepository } from './product/repository.js';

ProductCard.register();
ProductList.register();

const appElement = document.getElementById('app');

const products = new ProductRepository();
const productList = ProductList.create();

appElement.appendChild(productList);

(async function () {
    productList.products = await products.getAll();
})();
