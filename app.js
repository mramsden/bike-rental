const appElement = document.getElementById('app');

class ProductCard extends HTMLElement {

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'closed' });
        const template = document.getElementById('product-card');
        const style = document.createElement('style');
        style.innerHTML = `
        h1 { font-size: 2rem; }
        h2 { font-size: 1.25rem; }
        `;

        const content = document.importNode(template.content, true);
        content.querySelector('h1').innerText = this.name;
        content.querySelector('h2').innerText = this.price;
        content.querySelector('p').innerText = this.description;

        shadow.appendChild(style);
        shadow.appendChild(content);
    }

    get name() {
        return this._name || '';
    }

    set name(name) {
        this._name = name;
        const nameElement = this.querySelector('h1');
        if (nameElement) nameElement.innerText = this._name;
    }

    get price() {
        return this._price || '';
    }

    set price(price) {
        this._price = price;
        const priceElement = this.querySelector('h2');
        if (priceElement) priceElement.innerText = this._price;
    }

    get description() {
        return this._description || '';
    }

    set description(description) {
        this._description = description;
        const descriptionElement = this.querySelector('p');
        if (descriptionElement) descriptionElement.innerText = this._description;
    }
}

window.customElements.define('product-card', ProductCard);

class ProductCards extends HTMLElement {

    constructor() {
        super();
        this._products = [];
    }

    connectedCallback() {
        this._shadow = this.attachShadow({ mode: 'closed' });
        this._refreshProducts();
    }

    get products() {
        return this._products || [];
    }

    set products(products) {
        this._products = products;
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
        const productCard = document.createElement('product-card');
        productCard.name = product.name;
        productCard.price = product.price;
        productCard.description = product.description;
        this._shadow.appendChild(productCard);
    }
}

window.customElements.define('product-cards', ProductCards);

const productCards = document.createElement('product-cards');
appElement.appendChild(productCards);

(async function() {
    let response = await fetch('products.json');
    productCards.products = await response.json();

    response = await fetch('products.json');
    productCards.products = await response.json();
})();
