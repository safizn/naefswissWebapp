import './style.js';
import './color.js';
import './typography.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="lumo-badge">
  <template>
    <style>
      [theme~="badge"] {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 0.4em calc(0.5em + var(--lumo-border-radius) / 4);
        color: var(--lumo-primary-text-color);
        background-color: var(--lumo-primary-color-10pct);
        border-radius: var(--lumo-border-radius);
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size-s);
        line-height: 1;
        font-weight: 500;
        text-transform: initial;
        letter-spacing: initial;
        min-width: calc(var(--lumo-line-height-xs) * 1em + 0.45em);
      }

      /* Ensure proper vertical alignment */
      [theme~="badge"]::before {
        display: inline-block;
        content: "\\2003";
        width: 0;
      }

      [theme~="badge"][theme~="small"] {
        font-size: var(--lumo-font-size-xxs);
        line-height: 1;
      }

      /* Colors */

      [theme~="badge"][theme~="success"] {
        color: var(--lumo-success-text-color);
        background-color: var(--lumo-success-color-10pct);
      }

      [theme~="badge"][theme~="error"] {
        color: var(--lumo-error-text-color);
        background-color: var(--lumo-error-color-10pct);
      }

      [theme~="badge"][theme~="contrast"] {
        color: var(--lumo-contrast-80pct);
        background-color: var(--lumo-contrast-5pct);
      }

      /* Primary */

      [theme~="badge"][theme~="primary"] {
        color: var(--lumo-primary-contrast-color);
        background-color: var(--lumo-primary-color);
      }

      [theme~="badge"][theme~="success"][theme~="primary"] {
        color: var(--lumo-success-contrast-color);
        background-color: var(--lumo-success-color);
      }

      [theme~="badge"][theme~="error"][theme~="primary"] {
        color: var(--lumo-error-contrast-color);
        background-color: var(--lumo-error-color);
      }

      [theme~="badge"][theme~="contrast"][theme~="primary"] {
        color: var(--lumo-base-color);
        background-color: var(--lumo-contrast);
      }

      /* Links */

      [theme~="badge"][href]:hover {
        text-decoration: none;
      }

      /* Icon */

      [theme~="badge"] iron-icon {
        margin: -0.25em 0;
        --iron-icon-width: 1.5em;
        --iron-icon-height: 1.5em;
      }

      [theme~="badge"] iron-icon:first-child {
        margin-left: -0.375em;
      }

      [theme~="badge"] iron-icon:last-child {
        margin-right: -0.375em;
      }

      [theme~="badge"][icon] {
        min-width: 0;
        padding: 0;
        font-size: 1rem;
        --iron-icon-width: var(--lumo-icon-size-m);
        --iron-icon-height: var(--lumo-icon-size-m);
      }

      [theme~="badge"][icon][theme~="small"] {
        --iron-icon-width: var(--lumo-icon-size-s);
        --iron-icon-height: var(--lumo-icon-size-s);
      }

      /* Empty */

      [theme~="badge"]:not([icon]):empty {
        min-width: 0;
        width: 1em;
        height: 1em;
        padding: 0;
        border-radius: 50%;
        background-color: var(--lumo-primary-color);
      }

      [theme~="badge"][theme~="small"]:not([icon]):empty {
        width: 0.75em;
        height: 0.75em;
      }

      [theme~="badge"][theme~="contrast"]:not([icon]):empty {
        background-color: var(--lumo-contrast);
      }

      [theme~="badge"][theme~="success"]:not([icon]):empty {
        background-color: var(--lumo-success-color);
      }

      [theme~="badge"][theme~="error"]:not([icon]):empty {
        background-color: var(--lumo-error-color);
      }

      /* Pill */

      [theme~="badge"][theme~="pill"] {
        --lumo-border-radius: 1em;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer);
