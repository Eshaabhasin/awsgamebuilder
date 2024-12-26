import React, { useState, useEffect } from 'react';
import './Quiz.css';

const TIMER_SECONDS = 30; // Time per question in seconds

const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
    }
];

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(TIMER_SECONDS);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleNextQuestion();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestion]);

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setTimeRemaining(TIMER_SECONDS);
        } else {
            setShowScore(true);
        }
    };

    const handleAnswerClick = (selectedAnswer) => {
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
        handleNextQuestion();
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setTimeRemaining(TIMER_SECONDS);
    };

    return (
        <div className="quiz-container">
            {showScore ? (
                <div className="score-section">
                    <h2>You scored {score} out of {questions.length}</h2>
                    <button onClick={resetQuiz}>Try Again</button>
                </div>
            ) : (
                <div className="question-section">
                    <div className="timer">
                        <div className="timer-bar">
                            <div
                                className="timer-bar-inner"
                                style={{
                                    width: `${(timeRemaining / TIMER_SECONDS) * 100}%`
                                }}
                            ></div>
                        </div>
                        Time remaining: {timeRemaining}s
                    </div>
                    <h2>Question {currentQuestion + 1}/{questions.length}</h2>
                    <div className="question-text">
                        {questions[currentQuestion].question}
                    </div>
                    <div className="answer-options">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerClick(option)}
                                className="answer-button"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz;
