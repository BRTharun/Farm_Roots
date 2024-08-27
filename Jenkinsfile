pipeline {
    agent { label 'windows' }
    environment {
        DOTNET_SDK_VERSION = '8.0'
    }
    tools {
        nodejs 'NodeJS_20.13.1'
    }
    
    
    stages {

        stage('Build .NET Application') {
            steps {
                script {
                    dir('') {
                        echo '.NET Build stage'
                    }
                }
            }
        }

        stage('Build Angular Application') {
            steps {
                script {
                    dir('') {
                        echo 'Angular Build stage'
                    }
                }
            }
        }
        


	stage('Build React Application') {
            steps {
                script {
                    dir('') {
                        echo 'React Build stage'
                    }
                }
            }
        }


        stage('Running .NET Tests') {
            steps {
                script {
                    dir('Dev') {
                        echo '.NET Running stage'
                    }
                }
            }
        }




        stage('Running Angular Tests') {
            steps {
                script {
                    dir('') {
                        echo 'Angular Running stage'
                    }
                }
            }
        }

        stage('Test React Application') {
            steps {
                script {
                    dir('') {
                        echo 'React Test stage'
                    }
                }
            }
        }

        stage('Analyse application') {
            steps {
                script {
                    echo 'Analysis stage'
                }
            }
        }
    }
    

    post {
        always {
            script {
                echo 'Pipeline Finished'
            }
        }
    }
}
