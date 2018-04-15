class Element extends Polymer.Element {
  static get is() { return 'view-state404'; }
  static get template() { return html`${css}${html}` }
  static get properties() {
    return {
      baseUrl: {
        type: String,
        reflectToAttribute: true,
        value: `${App.config.PROTOCOL}${App.config.HOST}`
      },
    }
  }
}
customElements.define(Element.is, Element);
