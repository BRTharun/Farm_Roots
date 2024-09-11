pipeline {
    agent { label 'linux' }
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
                    // Install the .NET SDK if not already installed
                    sh 'wget https://dot.net/v1/dotnet-install.sh'
                    sh 'chmod +x dotnet-install.sh'
                    sh './dotnet-install.sh --version ${DOTNET_SDK_VERSION}'
                    sh 'export PATH=$PATH:$HOME/.dotnet'

                    dir('Dev') {
                        sh 'dotnet restore Epm.FRoots.sln'
                        sh 'dotnet build Epm.FRoots.sln'
                    }
                }
            }
        }

        stage('Build Angular Application') {
            steps {
                echo 'Angular build'
                // script {
                //     dir('Dev/Epm.LGoods.UI/epm.lgoods.angularclient') {
                //         sh 'npm install'
                //         sh 'npm run build'
                //     }
                // }
            }
        }

        stage('Build React Application') {
            steps {
                script {
                    dir('Dev/Epm.FarmRoots.UI/Epm.FarmRoots.UI.ReactClient') {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Running .NET Tests') {
            steps {
                script {
                    dir('Dev') {
                        sh 'find . -name TestResults -exec rm -rf {} +'
                        sh 'dotnet test Epm.FRoots.sln --collect:"XPlat Code Coverage" -- DataCollectionRunSettings.DataCollectors.DataCollector.Configuration.Format=opencover'
                    }
                }
            }
        }

        stage('Running Angular Tests') {
            steps {
                echo 'Angular Test'
                // script {
                //     dir('Dev/Epm.LGoods.UI/epm.lgoods.angularclient') {
                //         sh 'npm test -- --code-coverage'
                //     }
                // }
            }
        }

        stage('Test React Application') {
            steps {
                echo 'React Test'
                // script {
                //     dir('Dev/Epm.LGoods/UI/epm.lgoods.reactclient') {
                //         sh 'npm test'
                //     }
                // }
            }
        }

        stage('Analyse application') {
            steps {
                script {
                    def scannerHome = tool 'SonarQube Scanner'
                    withSonarQubeEnv('SonarHyd') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                def qg = waitForQualityGate()
                if (qg.status != 'OK') {
                    currentBuild.result = 'FAILURE'
                    error "Quality Gate failed: ${qg.status}"
                }
            }
        }
    }
}
