"use client";

import React, { useState, useEffect } from "react";

type CardWithAnswers = {
    answer_type: string;
    created_at: string;
    id: string;
    level: number;
    question: string;
    subtopic_id: string;
    answers:
        | {
              card_id: string;
              correct_answer: string; // For free_text
              id: string;
          }
        | {
              card_id: string;
              correct_index: number; // For select
              id: string;
              options: string[];
          };
};

interface CardViewerProps {
    cards: CardWithAnswers[];
}

const CardViewer: React.FC<CardViewerProps> = ({ cards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
    const [showOnlyCorrectAnswer, setShowOnlyCorrectAnswer] = useState(false); // For "Show Answer" functionality

    if (cards.length === 0) {
        return <p className="text-center text-gray-500">No cards available.</p>;
    }

    const currentCard = cards[currentIndex];

    // Reset state when card changes
    useEffect(() => {
        setSelectedOptionIndex(null);
        setShowOnlyCorrectAnswer(false);
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            // setSelectedOptionIndex(null); // Already handled by useEffect
            // setShowOnlyCorrectAnswer(false); // Already handled by useEffect
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            // setSelectedOptionIndex(null); // Already handled by useEffect
            // setShowOnlyCorrectAnswer(false); // Already handled by useEffect
        }
    };

    const handleOptionClick = (index: number) => {
        // Allow selection only if an option hasn't been selected yet OR if "Show Answer" hasn't been activated
        if (selectedOptionIndex === null && !showOnlyCorrectAnswer) {
            setSelectedOptionIndex(index);
        }
    };

    const handleShowAnswer = () => {
        setShowOnlyCorrectAnswer(true);
    };

    const isSelectAnswer = (
        answer: CardWithAnswers["answers"]
    ): answer is { card_id: string; correct_index: number; id: string; options: string[] } => {
        return "options" in answer && "correct_index" in answer;
    };

    let isNextButtonDisabled = currentIndex === cards.length - 1;
    let showShowAnswerButton = false;

    if (currentCard.answer_type === "select" && isSelectAnswer(currentCard.answers)) {
        if (selectedOptionIndex === null) {
            isNextButtonDisabled = true; // 1. next button is disabled until user selected an answer
        } else {
            const isCorrect = selectedOptionIndex === currentCard.answers.correct_index;
            if (isCorrect) {
                // 2. if the user selected the correct answer (border turns green) enable next button.
                // isNextButtonDisabled is already false unless it's the last card
            } else {
                // 3. if the user selected the wrong answer
                isNextButtonDisabled = true; // Next stays disabled
                if (!showOnlyCorrectAnswer) {
                    showShowAnswerButton = true; // enable a button called "show answer"
                } else {
                    // After "Show Answer" is clicked, next should be enabled
                    isNextButtonDisabled = currentIndex === cards.length - 1;
                }
            }
        }
    } else if (currentCard.answer_type === "free_text") {
        // For free_text, let's assume "Next" is enabled by default unless it's the last card.
        // If free_text also needs an interaction (e.g., reveal answer), this logic would change.
    }


    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md font-[family-name:var(--font-geist-sans)]">
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Question {currentIndex + 1} of {cards.length}
                </h2>
                <p className="text-gray-800">{currentCard.question}</p>
            </div>

            {currentCard.answer_type === "free_text" && (
                <div className="bg-gray-100 p-3 rounded-md mt-3">
                    <p className="text-sm text-gray-600">Answer: </p>
                    {/* For free_text, you might want a button to reveal the answer */}
                    {/* And then currentCard.answers.correct_answer would be displayed */}
                    <p className="text-gray-800 pt-1">
                        {(currentCard.answers as { correct_answer: string }).correct_answer}
                    </p>
                </div>
            )}

            {currentCard.answer_type === "select" && isSelectAnswer(currentCard.answers) && (
                <div className="mt-3 space-y-2">
                    {currentCard.answers.options.map((option, index) => {
                        if (showOnlyCorrectAnswer && index !== currentCard.answers.correct_index) {
                            return null; // Hide wrong options if "Show Answer" was clicked
                        }

                        let borderColor = "border-gray-300";
                        let textColor = "text-gray-800";
                        let bgColor = "bg-gray-50";
                        let hoverBgColor = "hover:bg-gray-100";

                        if (selectedOptionIndex !== null && isSelectAnswer(currentCard.answers)) {
                            if (index === selectedOptionIndex ) {
                                if (index === currentCard.answers.correct_index) {
                                    borderColor = "border-green-500";
                                    textColor = "text-green-700";
                                    bgColor = "bg-green-50";
                                    hoverBgColor = "hover:bg-green-100";
                                } else {
                                    borderColor = "border-red-500";
                                    textColor = "text-red-700";
                                    bgColor = "bg-red-50";
                                    hoverBgColor = "hover:bg-red-100";
                                }
                            } else if (showOnlyCorrectAnswer && index === currentCard.answers.correct_index) {
                                // Ensure correct answer is styled green when specifically shown
                                borderColor = "border-green-500";
                                textColor = "text-green-700";
                                bgColor = "bg-green-50";
                            }
                        }
                        // If showing only correct answer, and this is it, ensure it's styled as correct
                        if (showOnlyCorrectAnswer && isSelectAnswer(currentCard.answers) && index === currentCard.answers.correct_index) {
                            borderColor = "border-green-500";
                            textColor = "text-green-700";
                            bgColor = "bg-green-50";
                            hoverBgColor = "hover:bg-green-100"; // No hover if it's the only one shown? Or keep it.
                        }


                        return (
                            <div
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                className={`p-3 rounded-md border-2 ${borderColor} ${bgColor} ${textColor} ${ (selectedOptionIndex === null && !showOnlyCorrectAnswer) ? 'cursor-pointer ' + hoverBgColor : 'cursor-default'} transition duration-150`}
                            >
                                {option}
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="flex justify-between mt-6 space-x-2">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex-1 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-200 disabled:bg-blue-300 disabled:text-gray-100 disabled:cursor-not-allowed"
                >
                    Previous
                </button>

                {showShowAnswerButton && currentCard.answer_type === "select" && (
                    <button
                        onClick={handleShowAnswer}
                        className="flex-1 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md shadow hover:bg-yellow-600 transition duration-200"
                    >
                        Show Answer
                    </button>
                )}
                {/* Placeholder for spacing if Show Answer button is not visible to maintain layout consistency */}
                {!showShowAnswerButton && currentCard.answer_type === "select" && (
                     <div className="flex-1"></div> // This takes up space
                )}


                <button
                    onClick={handleNext}
                    disabled={isNextButtonDisabled}
                    className="flex-1 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-200 disabled:bg-blue-300 disabled:text-gray-100 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CardViewer;