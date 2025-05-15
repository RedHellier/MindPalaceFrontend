"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import Topic from "@/components/Topic";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

type UserTopic = {
    colour: string;
    design: string;
    id: string;
    topic_id: string;
    topics: {
        created_at: string;
        id: string;
        title: string;
    };
    user_id: string;
};

export default function Topics() {
    const [topics, setTopics] = useState([]);

    const getTopics = async () => {
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;

        const data = await fetch(`${backendURL}/topic/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(async (res) => {
            return await res.json();
        });
        console.log(data);
        setTopics(data);
    };

    useEffect(() => {
        getTopics();
    }, []);

    return (
        <div>
            <h1>Topics Page</h1>
            <div className="flex items-center justify-center h-[500px]">
                {topics.map((topic: UserTopic) => (
                    <Topic
                        key={topic.id}
                        title={topic.topics.title}
                        design={topic.design}
                        colour={topic.colour}
                    />
                ))}
            </div>
        </div>
    );
}
