def notify(String text) {
    writeFile file: 'tg.json',
              text: groovy.json.JsonOutput.toJson([chat_id: '8865984029', text: text]),
              encoding: 'UTF-8'
    bat 'curl.exe -s -X POST -H "Content-Type: application/json" -d @tg.json https://api.telegram.org/bot%TG_TOKEN%/sendMessage'
}

pipeline {
    agent any

    triggers { pollSCM('* * * * *') }

    environment {
        PROJECT  = 'devops-test'
        BRANCH   = 'main'
        SITE_URL = 'http://localhost:3001'
        TG_TOKEN = credentials('telegram-token')
    }

    stages {
        stage('Notify Start') {
            steps {
                script {
                    notify("🚀 DEPLOY STARTED\nProject: ${env.PROJECT}\nBranch: ${env.BRANCH}")
                }
            }
        }
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install dependencies') {
            steps { bat 'npm install' }
        }
        stage('Build') {
            steps { bat 'npm run build' }
        }
        stage('Deploy') {
            steps {
                bat '''
                robocopy dist D:\\deploy\\devops-test /MIR /NFL /NDL
                if errorlevel 8 exit /b 1
                exit /b 0
                '''
            }
        }
    }

    post {
        success {
            script {
                notify("✅ DEPLOY SUCCESS NHÉ\nProject: ${env.PROJECT}\nBranch: ${env.BRANCH}\nURL: ${env.SITE_URL}")
            }
        }
        failure {
            script {
                notify("❌ DEPLOY FAILED RỒI\nProject: ${env.PROJECT}\nBranch: ${env.BRANCH}\nPlease check Jenkins.")
            }
        }
    }
}