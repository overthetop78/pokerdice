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
        stage('Test') {
            steps {
                sh 'cd backend && npm test core.controller.spec.ts --detectOpenHandles'
            }
        }
    }
}