# Gavri Dictionary App - Back

link to official site via s3 and cloud front: [Gavri dictionary](https://d3iwjb8npp9uhz.cloudfront.net/)

## Intro

Gavri Dictionary is an application consisting of a range of services to help you, the user, use an online easy to use and reliable dictionary. Much like a regular old paper dictionary, Gavri dictionary can be used to look up words and there minings, but it can do much more!

## Table of contents

1. [About the project](#about-the-project)
2. [Build](#build)
3. [Use cases](#use-cases)

## About the project[](#about-the-project)

This project was made as an exercise for learning cloud infrastructure in aws aka amazon web services. The contents of this repo include only the back-end part of the app.
To see the front-end part and more see: [front-end](https://github.com/gavriel44/aws-dictionary-front-end)

## Build[](#build)

This project was build using the following technologies:

1.  Node.js
2.  Express.js
3.  serverless framework
3.  aws - s3, dynamoDb, Lambda, CloudFront

## Stracture

![diagram](https://docs.aws.amazon.com/whitepapers/latest/microservices-on-aws/images/image4.png)

## Use cases[](#use-cases)

# Api

- GET "/word/:word" - get the definition of a word
- GET "/word/:word/:partOfSpeech - get the word definition filter by part of speech
- GET "partOfSpeech/:part - get random word withe a spacific part of speech
