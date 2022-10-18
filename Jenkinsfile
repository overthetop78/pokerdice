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
            step {
                withSonarQubeEnv('sonarqube') {
                    sh 'cd backend && sonar-scanner'
                }
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
