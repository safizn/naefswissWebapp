import '@polymer/polymer/polymer-legacy.js';
import { IronButtonState } from '@polymer/iron-behaviors/iron-button-state.js';
import { IronControlState } from '@polymer/iron-behaviors/iron-control-state.js';

export const PaperItemBehaviorImpl = {
  hostAttributes: {
    role: 'option',
    tabindex: '0'
  }
};

export const PaperItemBehavior = [
  IronButtonState,
  IronControlState,
  PaperItemBehaviorImpl
];
