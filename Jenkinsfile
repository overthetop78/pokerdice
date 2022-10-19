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
        stage('Build Backend') {
            steps {
                sh 'cd backend && npm install'
            }
        }
        stage('Test Backend') {
            steps {
                sh 'cd backend && npm test core.controller.spec.ts'
            }
        }
        stage('Deploy Backend') {
            steps {
                sh 'cd backend && npm run build'
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'cd frontend && npm install'
            }
        }
        stage('Test Frontend') {
            steps {
                sh 'export CHROME_BIN=/usr/bin/google-chrome-stable'
                sh 'cd frontend && npm test'
            }
        }
        stage('Deploy Frontend') {
            steps {
                sh 'cd frontend && npm run build'
            }
        }
    }
}
