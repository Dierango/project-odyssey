# Deploy Backend to Google Cloud Run
# Make sure you have gcloud CLI installed and authenticated

$PROJECT_ID = "your-project-id"  # Replace with your Google Cloud Project ID
$SERVICE_NAME = "project-odyssey-backend"
$REGION = "us-central1"

Write-Host "Building and deploying to Google Cloud Run..."

# Build and deploy using Cloud Build
gcloud builds submit --config cloudbuild.yaml

Write-Host "Deployment complete!"
Write-Host "Your backend will be available at:"
Write-Host "https://$SERVICE_NAME-[hash].$REGION.run.app"
