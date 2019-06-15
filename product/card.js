export class ProductCard extends HTMLElement {
    
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
}

const elementName = 'product-card';

ProductCard.register = () => window.customElements.define(elementName, ProductCard);
ProductCard.create = () => document.createElement(elementName);
