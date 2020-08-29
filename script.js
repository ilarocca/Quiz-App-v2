/**
 *  QUESTION STORAGE
 */
const store = {
    questions: [
        {
          question: 'What is the level of signal generated before it is amplified by amp to line level?',
          answers: [
            'Capacitor',
            'Ampere',
            'Mic Level',
            'Pink Noise'
          ],
          correctAnswer: 'Mic Level'
        },
        {
          question: 'Difference between loudest and quietest SPL?',
          answers: [
            'Fundamental',
            'Dynamic Range',
            'Limiter',
            'Hertz'
          ],
          correctAnswer: 'Dynamic Range'
        },
        {
          question: 'Device that mutes a signal when it falls bellow a certain level?',
          answers: [
            'Noise Gate',
            'White Noise',
            'Gain',
            'Audio Velocity'
          ],
          correctAnswer: 'Noise Gate'
        },
        {
          question: 'Boosts or cuts frequiencies around a specified frequency',
          answers: [
            'Amplifier',
            'Bandpass Filter',
            'Condenser Mic',
            'Audio Velocity'
          ],
          correctAnswer: 'Bandpass Filter'
        },
        {
          question: 'A device that brings an electrical signal from microphone level to line level.',
          answers: [
            'A/D',
            'Preamp',
            'Audio Velocity',
            'Dynamic Range'
          ],
          correctAnswer: 'Preamp'
        }
      ],
    quizStarted: false,
    questionNumber: 0,
    score: 0,
    submitAnswer: false,
    correct: false, 
    chosenAnswer: ''
  };
  
  /********** TEMPLATE GENERATION FUNCTIONS **********/
  
  // These functions return HTML templates
  
  function generateWelcome() {
      return `
     <div class="welcome"> 
        <form>
         <p>Welcome! This quiz will evaluate your fundamental audio knowledge.</p>
         <button type="start" id="startQuiz">Start</button>
        </form>
     </div> 
     `;
  }

  function generateQuizForm() {
      let currentQuestion = store.questions[store.questionNumber]
      return `
      <div class="quiz-form">
        <p>Question ${store.questionNumber + 1}/${store.questions.length}</p>
        <p><b>${currentQuestion.question}</b></p>
        
        <form> 
            <ol>
                ${generateAnswers()}
            </ol>
            <button type="submit" id="submitAnswer">Submit</button>
        <form>

        <p>Score: ${store.score}</p>
      </div>
      `;
  }

  function generateAnswers() {
    let answersArray = store.questions[store.questionNumber].answers
    let answersHtml = ''; 

    for (let i = 0; i < answersArray.length; i++) {
        answersHtml += `
        <li>
            <div class="answer-container">
                <input type="radio" name="options" id="option${i + 1}" value="${answersArray[i]}" tabindex="${i + 1}" required>
                <label for="option${i + 1}">${answersArray[i]}</label>
            </div>
        </li>
        `;
    }
    return answersHtml;
  } 

  function generateAnswerResult() {
    let resultHtml = '';
    let buttonHtml = '';
    if(store.correct === true) {
         resultHtml = `<p>Congrats, "${store.questions[store.questionNumber].correctAnswer}" is correct!</p>`
    } else {
         resultHtml = `<p>Sorry, "${store.chosenAnswer}" is not correct. The correct answer is "${store.questions[store.questionNumber].correctAnswer}."</p>`
    }
    // + 1 to compensate for the way arrays read length
    if(store.questionNumber + 1 === store.questions.length) {
         buttonHtml = `<button type="submit" id="seeResults">See Results</button>`
    } else {
         buttonHtml = `<button type="submit" id="nextQuestion">Next</button>`
    }
    return `
     <div class="answer-result">
        <form>
            ${resultHtml}
            <p>Score: ${store.score}</p>
            ${buttonHtml}
        </form>
    <div>
    `;
  }

  function generateQuizResults() {
      return `
      <div class="quiz-results">
        <p>You got ${store.score} correct out of ${store.questions.length}</p>
        <button id="restartQuiz">Restart Quiz</button>
      </div>
      `;
  }

  /********** RENDER FUNCTION(S) **********/

  function renderQuiz() {
      if(store.quizStarted === false) {
          if(store.questionNumber === store.questions.length){
             // TOTAL RESULTS
             const resultsString = generateQuizResults();
             $('main').html(resultsString);
          } else { 
              //WELCOME
            const welcomeString = generateWelcome();
            $('main').html(welcomeString);
          }
      } else {
          if (store.submitAnswer === false) {
            // QUIZ FORM
            const formString = generateQuizForm();
            $('main').html(formString);
          } else {
            //ANSWER RESULTS
            const answerString = generateAnswerResult();
            $('main').html(answerString);
          }
      }
    }

  function startQuiz() {
      store.quizStarted = true;
  }

  function checkCorrectAnswer() {
      let chosenAnswer = $('input[name=options]:checked').val();
      let currentCorrectAnswer = store.questions[store.questionNumber].correctAnswer 
    if(chosenAnswer === undefined) {
        alert("Please Select An Answer");
    } else if(chosenAnswer === currentCorrectAnswer) {
          store.submitAnswer = true;
          store.correct = true;
          store.score++;
      } else {
          store.submitAnswer = true;
          store.correct = false;
          store.chosenAnswer = chosenAnswer;
      }
  }

  function nextQuestion() {
      if (store.questionNumber < store.questions.length) {
        store.questionNumber++;
        store.submitAnswer = false;
        store.correct = false, 
        store.chosenAnswer = ''
      } else if(store.questionNumber === store.questions.length) {
        store.quizStarted = false;
      }
  }

  function seeResults() {
      store.quizStarted = false;
      store.questionNumber++;
      console.log(store.questionNumber);
      console.log(store.questions.length);
  }

  function restartQuiz() {
    store.quizStarted = false;
    store.questionNumber = 0;
    store.score = 0;
    store.submitAnswer = false;
    store.correct = false;
    store.chosenAnswer = '';
  }

  /********** EVENT HANDLER FUNCTIONS **********/
  // These functions handle events (submit, click, etc)
  function handleStartQuiz() {
      $('main').on('click', '#startQuiz', (event) => {
          event.preventDefault();
          startQuiz();
          renderQuiz();
      });
  } 

  function handleSubmitAnswer() {
    $('main').on('click', '#submitAnswer', (event) => {
        event.preventDefault();
        checkCorrectAnswer();
        renderQuiz();
    });
  }

  function handleNextQuestion() {
      $('main').on('click', '#nextQuestion', (event) => {
          event.preventDefault();
          nextQuestion();
          renderQuiz();
      })
  }

  function handleSeeResults() {
      $('main').on('click', '#seeResults', (event) => {
        event.preventDefault();
        seeResults();
        renderQuiz();
      })
  }

  function handleRestartQuiz() {
      $('main').on('click', '#restartQuiz', (event) => {
          event.preventDefault();
          restartQuiz();
          renderQuiz();
      })
  }

  function handleQuiz() {
      renderQuiz();
      handleStartQuiz();
      handleSubmitAnswer();
      handleNextQuestion();
      handleSeeResults();
      handleRestartQuiz();
  }

  $(handleQuiz);