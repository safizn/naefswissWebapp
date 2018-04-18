import { TextFieldElement } from '../../../@vaadin/vaadin-text-field/src/vaadin-text-field.js';
let memoizedTemplate;
/**
  * The text-field element.
  *
  * ### Styling
  *
  * See [`<vaadin-text-field>` documentation](https://github.com/vaadin/vaadin-text-field/blob/master/src/vaadin-text-field.html)
  * for `<vaadin-dropdown-menu-text-field>` parts and available slots (prefix, suffix etc.)
  *
  * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
  *
  * @memberof Vaadin
  * @extends Vaadin.TextFieldElement
  */
class DropdownMenuTextFieldElement extends TextFieldElement {
  static get is() {
    return 'vaadin-dropdown-menu-text-field';
  }

  static get template() {
    if (!memoizedTemplate) {
      // Clone the superclass template
      memoizedTemplate = super.template.cloneNode(true);

      // Create a slot for the value element
      const slot = document.createElement('slot');
      slot.setAttribute('name', 'value');

      // Insert the slot before the text-field
      const input = memoizedTemplate.content.querySelector('input');

      input.parentElement.replaceChild(slot, input);
      slot.appendChild(input);
    }
    return memoizedTemplate;
  }

  get focusElement() {
    return this.shadowRoot.querySelector('[part=input-field]');
  }
}

customElements.define(DropdownMenuTextFieldElement.is, DropdownMenuTextFieldElement);