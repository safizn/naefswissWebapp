// register custom element and define 'is' getter.
export const defineCustomElement = (tagname) => (target) => { // target = an Element class
    Object.defineProperty(target, 'is', { get() { return tagname } })
    // Register custom element definition using standard platform API
    customElements.define(target.is, target)
}
