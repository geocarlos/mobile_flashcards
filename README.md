# Mobile Flash Cards

This is a React Native application. It is the third and last project for the Udacity React Developer Nanodegree.

It is developed using Expo. This is a version developed for and tested only on Android. It is probably not hard to adapt it for iOS, though.

## Brief Description

This is an application that allows users to create 'decks' of cards with questions and answers, so that they may quiz themselves, in order to check their knowledge in a specific field. Each card has a question on a side and an answer on the other. The users are supposed to say the answer before seeing it, and then flip the card to read the answer and check if they got it right. If they did get it right, they should click on the 'correct' button; otherwise, they should click on the 'incorrect' button. When all the cards are passed, the number of correct answers will be shown.

In addition to adding, the users may also change a Deck title as well as edit the questions and answers on the cards.

## How to run the application

In order to run this application, you need Node and npm installed on your computer.

You may download this repository or, if you have Git on your computer, you may clone it, but running the command `git clone https://github.com/geocarlos/mobile_flashcards.git` from a terminal/command prompt/PowerShell. Then, run the command `cd mobile_flashcards`, then `npm install`, and finally, `npm start`. You may also use Yarn, if you prefer.

If everything works as expected, you should see a QR Code somewhere on your terminal/commmand prompt/PowerShell. In order to run the application on your cellphone, you need to install Expo from Google Play Store, and then use it, with your phone camera, to read the QR Code, and Expo will run the app on your phone. (You may refer to Expo website to learn about packaging a React Native app as an APK with Expo, if you are a learner approaching that stage already.)

You may also connect your phone to the computer, or use an emulator. In this case, the command to be run is `npm run android`.

## Mock Data

A file with some mock decks/cards, `mock_cards.js`, is included in the `utils` folder. Please refer to the file `/actions/thunk_helpers.js` to learn how you may use them.
