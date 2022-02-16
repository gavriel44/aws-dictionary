# Gavri Dictionary App

link to official site via s3 and cloud front: [Gavri dictionary](https://d3iwjb8npp9uhz.cloudfront.net/)

## Intro

Gavri Dictionary is an application consisting of a range of services to help you, the user, use an online easy to use and reliable dictionary. Much like a regular old paper dictionary, Gavri dictionary can be used to look up words and there minings, but it can do much more!

## Table of contents

1. [About the project](#about-the-project)
2. [Back-end](#back-end)
3. [Build](#build-back)
4. [Structure](#structure)
5. [Api](#api)
6. [Front-end](#front-end)
7. [Build](#build-front)
8. [Use cases](#use-cases)

## About the project[](#about-the-project)

This project was made as an exercise for learning cloud infrastructure in aws aka amazon web services. The contents of this repo include the back-end and the front-end of the app.

# Back-end[](#back-end)

## Build[](#build-back)

This project was build using the following technologies:

1.  Node.js
2.  Express.js
3.  serverless framework
4.  aws - s3, dynamoDb, Lambda, CloudFront

## Structure

![diagram](./readme-pic/dict-back.png)

## Api[](#api)

- GET "/word/:word" - get the definition of a word
- GET "/word/:word/:partOfSpeech - get the word definition filter by part of speech
- GET "partOfSpeech/:part - get random word withe a spacific part of speech

# Front-end[](#front-end)

## Build[](#build)

This project was build using the following technologies:

1.  React.js and MUI
2.  react router
3.  js, css, html
4.  aws s3 storage
5.  cloud front aws service

## Use cases[](#use-cases)

- Mobile compatible!
  the front end was designed in the mobile first metodologi.
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
