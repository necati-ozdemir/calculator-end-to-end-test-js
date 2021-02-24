import {Given, Then, When} from 'cypress-cucumber-preprocessor/steps';
import calculatorConfigResolver from '../../config/config.json'

Given(/^The below numbers are given$/, (table) => {
    cy.get('#' + calculatorConfigResolver.firstValueElementId)
        .type(table.rawTable[1][0]);
    cy.get('#' + calculatorConfigResolver.secondValueElementId)
        .type(table.rawTable[1][1]);
});

Given(/^Numbers are given (\S+) and (\S+)$/, (firstValue, secondValue) => {

    cy.get('#' + calculatorConfigResolver.firstValueElementId)
        .type(firstValue);
    cy.get('#' + calculatorConfigResolver.secondValueElementId)
        .type(secondValue);
});

When(/^Barkın wants to perform (\S+) those two numbers$/, (operation) => {
    cy.get('#' + calculatorConfigResolver.calculationSelectElementId)
        .type(operation + '{enter}')

    cy.get('#' + calculatorConfigResolver.calculationButtonElementId)
        .click();
});

Then(/^Barkın should see result (\S+) and (\S+) message$/, (resultValue, resultMessage) => {
    cy.get('#' + calculatorConfigResolver.resultValueElementId)
        .should('have.value', resultValue)
    cy.get('#' + calculatorConfigResolver.resultMessageElementId)
        .should('have.value', resultMessage)
});