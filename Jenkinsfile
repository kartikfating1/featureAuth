pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        AWS_ACCOUNT_ID = "458945172685"
        ECR_REPO = "featureauth"
        CLUSTER_NAME = "my-eks4"
        DEPLOYMENT_NAME = "featureauth"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/kartikfating1/featureAuth.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests (Optional)') {
            steps {
                bat 'echo "No tests configured"'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat """
                docker build -t ${ECR_REPO}:${IMAGE_TAG} .
                docker tag ${ECR_REPO}:${IMAGE_TAG} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}
                """
            }
        }

        stage('Login to ECR') {
            steps {
                bat """
                aws ecr get-login-password --region ${AWS_REGION} \
                | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                """
            }
        }

        stage('Pubat Image to ECR') {
            steps {
                bat """
                docker pubat ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}
                """
            }
        }

        stage('Update Deployment in EKS') {
            steps {
                bat """
                aws eks update-kubeconfig --name ${CLUSTER_NAME} --region ${AWS_REGION}
                kubectl set image deployment/${DEPLOYMENT_NAME} ${DEPLOYMENT_NAME}=${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG} -n mongo
                kubectl rollout status deployment/${DEPLOYMENT_NAME} -n mongo
                """
            }
        }
    }

    post {
        success {
            echo "🎉 Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
