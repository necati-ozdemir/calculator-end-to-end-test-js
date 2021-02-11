import {Before} from "cypress-cucumber-preprocessor/steps";
import calculatorConfigResolver from '../../config/config.json'

Before((scenario) => {
    console.log(calculatorConfigResolver)
    cy.visit(calculatorConfigResolver.url);
})