import { ProductCard } from './card.js';

const style = `
:host {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}

.card {
    flex-basis: 25%;
    max-width: 400px;
    box-sizing: content-box;
    margin: 10px 0;
}

@media all and (max-width: 500px) {
    :host {
        flex-direction: column;
    }

    .card {
        width: 100%;
        max-width: none;
        border-top: 1px solid #efefef;
        margin: 0;
    }
}
`;

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
        const styleElement = document.createElement('style');
        styleElement.innerHTML = style;

        this._shadow.appendChild(styleElement);
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
        card.className = 'card';
        card.name = product.name;
        card.price = product.price;
        card.description = product.description;
        this._shadow.appendChild(card);
    }
};

const elementName = 'product-list';

ProductList.register = () => window.customElements.define(elementName, ProductList);
ProductList.create = () => document.createElement(elementName);
