import { ProductCard } from './product/card.js';
import { ProductList } from './product/list.js';
import { ProductPrice } from './product/price.js';
import { ProductRepository } from './product/repository.js';

ProductCard.register();
ProductList.register();
ProductPrice.register();

const appElement = document.getElementById('app');

const products = new ProductRepository();
const productList = ProductList.create();

appElement.appendChild(productList);

(async function () {
    productList.products = await products.getAll();
})();
