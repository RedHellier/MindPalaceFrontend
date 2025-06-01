"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import { useParams } from "next/navigation";
import CardViewer from "@/components/CardViewer";
import { CardWithAnswers } from "@/components/CardViewer";
import BackButton from "@/components/BackButton";
import { displayName } from "@/lib/utils";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export default function Quiz() {
    const [subtopicExists, setSubtopicExists] = useState<boolean>(true);
    const [chosenCards, setChosenCards] = useState<CardWithAnswers[]>([]);

    let cardsWithAnswers: CardWithAnswers[] = [];
    const { topic_name, subtopic_name } = useParams<{
        topic_name: string;
        subtopic_name: string;
    }>();

    const getTokenandSetHeaders = async () => {
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;

        const getParams = new URLSearchParams();
        getParams.append("topic", topic_name);
        getParams.append("subtopic", subtopic_name);

        return {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            params: getParams,
        };
    };

    const doesSubtopicExist: () => Promise<boolean> = async () => {
        const { headers, params } = await getTokenandSetHeaders();

        const data: { exists: boolean } = await fetch(
            `${backendURL}/subtopic/exists?${params}`,
            {
                headers: headers,
            },
        )
            .then(async (res) => {
                return await res.json();
            })
            .catch((error) => {
                console.error("Error checking subtopic existence:", error);
                return false; // Assume subtopic does not exist if there's an error})
            });

        return data.exists;
    };

    const getCards = async () => {
        const { headers, params } = await getTokenandSetHeaders();

        const data = await fetch(`${backendURL}/card?${params}`, {
            headers: headers,
        }).then(async (res) => {
            return await res.json();
        });

        if (data && data.length > 0) {
            cardsWithAnswers = data as CardWithAnswers[];

            //TODO - develop choosing cards:
            //-- randomly
            // -- unsolved cards (you need to consult mastery table or join with the mastery table)
            // - more options?
        } else {
            //GENERATE new cards and set cardsWithAnswers to them.
            const data = await fetch(`${backendURL}/card`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    topic: topic_name,
                    subtopic: subtopic_name,
                }),
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
            doesSubtopicExist().then((exists) => {
                if (exists) {
                    setSubtopicExists(true);
                    getCards();
                } else {
                    setSubtopicExists(false);
                }
            });
        }
    }, [topic_name, subtopic_name, subtopicExists]);

    return (
        <div>
            <BackButton
                path={"/" + topic_name}
                buttonText={"Back to " + displayName(topic_name)}
            />
            {(subtopicExists && (
                <>
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        {displayName(topic_name)} - {displayName(subtopic_name)}
                    </h1>

                    <CardViewer cards={chosenCards} />
                </>
            )) || (
                <div className="text-center mt-10">
                    <h1 className="text-2xl font-bold text-red-600">
                        Subtopic does not exist!
                    </h1>
                    <p className="text-gray-600 mt-4">
                        Please create the subtopic first.
                    </p>
                </div>
            )}
        </div>
    );
}
