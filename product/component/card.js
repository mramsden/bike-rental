const style = `
:host {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}
div h1 {
    font-size: 2rem;
    margin: 0 5px;
}
div product-price {
    font-size: 1.25rem;
    margin: 0 5px;
}
div p {
    margin: 0 5px;
}
`;

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
        const styleElement = document.createElement('style');
        styleElement.innerHTML = style;

        const card = document.importNode(template.content, true);
        card.querySelector('h1').innerText = this.name;
        card.querySelector('product-price').price = this.price;
        card.querySelector('p').innerText = this.description;

        shadow.appendChild(styleElement);
        shadow.appendChild(card);
    }
}

const elementName = 'product-card';

ProductCard.register = () => window.customElements.define(elementName, ProductCard);
ProductCard.create = () => document.createElement(elementName);
