"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import Subtopic from "@/components/Subtopic";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;
import { useSearchParams } from 'next/navigation';


type Subtopic = {
    colour: string;
    created_at: string;
    design: string;
    id: string;
    title: string;
    topic_id: string;
    user_id: string;
};

export default function Subtopics() {
    const [subtopics, setSubtopics] = useState([]);

    const searchParams = useSearchParams();
    const topic = searchParams.get('topic');

    const getSubtopics = async (topic : string) => {
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;

        const data = await fetch(`${backendURL}/topic/subtopic`, {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body : JSON.stringify({
              topic
            })
        }).then(async (res) => {
            return await res.json();
        });
        console.log(data);
        setSubtopics(data);
    };

    useEffect(() => {
        if (topic) {
            getSubtopics(topic);
        }
    }, [topic]);

    return (
        <div>
            <h1>Subtopics Page</h1>
            <div className="flex items-center justify-center h-[500px]">
                {subtopics.map((subtopic: Subtopic) => (
                    <Subtopic
                        key={subtopic.id}
                        title={subtopic.title}
                        design={subtopic.design}
                        colour={subtopic.colour}
                    />
                ))}
                <Subtopic
                    key="0"
                    title="new_subtopic"
                    design="square"
                    colour="text-black"
                />
            </div>
        </div>
    );
}
