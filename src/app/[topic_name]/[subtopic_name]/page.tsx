"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;
import { useParams } from "next/navigation";
import CardViewer from "@/components/CardViewer";
import { CardWithAnswers } from "@/components/CardViewer"; 


export default function Quiz()
{
    const [chosenCards, setChosenCards] = useState<CardWithAnswers[]>([]);

    let cardsWithAnswers : CardWithAnswers[] = [];
    const { topic_name, subtopic_name } = useParams<{ topic_name: string, subtopic_name : string }>();

    const getCards = async (topicTitle: string, subtopicTitle : string) => {
            const { data: sessionData } = await supabase.auth.getSession();
            const accessToken = sessionData.session?.access_token;
    
            const getParams = new URLSearchParams();
            getParams.append("topic", topicTitle);
            getParams.append("subtopic", subtopicTitle);
    
            const data = await fetch(`${backendURL}/card?${getParams}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then(async (res) => {
                return await res.json();
            });

            if (data && data.length > 0)
            {
                cardsWithAnswers = data as CardWithAnswers[];

                //TODO - develop choosing cards:
                        //-- randomly
                        // -- unsolved cards (you need to consult mastery table or join with the mastery table)
                        // - more options?
            }
            else
            {
                //GENERATE new cards and set cardsWithAnswers to them.
                const data = await fetch(`${backendURL}/card`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ topic : topicTitle , subtopic : subtopicTitle }),
                }).then(async (res) => {
                    return await res.json();
                });

                cardsWithAnswers = data as CardWithAnswers[];
            }

            //for starters, randomly select 10 cards out of all cards.
            const shuffled = [...cardsWithAnswers].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 10);

            setChosenCards(selected);
        };
    
        useEffect(() => {
            if (topic_name && subtopic_name) {
                getCards(topic_name, subtopic_name);
            }
        }, [topic_name, subtopic_name]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                {topic_name} - {subtopic_name}
            </h1>

            <CardViewer cards={chosenCards} />

        </div>
    );
}
