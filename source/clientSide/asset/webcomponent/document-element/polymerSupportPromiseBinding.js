    /** 
     * Override Polymer update binding values with a modified proxy to support promise values.
     */
    export default () => window.Polymer.Element._addTemplatePropertyEffect = new Proxy(Polymer.Element._addTemplatePropertyEffect, {
        apply: function(target, that, args) {
            let effect = args[2]
            effect.fn = new Proxy(effect.fn, { // runBindingEffect function
                apply: function(target, that, args) {
                    function computeBindingValue(node, value, binding, part) {
                        if (binding.isCompound) {
                          let storage = node.__dataCompoundStorage[binding.target];
                          storage[part.compoundIndex] = value;
                          value = storage.join('');
                        }
                        if (binding.kind !== 'attribute') {
                          // Some browsers serialize `undefined` to `"undefined"`
                          if (binding.target === 'textContent' ||
                              (binding.target === 'value' &&
                                (node.localName === 'input' || node.localName === 'textarea'))) {
                            value = value == undefined ? '' : value;
                          }
                        }
                        return value;
                      }                    
                    function applyBindingValue(inst, node, binding, part, value) {
                        value = computeBindingValue(node, value, binding, part);
                        if (Polymer.sanitizeDOMValue) {
                          value = Polymer.sanitizeDOMValue(value, binding.target, binding.kind, node);
                        }
                        if (binding.kind == 'attribute') {
                          // Attribute binding
                          inst._valueToNodeAttribute(/** @type {Element} */(node), value, binding.target);
                        } else {
                          // Property binding
                          let prop = binding.target;
                          if (node.__dataHasAccessor && node.__dataHasAccessor[prop]) {
                            if (!node['__readOnly'] || !node['__readOnly'][prop]) {
                              if (node._setPendingProperty(prop, value)) {
                                inst._enqueueClient(node);
                              }
                            }
                          } else  {
                            inst._setUnmanagedPropertyToNode(node, prop, value);
                          }
                        }
                      }
                    
                    function runBindingEffect(inst, path, props, oldProps, info, hasPaths, nodeList) {
                        let node = nodeList[info.index];
                        let binding = info.binding;
                        let part = info.part;
                        // Subpath notification: transform path and set to client
                        // e.g.: foo="{{obj.sub}}", path: 'obj.sub.prop', set 'foo.prop'=obj.sub.prop
                        if (hasPaths && part.source && (path.length > part.source.length) &&
                            (binding.kind == 'property') && !binding.isCompound &&
                            node.__dataHasAccessor && node.__dataHasAccessor[binding.target]) {
                          let value = props[path];
                          path = Polymer.Path.translate(part.source, binding.target, path);
                          if (node._setPendingPropertyOrPath(path, value, false, true)) {
                            inst._enqueueClient(node);
                          }
                        } else {
                          let value = info.evaluator._evaluateBinding(inst, part, path, props, oldProps, hasPaths);

                          /** Changes made HERE */
                          if(Promise.resolve(value) == value) {
                            value.then(result => {
                                // Propagate value to child
                                applyBindingValue(inst, node, binding, part, result);        
                            })
                          } else {
                            // Propagate value to child
                            applyBindingValue(inst, node, binding, part, value);        
                          }
                          /** END */
                        }
                      }
                    runBindingEffect.apply(that, args)
                    // target.apply(that, args)
                }
            })
            target.apply(that, args)
        }
    })
