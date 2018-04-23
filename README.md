# Intro
This is a demo of using Node.js with TypeScript to expose a HTTP API. A 'user' can request to start a video, end a video or ask for a count of how many videos they have started.

## How it works
The application can either be hosted using the Node.js http server (index.ts) or AWS Lambda (index-aws-lambda.ts).

The requests will be routed to the appropriate action on a controller, where the watch count for the given user will either be incremented, decremented or just returned as a count. If using the Node.js http server, an in memory repository is used for storing watch counts for users - this is ideal for local development. Clearly this isn't a scalable solution, thus when deployed to AWS a DynamoDB repository is injected instead.

# How to use
The following curl commands will make a request to the endpoint and return the headers, along with the number of videos in the return body.

## Production
Where `Adrian` is the username for the user, used for tracking the number of videos being watched.

Start Video (increments count): `$ curl -i -H "x-username: Adrian" -X GET https://m6l3t9dvwl.execute-api.us-east-1.amazonaws.com/Prod/startVideo`

Stop Video (decrements count): `$ curl -i -H "x-username: Adrian" -X GET https://m6l3t9dvwl.execute-api.us-east-1.amazonaws.com/Prod/endVideo`

Count (returns count): `$ curl -i -H "x-username: Adrian" -X GET https://m6l3t9dvwl.execute-api.us-east-1.amazonaws.com/Prod/count`

## Local
Start Video (increments count): `$ curl -i -H "x-username: Adrian" -X GET http://localhost:3000/videos/start`

Stop Video (decrements count): `$ curl -i -H "x-username: Adrian" -X GET http://localhost:3000/videos/end`

Count (returns count): `$ curl -i -H "x-username: Adrian" -X GET http://localhost:3000/videos/count`


# Building / Starting
## Prerequisites: Required
- [Node.js](https://nodejs.org/en/download/)

## Prerequisites: Optional
- [Docker (another runtime option)](https://docs.docker.com/install/)
- [AWS CLI (only required for deployment)](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)

## Install packages
- Run `$ npm install` at the root of the repository

## VS Code
- Open repository in VS Code
- Hit F5

## Run from CLI
`$ npm run install`

`$ npm start`

## Running the tests
`$ npm run test`

# Deployment
You can run the code in this repository using node directly, or with Docker. The application itself is deployed to AWS Lambda, and described using the `aws-lambda.sam-template.yaml` SAM template. This section covers deployment to AWS using the CLI. You must have the [CLI configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) against your account before continuing.

- Create a bucket: A bucket needs to exist before you can upload the package to it, you can create the bucket with this command: 
`aws s3 mb s3://node-videostream-api`
- Upload package: `$ npm run aws:package`
- Deploy package: `$ npm run aws:deploy`

# Scalability Strategy
AWS Lambda has been used to provide automatic scalability of the function. AWS will auto provision any resources required depending on load.

For tracking how many videos are being watched by a user, data is persisted using DynamoDB within AWS - which is also autoscaled. The username of the user has been used as the primary key (thus used for partitioning).

If hosting outside of AWS with DynamoDB, consideration is needed around the repository used for persistenting the watch count. One solution is to ensure that multiple instances of the API only use a single database, but this database will become a bottleneck long term. I'd recommend sharding on the username to allow for scaling out of the database.

# Notes
## General
In a production system, a token would be used to authorise whether the watch count can be de/incremented. For simplicity auth has been omitted, and the user ID is placed in the HTTP header instead. Using the user ID is a better solution to say an IP address, as there could be multiple users behind the same shared internet connection.

## Testing
Unit tests have been written throughout where deemed sensible. They can be run using: `$ npm run test`. I have used Mocha (test runner), Chai (assertion), Sinon (spies) and TypeMoq (Mocks). Note: Mocks are available within Sinon but compatability with TypeScript is better within TypeMoq.

The application has been tested on:
- Ubuntu 17.10
- Windows 10
- AWS Lambda

## Improvements
- If the scope of the logic within the controller got any more complicated, it would be worthwhile encapsulating the logic in it's own service / provider, rather than in the controller. For simplicity of the demo it has been left as is.