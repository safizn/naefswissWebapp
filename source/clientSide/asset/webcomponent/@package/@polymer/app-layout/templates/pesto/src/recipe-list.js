import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
Polymer({
  _template: html`
    <style>

    app-header {
      color: #fff;
      background-color: #00AA8D;
    }

    app-toolbar {
      height: 120px;
    }

    [condensed-title] {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: url('//app-layout-assets.appspot.com/assets/pesto/logo_m.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 90px;

      /* The difference in font size is used to calculate the scale of the title in the transition. */
      font-size: 16px;
    }

    [main-title] {
      position: absolute;
      top: -120px;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: url('//app-layout-assets.appspot.com/assets/pesto/logo_l.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 240px;
      -webkit-transform-origin: center top !important;
      transform-origin: center top !important;

      /* The difference in font size is used to calculate the scale of the title in the transition. */
      font-size: 32px;
    }

    .content {
      display: block;
      position: relative;
      max-width: 1000px;
      margin: 5px auto;
    }

    .card-container {
      display: inline-block;
      width: 33.33%;
      color: black;
      text-decoration: none;
    }

    paper-card {
      display: block;
      margin: 5px;

      --paper-card-header-image: {
        height: 200px;
      }
    }

    paper-card h2 {
      margin: 4px;
      font-weight: normal;
    }

    paper-card p {
      margin: 4px;
      color: #999;
    }

    paper-fab {
      position: fixed;
      right: 24px;
      bottom: 24px;

      --paper-fab-background: #EF5458;
      --paper-fab-keyboard-focus-background: #DF4448;
    }

    @media (max-width: 960px) {
      .content {
        max-width: 800px;
      }

      .card-container {
        width: 50%;
      }
    }

    @media (max-width: 719px) {
      app-toolbar {
        height: 60px;
      }

      [condensed-title] {
        background-image: url('//app-layout-assets.appspot.com/assets/pesto/logo_s.png');
        background-size: 60px;
      }

      [main-title] {
        top: -60px;
        background-image: url('//app-layout-assets.appspot.com/assets/pesto/logo_m.png');
        background-size: 90px;
      }

      .content {
        max-width: 400px;
      }

      .card-container {
        width: 100%;
      }
    }

    </style>

    <!-- main panel -->
    <app-header-layout>

      <app-header effects="resize-title" condenses="" fixed="" shadow="" slot="header">
        <app-toolbar class="top-toolbar">
          <slot name="drawer-toggle"></slot>
          <div condensed-title=""></div>
        </app-toolbar>
        <app-toolbar class="bottom-toolbar">
          <div main-title=""></div>
        </app-toolbar>
      </app-header>

      <div class="content">
        <template is="dom-repeat" items="{{recipes}}"><!-- No empty text node
        --><a href="#/detail/{{item.id}}" class="card-container">
            <paper-card image="{{item.imageUrl}}">
              <div class="card-content">
                <h2>{{item.name}}</h2>
                <p>By <span>{{item.author}}</span></p>
              </div>
            </paper-card>
          </a><!-- No empty text node
      --></template>
      </div>

    </app-header-layout>

    <paper-fab icon="app:create"></paper-fab>
`,

  is: 'recipe-list',

  properties: {
    recipes: Object
  }
});
