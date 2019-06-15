const style = `
:host {
    display: flex;
    flex-direction: column;
}
h1 {
    font-size: 2rem;
    margin: 0 5px;
}
product-price {
    font-size: 1.25rem;
    margin: 0 5px;
}
p {
    margin: 0 5px;
}
`;

export class ProductCard extends HTMLElement {
    
    get name() {
        return this._name || '';
    }

    get price() {
        return this._price || '';
    }

    get description() {
        return this._description || '';
    }

    set product(product) {
        this._name = product.name;
        this._price = product.price;
        this._description = product.description;
        this._refreshContents();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'closed' });
        const styleElement = document.createElement('style');
        styleElement.innerHTML = style;

        const nameElement = document.createElement('h1');
        const priceLabelElement = document.createElement('product-price');
        const descriptionElement = document.createElement('p');

        nameElement.innerText = this.name;
        priceLabelElement.price = this.price;
        descriptionElement.innerText = this.description;

        shadow.append(styleElement, nameElement, priceLabelElement, descriptionElement);
    }

    _refreshContents() {
        const nameElement = this.querySelector('h1');
        const priceLabelElement = this.querySelector('product-price');
        const descriptionElement = this.querySelector('p');

        if (nameElement) { nameElement.innerText = this.name; }
        if (priceLabelElement) { priceLabelElement.innerText = this.price; }
        if (descriptionElement) { descriptionElement.innerText = this.description; }
    }
}

const elementName = 'product-card';

ProductCard.register = () => window.customElements.define(elementName, ProductCard);
ProductCard.create = () => document.createElement(elementName);
