# Intro
TBD - what is this?

# Starting
The easiest way to get running is just using docker compose. However you can build and run the docker file yourself, or run locally within VS Code.

# Prerequisites
## Required
- [Node.js](https://nodejs.org/en/download/)

## Optional
- [Docker (another runtime option)](https://docs.docker.com/install/)
- [AWS CLI (only required for deployment)](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)

## Docker Compose
TBD
## Docker
TBD
## VS Code
TBD
## CLI
TBD

# Deployment
You can run the code in this repository using node directly, or with Docker. The application itself is deployed to AWS Lambda, and described using the `aws-lambda.sam-template.yaml` SAM template. This section covers deployment to AWS.

## Create a bucket
A bucket needs to exist to upload the package to, you can create the bucket with this command: 
`aws s3 mb s3://node-videostream-api`

## Upload package
```
aws cloudformation package \
   --template-file file aws-lambda.sam-template.yaml \
   --output-template-file serverless-output.yaml \
   --s3-bucket node-videostream-api
```
`serverless-output.yaml` contains the uri to the s3 bucket containing the deployment package.

## Deploy package
```
aws cloudformation deploy \
   --template-file serverless-output.yaml \
   --stack-name new-stack-name \
   --capabilities CAPABILITY_IAM
```

## Resources
- https://docs.aws.amazon.com/lambda/latest/dg/serverless-deploy-wt.html#serverless-deploy

# Live endpoint
TBD

# How to use
`$ curl -i -H "Authorization: Adrian" -X GET http://localhost:3000/video/start`

`$ curl -i -H "Authorization: Adrian" -X GET http://localhost:3000/video/end`

`$ curl -i -H "Authorization: Adrian" -X GET http://localhost:3000/video/count`

# Scalability Strategy
TBD. Cover local scalability within node and upon deployment

# General Notes
In a production system, a token would be used to authorise whether the
watch count can be de/incremented. For simplicity auth has been omitted,
and the user ID is placed in the HTTP header instead.
Using the user ID is a better solution to say an IP address, as there 
could be multiple users behind the same shared internet connection.