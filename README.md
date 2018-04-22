# Intro
This is a demo of using Node.js to expose a HTTP API. A 'user' can request to start a video, end a video or ask for a count of how many videos they have started.

The live API is available here: `TBA`

## How it works
TBD - describe bootstrapping mechanism for node / aws environments.

# How to use
`$ curl -i -H "X-Username: Adrian" -X GET http://localhost:3000/video/start`

`$ curl -i -H "X-Username: Adrian" -X GET http://localhost:3000/video/end`

`$ curl -i -H "X-Username: Adrian" -X GET http://localhost:3000/video/count`

Where `Adrian` is the username for the user, used for tracking the number of videos being watched.

# Running the app
The easiest way to get running is just using docker compose. However you can build and run the docker file yourself, or run locally within VS Code.

`$ npm run install`
TBD

# Running the tests
`$ npm run test`

# Building / Starting
## Prerequisites: Required
- [Node.js](https://nodejs.org/en/download/)

## Prerequisites: Optional
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
You can run the code in this repository using node directly, or with Docker. The application itself is deployed to AWS Lambda, and described using the `aws-lambda.sam-template.yaml` SAM template. This section covers deployment to AWS using the CLI. You must have the [CLI configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) against your account before continuing.

- Create a bucket: A bucket needs to exist before you can upload the package to it, you can create the bucket with this command: 
`aws s3 mb s3://node-videostream-api`
- Upload package: `$ npm run aws:package`
- Deploy package: `$ npm run aws:deploy`

## Resources
- https://docs.aws.amazon.com/lambda/latest/dg/serverless-deploy-wt.html#serverless-deploy

# Scalability Strategy
TBD. Cover local scalability within node and upon deployment

# Notes
## General
In a production system, a token would be used to authorise whether the
watch count can be de/incremented. For simplicity auth has been omitted,
and the user ID is placed in the HTTP header instead.
Using the user ID is a better solution to say an IP address, as there 
could be multiple users behind the same shared internet connection.

## Assumptions

## Testing

## Improvements
- If the scope of the logic within the controller got any more complicated, it would be worthwhile encapsulating the logic in it's own service / provider, rather than in the controller. For simplicity of the demo it has been left as is.