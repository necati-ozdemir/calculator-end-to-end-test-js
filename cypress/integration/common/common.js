import {Before} from "cypress-cucumber-preprocessor/steps";

Before((scenario) => {
    cy.visit("http://localhost:3000/");
});



// let counter = 0;
//
// let environment = {};

// cy.visit("http://localhost:63343/calculator-end-to-end-test-js/index.html?_ijt=1k7vvk1q7f1uobg5jhjce3svcu");

// cy.task('createComposeContainer')
//     .then((compose) => {
//         console.log(counter)
//         environment = compose;

// console.log("common before");
// cy.visit("http://localhost:3000/");
// })
// process.env.COUNT = (process.env.COUNT == null) ? 0 : process.env.COUNT + 1;
// console.log(calculatorConfigResolver)
// if(process.env.COUNT === 0){
//     console.log(process.env.COUNT)
//     counter++;
//     cy.task('createComposeContainer')
//         .then((compose) => {
//             console.log(counter)
//             environment = compose;
//             process.env.myEnv = compose;
//             cy.visit("http://10.150.21.212:8073");
//         })
// }
// else if (process.env.COUNT === 1) {
//     cy.task('stopComposeContainer', {environment: process.env.myEnv})
//         .then((compose) => {
//             console.log("deneme")
//         })
//     console.log(process.env.COUNT)
//     counter++;
//     cy.task('createComposeContainer')
//         .then((compose) => {
//             console.log(counter)
//             environment = compose;
//             cy.visit("http://10.150.21.212:8073");
//         })
// } else {
//     cy.visit("http://10.150.21.212:8073");
// }

// cy.task('createNetwork')
//     .then((network) => {
//         cy.task('createAdditionContainer', {network: network})
//             .then((additionProps) => {
//                 console.log(additionProps)
//                 cy.task('createSubtractionContainer', {network: network})
//                     .then((subtractionProps) => {
//
//                         cy.task('createCalculatorContainer', {
//                             network: network,
//                             additionProps: additionProps,
//                             subtractionProps: subtractionProps
//                         })
//                             .then((calculatorProps) => {
//
//                                 cy.task('createCalculatorUIContainer', {
//                                     network: network,
//                                     calculatorProps: calculatorProps
//                                 })
//                                     .then((calculatorUIProps) => {
//
//                                         cy.visit(calculatorUIProps.url);
//                                     })
//                             })
//                     });
//             });
//     })