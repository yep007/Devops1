pipeline {
  agent any
  environment {
    DOCKER_CREDS = credentials('docker-hub-creds')  // Store Docker Hub creds in Jenkins
    KUBE_CONFIG = credentials('kube-config')        // Store kubeconfig in Jenkins
  }
  stages {
    // Stage 1: Test
    stage('Test') {
      steps {
        sh '''
          cd app/frontend
          npm install
          npm test -- --watchAll=false
          cd ../../app/backend
          npm install
          npm test
        '''
      }
    }
    // Stage 2: Build & Push Docker Images
    stage('Build') {
      steps {
        sh '''
          cd app/frontend
          docker build -t ${DOCKER_CREDS_USR}/todo-frontend:${GIT_COMMIT} .
          docker push ${DOCKER_CREDS_USR}/todo-frontend:${GIT_COMMIT}
          cd ../../app/backend
          docker build -t ${DOCKER_CREDS_USR}/todo-backend:${GIT_COMMIT} .
          docker push ${DOCKER_CREDS_USR}/todo-backend:${GIT_COMMIT}
        '''
      }
    }
    // Stage 3: Deploy to Kubernetes
    stage('Deploy') {
      steps {
        sh '''
          # Update Kubernetes manifests with new image tags
          sed -i "s|image: .*|image: ${DOCKER_CREDS_USR}/todo-frontend:${GIT_COMMIT}|" infra/frontend-deployment.yaml
          sed -i "s|image: .*|image: ${DOCKER_CREDS_USR}/todo-backend:${GIT_COMMIT}|" infra/backend-deployment.yaml
          # Apply manifests
          kubectl --kubeconfig=${KUBE_CONFIG} apply -f infra/
        '''
      }
    }
  }
}
