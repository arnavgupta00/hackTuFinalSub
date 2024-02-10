// Quiz.js

import React, { useState } from 'react';
import './quiz.css';
import logo from "../../assets/Logo.png";
import Navbar from '../../components/navbar/navbar';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      "question": "What environmental activist gained international recognition for her efforts to combat climate change, starting the 'Fridays for Future' movement?",
      "options": ["Greta Thunberg", "Jane Goodall", "Wangari Maathai", "Vandana Shiva"],
      "correctAnswer": "Greta Thunberg"
    },
    {
      "question": "Who is the Nobel Peace Prize laureate known for her advocacy for education and women's rights in Pakistan, surviving a Taliban assassination attempt?",
      "options": ["Aung San Suu Kyi", "Shirin Ebadi", "Benazir Bhutto", "Malala Yousafzai"],
      "correctAnswer": "Malala Yousafzai"
    },
    {
      "question": "Which civil rights leader is best known for his role in the American civil rights movement, advocating nonviolent civil disobedience?",
      "options": ["Nelson Mandela", "Martin Luther King Jr.", "Mahatma Gandhi", "Rosa Parks"],
      "correctAnswer": "Martin Luther King Jr."
    },
    {
      "question": "What human rights advocate and former President of Ireland became the United Nations High Commissioner for Human Rights?",
      "options": ["Mary Robinson", "Ellen Johnson Sirleaf", "Golda Meir", "Michelle Bachelet"],
      "correctAnswer": "Mary Robinson"
    },
    {
      "question": "Who is a leading advocate for gender equality, known for her work with the Malala Fund and as the youngest-ever Nobel Prize laureate?",
      "options": ["Emma Watson", "Malala Yousafzai", "Ellen DeGeneres", "Michelle Obama"],
      "correctAnswer": "Malala Yousafzai"
    }
    // Add more questions as needed
  ];

  const handleAnswer = (answer) => {
    setUserAnswers([...userAnswers, answer]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResult(false);
    setScore(0);
  };

  const calculateScore = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
  };

  return (
    <>
    <div className="quiz-container">
		<div className="head">
		<img src={logo} alt="" />
		<h1>
			Adhikaar
		</h1>
		</div>
      {showResult ? (
        <div className="result-container">
          <h2>Quiz completed!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <ul className="result-list">
            {questions.map((question, index) => (
              <li key={index} className="result-item">
                {question.question} - Your answer: {userAnswers[index]}
                {userAnswers[index] === question.correctAnswer ? (
                  <span className="correct-answer"> (Correct)</span>
                ) : (
                  <span className="wrong-answer"> (Wrong, correct answer: {question.correctAnswer})</span>
                )}
              </li>
            ))}
          </ul>
          <button className="restart-button" onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      ) : (
        <div className="question-container">
          <h2 className="question">{questions[currentQuestion].question}</h2>
          <ul className="options-list">
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index} className="option" onClick={() => handleAnswer(option)}>
                {option}
              </li>
            ))}
          </ul>
		  <div className="circle">
			
		  </div>
        </div>
      )}
     
    </div>
    <Navbar />
    </>
  );
};

export default Quiz;
