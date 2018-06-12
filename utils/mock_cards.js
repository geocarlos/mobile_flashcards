export default function getMockDecks() {

  return {
    React: {
      title: 'React',
      questions: [{
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
      questions: [{
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }]
    },
    Redux: {
      title: 'Redux',
      questions: [{
          question: 'What are actions?',
          answer: 'Actions are payloads of information that send data from your application to your store.'
        },
        {
          question: 'What are reducers?',
          answer: 'Reducers specify how the application\'s state changes in response to actions sent to the store.'
        },
        {
          question: 'What is the Store?',
          answer: 'The Store is the object that brings actions and reducers together.'
        }
      ]
    }
  }
}
