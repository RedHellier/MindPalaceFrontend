"use client";

import React, { useState } from "react";

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
              correct_answer: string;
              id: string;
          }
        | {
              card_id: string;
              correct_index: number;
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

    if (cards.length === 0) {
        return <p className="text-center text-gray-500">No cards available.</p>;
    }

    const currentCard = cards[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, cards.length - 1));
        setSelectedOptionIndex(null); // Reset selection for next card
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
        setSelectedOptionIndex(null); // Reset selection for previous card
    };

    const handleOptionClick = (index: number) => {
        if (selectedOptionIndex === null) {
            setSelectedOptionIndex(index);
        }
    };

    const isSelectAnswer = (
        answer: CardWithAnswers["answers"]
    ): answer is { card_id: string; correct_index: number; id: string; options: string[] } => {
        return "options" in answer && "correct_index" in answer;
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md font-[family-name:var(--font-geist-sans)]">
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Question {currentIndex + 1} of {cards.length}
                </h2>
                <p className="text-gray-800">{currentCard.question}</p>
            </div>

            {currentCard.answer_type === "free_text" && (
                <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm text-gray-600">Answer: </p>
                </div>
            )}

            {currentCard.answer_type === "select" && isSelectAnswer(currentCard.answers) && (
                <div className="mt-3 space-y-2">
                    {currentCard.answers.options.map((option, index) => {
                        let borderColor = "border-gray-300";

                        if (selectedOptionIndex !== null) {
                            if (index === selectedOptionIndex) {
                                borderColor =
                                    index === currentCard.answers.correct_index
                                        ? "border-green-500"
                                        : "border-red-500";
                            }
                        }

                        return (
                            <div
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                className={`p-2 rounded border ${borderColor} bg-gray-50 cursor-pointer hover:bg-gray-100 transition duration-150`}
                            >
                                {option}
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="flex justify-between mt-6 space-x-4">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-200 disabled:bg-blue-200 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentIndex === cards.length - 1}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-200 disabled:bg-blue-200 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CardViewer;