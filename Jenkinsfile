pipeline {
    agent any

    environment {
        AWS_REGION       = "ap-south-1"
        AWS_ACCOUNT_ID   = "458945172685"
        ECR_REPO         = "featureauth"
        CLUSTER_NAME     = "my-eks4"
        DEPLOYMENT_NAME  = "featureauth"
        IMAGE_TAG        = "" // will be set dynamically per build
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/kartikfating1/featureAuth.git'
                
                script {
                    // Use PowerShell to get short Git commit hash for IMAGE_TAG
                    IMAGE_TAG = powershell(
                        returnStdout: true, 
                        script: 'git rev-parse --short HEAD'
                    ).trim()
                    
                    echo "Using IMAGE_TAG: ${IMAGE_TAG}"
                }
            }
        }

        stage('Build & Push Image to ECR') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {

                    bat """
                    docker build -t ${ECR_REPO}:${IMAGE_TAG} .
                    docker tag ${ECR_REPO}:${IMAGE_TAG} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}
                    """

                    bat """
                    for /f "delims=" %%i in ('aws ecr get-login-password --region ${AWS_REGION}') do docker login --username AWS --password %%i ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                    """

                    bat """
                    docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {

                    bat """
                    aws eks update-kubeconfig --name ${CLUSTER_NAME} --region ${AWS_REGION}
                    kubectl set image deployment/${DEPLOYMENT_NAME} ${DEPLOYMENT_NAME}=${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG} -n mongo
                    kubectl rollout status deployment/${DEPLOYMENT_NAME} -n mongo
                    """
                }
            }
        }
    }

    post {
        success {
            echo "🎉 Deployment Successful! IMAGE_TAG: ${IMAGE_TAG}"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
