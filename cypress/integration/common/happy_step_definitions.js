import {Given, Then, When} from 'cypress-cucumber-preprocessor/steps';
import calculatorConfigResolver from '../../config/config.json'

Given(/^The below numbers are given$/, (table) => {
    cy.get('input[id="firstValue"]')
        .type(table.rawTable[1][0]);
    cy.get('input[id="secondValue"]')
        .type(table.rawTable[1][1]);
});

Given(/^Numbers are given (\S+) and (\S+)$/, (firstValue, secondValue) => {

    cy.get('input[id="'+ calculatorConfigResolver.firstValueElementId + '"]')
        .type(firstValue);
    cy.get('input[id="'+ calculatorConfigResolver.secondValueElementId + '"]')
        .type(secondValue);
});

When(/^Barkın wants to perform (\S+) those two numbers$/, (operation) => {
    cy.get(calculatorConfigResolver.calculationSelectElementId)
        .select(operation);

    cy.get('button[id="' + calculatorConfigResolver.calculationButtonElementId + '"]')
        .click();
});

Then(/^Barkın should see result (\S+) and (\S+) message$/, (resultValue, resultMessage) => {
    console.log(calculatorConfigResolver.resultValueElementId)
    cy.get('input[id="'+ calculatorConfigResolver.resultValueElementId + '"]')
        .should('have.value', resultValue)
    cy.get('input[id="'+ calculatorConfigResolver.resultMessageElementId + '"]')
        .should('have.value', resultMessage)
});