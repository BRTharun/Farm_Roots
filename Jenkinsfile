pipeline {
    agent { label 'windows' }
    environment {
        DOTNET_SDK_VERSION = '8.0'
        GIT_CREDENTIAL_ID = 'fi2bjiJEpDTw4eTGh5yi'
    }
    tools {
        nodejs 'NodeJS_20.13.1'
    }
    stages {

        stage('Checkout Code') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: '*/develop']], 
                             userRemoteConfigs: [[url: 'https://githyd.epam.com/epm-pelg/june-10-team-7/farm-roots.git', 
                                                 credentialsId: GIT_CREDENTIAL_ID]]])
                }
            }
        }


        stage('Build .NET Application') {
            steps {
                script {
                    dir('Dev') {
                        bat 'dotnet restore Epm.FRoots.sln'
                        bat 'dotnet build Epm.FRoots.sln' 
                    }
                }
            }
        }

        stage('Build Angular Application') {
            steps {
                echo 'Angular build'
                // script {
                //     dir('Dev/Epm.LGoods.UI/epm.lgoods.angularclient') {
                //         bat 'npm install'
                        
                //         bat 'npm run build' 
                //     }
                // }
            }
        }
        


	stage('Build React Application') {
            steps {
                script {
                    dir('Dev/Epm.FarmRoots.UI/Epm.FarmRoots.UI.ReactClient') {
                        bat 'npm install'
                        
                        bat 'npm run build' 
                    }
                }
            }
        }


        stage('Running .NET Tests') {
            steps {
                script {
                    dir('Dev') {
                        
                        bat 'FOR /R %%G IN (TestResults) DO IF EXIST "%%G" RMDIR /S /Q "%%G"'

                        bat 'dotnet test Epm.FRoots.sln --collect:"XPlat Code Coverage" -- DataCollectionRunSettings.DataCollectors.DataCollector.Configuration.Format=opencover'
                     }
                }
            }
        }




        stage('Running Angular Tests') {
            steps {
                echo 'Angular Test'
                // script {
                //     dir('Dev/Epm.LGoods.UI/epm.lgoods.angularclient') {
                //         bat 'npm test -- --code-coverage'
                //     }
                // }
            }
        }

        stage('Test React Application') {
            steps {
                echo 'React Test'
                // script {
                //     dir('Dev/Epm.LGoods.UI/epm.lgoods.reactclient') {
                //         bat 'npm test' 
                //     }
                // }
            }
        }

        stage('Analyse application') {
            steps {
                script {
                    def scannerHome = tool 'SonarQube Scanner'
                        withSonarQubeEnv('SonarHyd') {
                            bat "${scannerHome}/bin/sonar-scanner.bat"
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
