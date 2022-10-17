pipeline {
    agent {
        docker {
            image 'node:current-alpine'
            args '-u root:root -p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'cd backend && npm install'
            }
        }
    }
}