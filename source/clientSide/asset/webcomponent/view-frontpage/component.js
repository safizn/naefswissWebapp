class Element extends Polymer.Element {
    static get is() { return 'view-frontpage'; }
    static get template() { return Polymer.html`${css}${html}` }
    static get properties() {
    return {
        app: Object,
    }
    }

    connectedCallback() {
    super.connectedCallback();
    if(this.app.instance.distribution == "es5") this.$.title.style.display = "none"
    }
    

}
customElements.define(Element.is, Element);
