export class ProductPrice extends HTMLElement {

    get price() {
        return this._price;
    }

    set price(price) {
        this._price = price;
        this._updateText();
    }

    connnectedCallback() {
        this._updateText();
    }

    _updateText() {
        if (this.price) {
            const { amount, currency, exponent } = this.price;
            const currencyFormatedAmount = this._symbol(currency) + (amount / Math.pow(10, exponent)).toFixed(exponent);
            this.innerText = `${currencyFormatedAmount} per hour`;
        } else {
            this.innerText = '-';
        }
    }

    _symbol(currency) { 
        return '£';
    }
}

const elementName = 'product-price';

ProductPrice.register = () => window.customElements.define(elementName, ProductPrice);
ProductPrice.create = () => document.createElement(elementName);
