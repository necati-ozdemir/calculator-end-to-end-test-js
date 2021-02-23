import {Given} from "cypress-cucumber-preprocessor/steps";
import calculatorConfigResolver from '../../config/config.json'


Given(/^Either of any value is not given$/, () => {

    cy.get('input[id="'+ calculatorConfigResolver.firstValueElementId + '"]')
        .type("5"); // only firstValue is set
});

When(/^Necati wants to perform (\S+) operation$/, (operation) => {
    cy.get(calculatorConfigResolver.calculationSelectElementId)
        .select(operation);

    cy.get('button[id="' + calculatorConfigResolver.calculationButtonElementId + '"]')
        .click();
});

Then(/^Necati should see a warning notification$/, () => {
    cy.get('input[id="'+ calculatorConfigResolver.resultValueElementId + '"]')
        .should('have.value', '0');
    cy.get('input[id="'+ calculatorConfigResolver.resultMessageElementId + '"]')
        .should('have.value', 'FAIL');
});