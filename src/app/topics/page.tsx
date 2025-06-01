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
        setTopics(data);
    };

    useEffect(() => {
        getTopics();
    }, [topics]);

    return (
        <div>
            <div className="min-h-screen bg-gray-50 py-10 px-4 font-[family-name:var(--font-geist-sans)]">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        Choose a Topic
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
                        {topics.map((topic: UserTopic) => (
                            <Topic
                                key={topic.id}
                                id={topic.id}
                                title={topic.topics.title}
                                design={topic.design}
                                colour={topic.colour}
                                refresh={getTopics}
                            />
                        ))}
                        <Topic
                            key="0"
                            id="0"
                            title="new_topic"
                            design="square"
                            colour="text-black"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
