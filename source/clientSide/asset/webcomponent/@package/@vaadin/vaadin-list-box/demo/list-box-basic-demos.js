import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
class ListBoxBasicDemos extends DemoReadyEventEmitter(ListBoxDemo(PolymerElement)) {
  static get template() {
    return html`
    <style include="vaadin-component-demo-shared-styles">
      :host {
        display: block;
      }
    </style>

    <h3>Basic Usage</h3>
    <vaadin-demo-snippet id="list-box-basic-demos-basic">
      <template preserve-content="">
        <vaadin-list-box>
          <vaadin-item>Item one</vaadin-item>
          <vaadin-item>Item two</vaadin-item>
          <vaadin-item>Item three</vaadin-item>
        </vaadin-list-box>
      </template>
    </vaadin-demo-snippet>

    <h3>Selected</h3>
    <vaadin-demo-snippet id="list-box-basic-demos-selected">
      <template preserve-content="">
        <vaadin-list-box selected="1">
          <vaadin-item>Item one</vaadin-item>
          <vaadin-item>Item two</vaadin-item>
          <vaadin-item>Item three</vaadin-item>
        </vaadin-list-box>
      </template>
    </vaadin-demo-snippet>

    <h3>Disabled</h3>
    <vaadin-demo-snippet id="list-box-basic-demos-disabled">
      <template preserve-content="">
        <vaadin-list-box>
          <vaadin-item>Item one</vaadin-item>
          <vaadin-item disabled="">Item two</vaadin-item>
          <vaadin-item>Item three</vaadin-item>
        </vaadin-list-box>
      </template>
    </vaadin-demo-snippet>

    <h3>Arbitrary Content: Header and Separator</h3>
    <vaadin-demo-snippet id="list-box-basic-demos-arbitrary">
      <template preserve-content="">
        <vaadin-list-box>
          <b>Select an Item</b>
          <vaadin-item>Item one</vaadin-item>
          <vaadin-item>Item two</vaadin-item>
          <hr>
          <vaadin-item>Item three</vaadin-item>
          <vaadin-item>Item four</vaadin-item>
        </vaadin-list-box>
      </template>
    </vaadin-demo-snippet>
`;
  }

  static get is() {
    return 'list-box-basic-demos';
  }
}
customElements.define(ListBoxBasicDemos.is, ListBoxBasicDemos);
