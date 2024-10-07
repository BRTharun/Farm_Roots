pipeline {
    agent { label 'linux' }
    environment {
        DOTNET_SDK_VERSION = '8.0.401' // Correct version for .NET 8.0
        DOTNET_INSTALL_DIR = "${HOME}/.dotnet"
        PATH = "${DOTNET_INSTALL_DIR}:${env.PATH}"
    }
    tools {
        nodejs 'NodeJS_20.13.1'
    }
    
    stages {
        // stage('Setup Environment') {
        //     steps {
        //         script {
        //             // Install the .NET SDK
        //             sh '''
        //                 wget https://dot.net/v1/dotnet-install.sh
        //                 chmod +x dotnet-install.sh
        //                 ./dotnet-install.sh --version ${DOTNET_SDK_VERSION}
        //                 export PATH=${DOTNET_INSTALL_DIR}:${PATH}
        //                 echo "PATH updated: $PATH"
        //             '''
        //         }
        //     }
        // }

        // stage('Build .NET Application') {
        //     steps {
        //         script {
        //             withEnv(["PATH=${env.DOTNET_INSTALL_DIR}:${env.PATH}"]) {
        //                 dir('Dev') {
        //                     sh 'dotnet restore Epm.FRoots.sln'
        //                     sh 'dotnet build Epm.FRoots.sln'
        //                 }
        //             }
        //         }
        //     }
        // }

        // stage('Build Angular Application') {
        //     steps {
        //         echo 'Angular build'
        //         script {
        //             dir('Dev/Epm.LGoods.UI/epm.lgoods.angularclient') {
        //                 sh 'npm install'
        //                 sh 'npm run build'
        //             }
        //         }
        //     }
        // }

        stage('Build React Application') {
            steps {
                script {
                    dir('Dev/Epm.FarmRoots.UI/Epm.FarmRoots.UI.ReactClient') {
                        sh 'npm install'
                        sh 'npm install @testing-library/react --save-dev'
                        sh 'npm list | grep @testing-library/react'
                        sh 'npm run build'
                    }
                }
            }
        }

        // stage('Running .NET Tests') {
        //     steps {
        //         script {
        //             withEnv(["PATH=${env.DOTNET_INSTALL_DIR}:${env.PATH}"]) {
        //                 dir('Dev') {
        //                     sh 'find . -name TestResults -exec rm -rf {} +'
        //                     sh 'dotnet test Epm.FRoots.sln --collect:"XPlat Code Coverage" -- DataCollectionRunSettings.DataCollectors.DataCollector.Configuration.Format=opencover'
        //                 }
        //             }
        //         }
        //     }
        // }

        // stage('Running Angular Tests') {
        //     steps {
        //         echo 'Angular Test'
        //         script {
        //             dir('Dev/Epm.LGoods.UI/epm.lgoods.angularclient') {
        //                 sh 'npm test -- --code-coverage'
        //             }
        //         }
        //     }
        // }

        stage('Test React Application') {
            steps {
                echo 'React Test'
                script {
                    dir('Dev/Epm.LGoods.UI/epm.lgoods.reactclient') {
                        sh 'npm test'
                    }
                }
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