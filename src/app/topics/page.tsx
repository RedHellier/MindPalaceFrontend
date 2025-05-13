"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
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
            <ul className="">
                {topics.map((topic: UserTopic) => (
                    <li key={topic.id} className="ml-5">
                        {topic.topics.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
