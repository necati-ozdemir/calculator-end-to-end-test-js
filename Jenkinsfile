node {
//    tools {
//        nodejs "NodeJS"
//    }
//
//    options {
//        buildDiscarder(logRotator(numToKeepStr: '3'))
//    }

    stage('Initialize') {
        def dockerHome = tool 'docker'
        def nodeJsHome = tool 'NodeJS'
        env.PATH = "${dockerHome}/bin:${nodeJsHome}/bin:${env.PATH}"
    }

    stage('Checkout') {
        checkout scm
    }

    stage('Get dependencies') {
        sh 'npm install'
    }

    stage('Execute') {
        def dockerHome = tool 'docker'
        def nodeJsHome = tool 'NodeJS'
        env.PATH = "${dockerHome}/bin:${nodeJsHome}/bin:${env.PATH}"

        sh 'docker-compose up -d'
        docker.image('cypress/base:latest')
                .inside {
                    sh 'npm run cy:install'
                    sh 'npm run cy:run'
                }
    }

    stage('Down') {
        sh 'docker-compose down -v'
    }


    // post {
    // always {
    //  junit keepLongStdio: true, testResults: 'test-results/*.xml', allowEmptyResults: true
    // archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', onlyIfSuccessful: false
    //}
    //}


}
