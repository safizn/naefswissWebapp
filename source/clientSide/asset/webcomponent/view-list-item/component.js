class Element extends Polymer.Element {
    static get is() { return 'view-list-item'; }
    static get template() { return Polymer.html`${css}${html}` }
    static get properties() {
    return {
        app: Object,
    }
    }
}
customElements.define(Element.is, Element);
