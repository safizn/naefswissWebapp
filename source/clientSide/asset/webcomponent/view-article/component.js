class Element extends Polymer.Element {
    static get is() { return 'view-article'; }
    static get template() { return html`${css}${html}` }
    static get properties() {
    return {}
    }
}
customElements.define(Element.is, Element);
