import { ProductCard } from './product/component/card.js';
import { ProductList } from './product/component/list.js';
import { ProductPrice } from './product/component/price.js';
import { ProductRepository } from './product/repository.js';

ProductCard.register();
ProductList.register();
ProductPrice.register();

const products = new ProductRepository();
const productList = document.querySelector('product-list');

(async function () {
    productList.products = await products.getAll();
})();
