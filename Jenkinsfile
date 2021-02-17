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
           sh 'apt-get install libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb -y'
           sh 'npm install'

       }
       stage('Execute') {
           sh 'npm run cy:run'
       }


       // post {
       // always {
       //  junit keepLongStdio: true, testResults: 'test-results/*.xml', allowEmptyResults: true
       // archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', onlyIfSuccessful: false
       //}
       //}



}
