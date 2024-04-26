pipeline {
    agent none
    
    stages {
        stage("Checkout SCM"){
            agent any
            steps {
                git url: 'https://github.com/dirudeen/React-Todo-App.git', branch: 'main'
            }
        }
    

        stage("Run static code analysis and formaters in frontend"){
            agent {
                docker {
                    image 'node:21-alpine3.18'
                }   
            }
            steps {
                dir("frontend"){
                    sh "npm run lint"
                    sh "npm run format"
                }
            }
            
        }

        // stage("Run cypress tests"){
        //     agent {
        //         docker {
        //             image "cypress/base"
        //             args '-u 0:0'
        //         }
        //     }
        //      steps {
        //         dir('frontend') {
        //         sh "npm ci"
        //         // Start the development server as a background task
        //         sh 'npm run dev &'
        //         // Wait for the server to start
        //         sh 'sleep 15'
        //         // Run the Cypress tests
        //         sh 'npm run cypress:run'
        //         // Stop the background development server
        //         sh 'pkill node'
        //         } 
        //     }
        // }

        stage("Build and push docker image"){
            agent any
            environment {
                DOCKER_CRED = credentials('docker-cred')
                DOCKER_IMAGE_FRONTEND = "dirudeen/react-todo-app_frontend:v${BUILD_NUMBER}"
                DOCKER_IMAGE_BACKEND = "dirudeen/react-todo-app_backend:v${BUILD_NUMBER}"
            }
            steps {
                sh "cd frontend && docker build -t ${DOCKER_IMAGE_FRONTEND} ."
                sh "cd backend && docker build -t ${DOCKER_IMAGE_BACKEND} ."
                sh 'docker login -u dirudeen -p $DOCKER_CRED_PSW'
                sh "docker push ${DOCKER_IMAGE_FRONTEND}"
                sh "docker push ${DOCKER_IMAGE_BACKEND}"
            }
        }
    }
}