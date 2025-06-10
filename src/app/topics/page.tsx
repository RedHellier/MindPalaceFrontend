"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
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
    const router = useRouter();

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
                <div className="max-w-6xl mx-auto flex flex-col items-center justify-around">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        Choose a Topic
                    </h1>
                    {topics && (
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full min-w-sm"
                        >
                            <CarouselContent className="-ml-1">
                                {topics.map((topic: UserTopic) => (
                                    <CarouselItem
                                        key={topic.id}
                                        className="md:basis-1/2 lg:basis-1/3 flex justify-center items-center p-4"
                                    >
                                        <Topic
                                            key={topic.id}
                                            id={topic.id}
                                            title={topic.topics.title}
                                            design={topic.design}
                                            colour={topic.colour}
                                            refresh={getTopics}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    )}
                    <button
                        onClick={() => router.push("/new topic")}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 mt-8"
                    >
                        Create New Topic
                    </button>
                </div>
            </div>
        </div>
    );
}
