/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const {calculatorConfigResolver} = require('../config/cypress-config-resolver');
const pluginExecuteCommand = require('./plugin-execute-command');
const cucumber = require('cypress-cucumber-preprocessor').default;
const {
    GenericContainer,
    StartedDockerComposeEnvironment,
    StoppedDockerComposeEnvironment,
    DockerComposeEnvironment,
    Wait,
    Network
} = require('testcontainers');
const path = require("path");
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
    on('file:preprocessor', cucumber());
    on('task', {
        pluginExecuteCommand,
        createNetwork: async () => {
            const cont = await new Network()
                .start();
            return cont.getName();
        },
        createComposeContainer: async () => {
            const composeFilePath = path.resolve(__dirname, "../../");
            console.log(composeFilePath)
            const composeFile = "docker-compose.yml";
            const cont = await new DockerComposeEnvironment(composeFilePath, composeFile)
                .withEnv("WORKER_IP", process.env.WORKER_IP)
                .withWaitStrategy("calculator-service", Wait.forHealthCheck())

                .up();
            // const props = {}
            // props.port = cont.getMappedPort(8070);
            // props.ip = "192.168.65.3";

            return cont;
        },
        createAdditionContainer: async (network) => {
            const composeFilePath = path.resolve(__dirname, "/");
            console.log(composeFilePath)
            const composeFile = "docker-compose.yml";
            // await new DockerComposeEnvironment(composeFilePath, composeFile)
            //     .withEnv("WORKER_IP", " 10.150.21.212")
            //     .up();

            const cont = await new GenericContainer("mbarkin26/addition-service:latest")
                .withEnv("SERVER_PORT", "8070")
                .withEnv("DOCKER_HOST", "tcp://docker:2375")
                // .withNetworkMode(network)
                .withExposedPorts(8070)
                .withPrivilegedMode()
                .withNetworkMode("host")
                .start();
            const props = {}
            props.port = cont.getMappedPort(8070);
            props.ip = "192.168.65.3";

            return props;
        },
        createSubtractionContainer: async (network) => {
            const cont = await new GenericContainer("mbarkin26/subtraction-service:latest")
                .withEnv("SERVER_PORT", "8071")
                .withEnv("DOCKER_HOST", "tcp://10.150.21.212:2375")
                // .withNetworkMode(network)
                .withExposedPorts(8071)
                .withNetworkMode("host")
                .withPrivilegedMode()
                .start();

            const props = {}
            props.port = cont.getMappedPort(8071);
            props.ip = "192.168.65.3";

            return props;
        },
        createCalculatorContainer: async ({network, additionProps, subtractionProps}) => {
            const cont = await new GenericContainer("mbarkin26/calculator-service:latest")
                .withEnv("CALCULATOR_ADDITIONSERVICEURL", "http://" + additionProps.ip + ":" + additionProps.port + "/api/addition/calculate")
                .withEnv("CALCULATOR_SUBTRACTIONSERVICEURL", "http://" + subtractionProps.ip + ":" + subtractionProps.port + "/api/subtraction/calculate")
                .withEnv("SERVER_PORT", "8072")
                .withEnv("DOCKER_HOST", "tcp://docker:2375")
                .withNetworkMode("host")
                .withPrivilegedMode()
                // .withNetworkMode(network)
                .withExposedPorts(8072)
                .start();

            const props = {}
            props.port = cont.getMappedPort(8072);
            props.ip = "192.168.65.3";

            return props;
        },
        createCalculatorUIContainer: async ({network, calculatorProps}) => {
            const cont = await new GenericContainer("mbarkin26/calculator-ui:0.0.1")
                .withEnv("REACT_APP_CALCULATOR_SERVICE_ADDITION_URL", "http://" + calculatorProps.ip + ":" + calculatorProps.port + "/calculator/addition")
                .withEnv("REACT_APP_CALCULATOR_SERVICE_SUBTRACTION_URL", "http://" + calculatorProps.ip + ":" + calculatorProps.port + "/calculator/subtraction")
                .withEnv("PORT", "8073")
                .withEnv("DOCKER_HOST", "tcp://docker:2375")
                .withWaitStrategy(Wait.forLogMessage("You can now view calculator-ui in the browser."))
                .withNetworkMode("host")
                // .withNetworkMode(network)
                .withExposedPorts(8073)
                .withPrivilegedMode()
                .start();

            const props = {}
            props.url = "http://" + "192.168.65.3" + ":" + "8073";

            return props;
        },
        stopComposeContainer: async ({environment}) => {
            const composeFilePath = path.resolve(__dirname, "E:\\Workspace\\calculator-end-to-end-test-js");
            console.log(composeFilePath);
            const composeFile = "docker-compose.yml";
            const cont = await new StartedDockerComposeEnvironment(
                environment.composeFilePath,
                environment.composeFiles,
                environment.projectName,
                environment.startedGenericContainers
            ).down();
            // Object.assign(DockerComposeEnvironment, environment);
            // await environment.down();
            return cont;
        }
    });
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    return calculatorConfigResolver();
}
