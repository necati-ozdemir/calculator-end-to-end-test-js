// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// let environment = {};
//
// before(() => {
//     console.log("commands before")
//     cy.task('createComposeContainer')
//         .then((compose) => {
//             environment = compose;
//         });
// });
//
//
// after(() => {
//     console.log(environment);
//     console.log("commands after")
//     cy.task('stopComposeContainer', {environment: environment})
//         .then((compose) => {
//             console.log("stopped")
//         })
// });