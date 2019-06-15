import { ProductCard } from './card.js';

export class ProductList extends HTMLElement {

    constructor() {
        super();
        this._products = [];
    }

    get products() {
        return this._products || [];
    }

    set products(products) {
        this._products = products;
        this._refreshProducts();
    }

    connectedCallback() {
        this._shadow = this.attachShadow({ mode: 'closed' });
        this._refreshProducts();
    }

    _refreshProducts() {
        if (!this._shadow) { return; }
        this._removeAllCards();
        this.products.forEach(product => this._attachCard(product));
    }

    _removeAllCards() {
        if (!this._shadow) { return; }
        const cards = Array.from(this._shadow.querySelectorAll('product-card'));
        cards.forEach(card => this._shadow.removeChild(card));
    }

    _attachCard(product) {
        if (!this._shadow) { return; }
        const card = ProductCard.create();
        card.name = product.name;
        card.price = product.price;
        card.description = product.description;
        this._shadow.appendChild(card);
    }
};

const elementName = 'product-list';

ProductList.register = () => window.customElements.define(elementName, ProductList);
ProductList.create = () => document.createElement(elementName);
