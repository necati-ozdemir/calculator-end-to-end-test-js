import {Given, Then, When} from 'cypress-cucumber-preprocessor/steps';

// import DockerComposeContainer from "../../testcontainers/compose_containers";

Given(/^The below numbers are given$/, (table) => {

});

Given(/^Numbers are given (\S+) and (\S+)$/, (firstValue, secondValue) => {
    // DockerComposeContainer.up();

    cy.visit("http://10.150.21.212:8073");

    cy.get('input[id="firstValue"]')
        .type(firstValue);
    cy.get('input[id="secondValue"]')
        .type(secondValue);
});

When(/^Barkın wants to perform (\S+) those two numbers$/, (operation) => {
    cy.get('button[id="additionButton"]')
        .click()
});

Then(/^Barkın should see result (\S+) and (\S+) message$/, (resultValue, resultMessage) => {
    cy.get('input[id="resultValue"]').should('have.value', resultValue)
    cy.get('input[id="resultMessage"]').should('have.value', resultMessage)
});