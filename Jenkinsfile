pipeline {
    agent none

    environment {
        DOCKER_IMAGE = 'pruuthiraj22736879/isec6000-node-app'
    }

    stages {

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:16'
                }
            }
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            agent {
                docker {
                    image 'node:16'
                }
            }
            steps {
                sh 'npm test'
            }
        }

        stage('Dependency Security Scan') {
            agent {
                docker {
                    image 'node:16'
                }
            }
            steps {
                sh '''
                    npm audit --audit-level=high > npm-audit.txt 2>&1
                    AUDIT_STATUS=$?
                    cat npm-audit.txt
                    exit $AUDIT_STATUS
                '''
            }
            post {
                always {
                    archiveArtifacts artifacts: 'npm-audit.txt', fingerprint: true
                }
            }
        }

        stage('Build Docker Image') {
            agent any
            steps {
                sh 'docker build -t $DOCKER_IMAGE:$BUILD_NUMBER .'
                sh 'docker tag $DOCKER_IMAGE:$BUILD_NUMBER $DOCKER_IMAGE:latest'
            }
        }

        stage('Push Docker Image') {
            agent any
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_TOKEN" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $DOCKER_IMAGE:$BUILD_NUMBER
                        docker push $DOCKER_IMAGE:latest
                        docker logout
                    '''
                }
            }
        }
    }
}
