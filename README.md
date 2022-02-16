# Gavri Dictionary App

link to official site via s3 and cloud front: [Gavri dictionary](https://d3iwjb8npp9uhz.cloudfront.net/)

## Intro

<!-- Gavri Dictionary is an application consisting of a range of services to help you, the user, use an online easy to use and reliable dictionary. Much like a regular old paper dictionary, Gavri dictionary can be used to look up words and there minings, but it can do much more! -->

This project is a cloud based dictionary application based on the AWS Cloud. The application consists of multiple micro services working together in since, with the
Microservices Architecture mindset. Fill free to check out the project [road map](#road-map) at the bottom of the page, where you'll find project future goals.

## Table of contents

1. [Back-end](#back-end)
2. [Services and Build](#services)
3. [Structure](#structure)
4. [Api](#api)
5. [Front-end](#front-end)
6. [Build](#build-front)
7. [Use cases](#use-cases)
8. [Road map](#road-map)

<!-- ## About the project[](#about-the-project)

This project was made as an exercise for learning cloud infrastructure in aws aka amazon web services. The contents of this repo include the back-end and the front-end of the app. -->

# Back-end[](#back-end)

## Services and Build[](#services)

### DynamoDB - dictionary-table

A noSQL db created for storing the dictionary words definitions

How did I insert all the 100,000+ words present?

I found the best solution is not to insert every word from my desktop computer, but rather create a separate system for word insertion. I created an S3 bucket for storing json files that, on insertion, triggers a Lambda, named "ingest", that loops throw the json, ingesting each word and uploading it in the correct format to `dictionary-table`.
At the moment the system is not in production state and I plan on <b>making it fully integrated</b> soon. [road map](#road-map)

### Serverless - Api-Gateway, express Lambda and DynamoDB

The Api-Gateway allows to invoke the express Lambda with the current request. The Lambda is responsible for handling that request accordingly.

This is the main back-end api. It is built using the [Serverless Framework](https://www.serverless.com/).

### Cloud-Front

The front-end part of the app is served by an S3 bucket.
In order to get the added benefit of using SSL and https and more I added the CloudFront service. There are more benefits for using that method witch i wont mention here.

## Structure

![diagram](./readme-pic/dict-back.png)

## Tests

For testing I opt to use jest and supertest.

## Api[](#api)

- GET "/word/:word" - get the definition of a word
- GET "/word/:word/:partOfSpeech - get the word definition filter by part of speech
- GET "partOfSpeech/:part - get random word withe a spacific part of speech

# Front-end[](#front-end)

## Build[](#build)

This project was build using the following technologies:

1.  React.js and MUI
2.  react router
3.  react query
4.  js, css, html
5.  aws s3 storage
6.  cloud front aws service

## Tests[](#test-front)

I opt to use the Cypress library for my e2e testing.

To run the tests you can run: `npm run cy:run` - for headless or `npx cypress open` - for full debug mode
Tests at the moment:

Word search

- √ using appBar search bar
- √ using bottom of page search bar
- √ traversing throw words links

AppBar buttons test

- √ home button returns home (2346ms)
- √ history button goes to history (4081ms)

## Use cases[](#use-cases)

- Mobile compatible!
  the front end was designed in the mobile first methodology.
- Search word:

  From the home screen, you have 2 ways to search for a word.

  1. use the upper right corner search bar input
  2. use the search input at the bottom of the page

  ![home page photo](./readme-pic/Home.jpg)

  3. press Enter, and off you go!

  ![a search output](./readme-pic/Book.jpg)

- Search history
  1. press the search history button at the app bar
- Easy to use menu

  ![menu component](./readme-pic/Menu.jpg)

- Each word is a link. Try it!

## Road map[](#road-map)