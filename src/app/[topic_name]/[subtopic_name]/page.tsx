"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import Subtopic from "@/components/Subtopic";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;
import { useParams } from "next/navigation";

export default function Quiz()
{
   const [cardsWithAnswers, setCardsWithAnswers] = useState([]);
    
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
            console.log(data);
            //setSubtopics(data);
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
            <p className="text-center">Quiz content goes here</p>
        </div>
    );
}
