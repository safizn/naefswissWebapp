class Element extends Polymer.Element {
    static get is() { return 'view-about'; }
    static get template() { return Polymer.html`${css}${html}` }
    static get properties() {
    return {}
    }
}
customElements.define(Element.is, Element);
