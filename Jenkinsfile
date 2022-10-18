pipeline {
    agent {
        docker {
            image 'node:current-alpine'
            args '-u root:root -p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'cd backend && npm install'
            }
        }
        stage('SonarQube analysis') {
            def scannerHome = tool 'SonarScanner 4.0'
            withSonarQubeEnv('My SonarQube Server') {
                sh "${scannerHome}/bin/sonar-scanner"
            }
        }
        stage('Test') {
            steps {
                sh 'cd backend && npm test core.controller.spec.ts'
            }
        }
        stage('Deploy') {
            steps {
                sh 'cd backend && npm run build'
            }
        }
    }
}
