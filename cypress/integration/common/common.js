import {Before} from "cypress-cucumber-preprocessor/steps";
import calculatorConfigResolver from '../../config/config.json'

Before((scenario) => {
    cy.visit(calculatorConfigResolver.url);
});