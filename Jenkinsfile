pipeline {
    agent none
    
    stages {
        stage("Checkout SCM"){
            agent any
            steps {
                git url: 'https://github.com/dirudeen/React-Todo-App.git', branch: 'main'
            }
        }
        
        stage("Install dependencies for frontend"){
            agent {
                docker {
                    image 'node:21-alpine3.18'
                }   
            }
          node {
            steps {
                dir(frontend){
                    sh "npm ci"
                }
            }
          }  
        }

        // stage("Run Tests linters and formaters in frontend"){
        //     agent {
        //         docker {
        //             image 'node:21-alpine3.18'
        //         }   
        //     }
        //     steps {
        //         dir(frontend){
        //             sh "npm run lint"
        //             sh "npm run format"
        //         }
        //     }
            
        // }

        // stage("Run cypress tests"){
        //     agent {
        //         docker {
        //             image "cypress/included:13.8.1"
        //         }
        //     }
        //      steps {
        //         dir('frontend') {
        //         // Start the development server as a background task
        //         sh 'npm start &'
        //         // Wait for the server to start
        //         sh 'sleep 15'
        //         // Run the Cypress tests
        //         sh 'npm run cypress:run'
        //         // Stop the background development server
        //         sh 'pkill node'
        //         } 
        //     }
        // }
    }
}