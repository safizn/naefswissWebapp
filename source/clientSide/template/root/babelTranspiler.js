// /* Babel Transpiler */
// self; // javascript keyword - referes to the window.self 
// const App = self.App

// // Load babel
// var script = document.createElement('script');
// script.async = false;
// script.src = '/@javascript/@package/@babel/standalone/babel.min.js';
// document.head.appendChild(script);        


// ;(async () => {

//     function lolizer() {
//         return {
//             visitor: {
//                 Identifier(path) {
//                     path.node.name = 'LOL';
//                 }
//             }
//         }
//     }

//     Babel.registerPlugin('lolizer', lolizer)

//     Babel.disableScriptTags()
//     window.addEventListener('DOMContentLoaded', () => {
//         // scripts = document.getElementsByTagName('script');
//         // let scripts = document.querySelectorAll('script[class="transform"]')
//         // scripts.forEach(script => {
//         //   script.remove()
//         // })
        
//         Babel.transformScriptTags([])
//     }, false)


// })() // async