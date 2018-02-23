const App = window.App || {}; 
class Element extends App.mixin(Polymer.Element) {
  static get is() { return 'view-underconstruction'; }
  static get template() { return Polymer.html`${css}${html}` }
  static get properties() {
    return {
        // app: Object,
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if(this.app.instance.distribution == "es5") this.$.title.style.display = "none"
  }
  

}
customElements.define(Element.is, Element);
