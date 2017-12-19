# reactnd-UdaciCards
With this project I realized a native app which allows users to study collections of flashcards, add new flashcards and take quizzes on those.

## Specific Requirements:
The project requirments where the following:
* Use create-react-native-app to build your project.
* Allow users to create a deck which can hold an unlimited number of cards.
* Allow users to add a card to a specific deck.
* The front of the card should display the question.
* The back of the card should display the answer.
* Users should be able to quiz themselves on a specific deck and receive a score once they're done.
* Users should receive a notification to remind themselves to study if they haven't already for that day.

## TL;DR

Yarn was used to initialize the project.
To get started developing right away:

* install all project dependencies with `yarn install`
* start the development server with `yarn start`

## What You're Getting
```bash
├── README.md - This file.
├── App.js # This is the root of your app.
├── app.json # this is your go-to place for configuring parts of your app that don’t belong in code.
├── App.test.js # Used for testing. Provided with Create React Native App. Testing is encouraged, but not required.
├── LICENSE # the file where the license information for the project is stored.
├── package.json # yarn package manager file. It's unlikely that you'll need to modify this.
├── yarn.lock # In order to get consistent installs across machines, Yarn needs more information than the dependencies you configure in your package.json. Yarn needs to store exactly which versions of each dependency were installed.
├── actions
│   └── index.js # redux actions to fetch, create and update decks and flashcards.
├── components
│   ├── AddCard.js # a form to add a new flashcard.
│   ├── DeckDetail.js # the view of on deck.
│   ├── DeckItem.js # the information of a single deck.
│   ├── Decks.js # a list of all available decks.
│   ├── NewDeck.js # a form to add a new deck.
│   ├── Quiz.js # the quiz view where you can see all the flashcards.
│   └── TextButton.js # a button component.
├── reducers
│   └── index.js # redux reducers which handles the fetch, create and update actions for decks and flashcards.
└── utils
    ├── _decks.js # helper to set dummy data for the decks.
    ├── api.js # AsyncStorage calls to store decks and flashcards.
    ├── colors.js # a set of colors.
    └── notifications.js # everything which is needed to trigger the notification.
```

## Views
The application consists of five views.

* Deck List View (Default View)
  * displays the title of each Deck
  * displays the number of cards in each deck
* New Deck View
  * An option to enter in the title for the new deck
  * An option to submit the new deck title
* Individual Deck View
  * displays the title of the Deck
  * displays the number of cards in the deck
  * displays an option to start a quiz on this specific deck
  * An option to add a new question to the deck
* New Question View
  * An option to enter in the question
  * An option to enter in the answer
  * An option to submit the new question
* Quiz View
  * displays a card question
  * an option to view the answer (flips the card)
  * a "Correct" button
  * an "Incorrect" button
  * the number of cards left in the quiz
  * Displays the percentage correct once the quiz is complete

## Data:
The applicatoin uses AsyncStorage to store the decks and flashcards.
Redux is also in place for this project.
Using AsyncStorage I manage an object whose shape is similar to this:

```
{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
```

## Create React Native App

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

If you need information about performing common tasks, the most recent version the Create React Native App guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

### `yarn start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
yarn start -- --reset-cache
```

## Contributing

Feel free to contribute to this repository if you like.
