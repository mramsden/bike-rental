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

    get products() {
        return this._products || [];
    }

    set products(products) {
        this._products = products;

        if (!this._shadow) { return; }
        this._refreshProducts(this._shadow);
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'closed' });
        const styleElement = document.createElement('style');
        styleElement.innerHTML = style;

        shadow.appendChild(styleElement);
        this._refreshProducts(shadow);
        this._shadow = shadow;
    }

    _refreshProducts(parent) {
        this._removeAllCards(parent);
        const cards = this.products.map(product => this._attachCard(product));
        parent.append(...cards);
    }

    _removeAllCards(parent) {
        const cards = Array.from(parent.querySelectorAll('product-card'));
        cards.forEach(card => parent.removeChild(card));
    }

    _attachCard(product) {
        const card = ProductCard.create(product);
        card.className = 'card';
        card.product = product;
        return card;
    }
};

const elementName = 'product-list';

ProductList.register = () => window.customElements.define(elementName, ProductList);
ProductList.create = () => document.createElement(elementName);
