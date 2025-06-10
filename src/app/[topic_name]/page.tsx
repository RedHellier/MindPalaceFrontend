"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import Subtopic from "@/components/Subtopic";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useParams } from "next/navigation";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

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
    const [topicExists, setTopicExists] = useState<boolean>(true);
    const [subtopics, setSubtopics] = useState([]);
    const router = useRouter();

    const { topic_name } = useParams<{ topic_name: string }>();

    const getTokenandSetHeaders = async () => {
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;

        const getParams = new URLSearchParams();
        getParams.append("topic", topic_name);

        return {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            params: getParams,
        };
    };

    const doesTopicExist: () => Promise<void> = async () => {
        const { headers, params } = await getTokenandSetHeaders();

        const data: { exists: boolean } = await fetch(
            `${backendURL}/topic/exists?${params}`,
            {
                headers: headers,
            },
        )
            .then(async (res) => {
                return await res.json();
            })
            .catch((error) => {
                console.error("Error checking topic existence:", error);
                setTopicExists(false); // Assume topic does not exist if there's an error
            });

        setTopicExists(data.exists);
    };

    const getSubtopics = async () => {
        const { headers, params } = await getTokenandSetHeaders();

        const data = await fetch(`${backendURL}/subtopic?${params}`, {
            headers: headers,
        }).then(async (res) => {
            return await res.json();
        });

        if (data && data.length > 0) {
            setSubtopics(data);
        }
    };

    useEffect(() => {
        doesTopicExist();
        if (topic_name && topicExists) {
            getSubtopics();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topic_name, topicExists]);

    return (
        <div>
            <BackButton path="/topics" buttonText="Back to Topics" />
            {(topicExists && (
                <div className="min-h-screen bg-gray-50 py-10 px-4 font-[family-name:var(--font-geist-sans)]">
                    <div className="max-w-6xl mx-auto flex flex-col items-center justify-around">
                        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                            Choose a Subtopic
                        </h1>
                        {subtopics && (
                            <Carousel
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                                className="w-full min-w-sm"
                            >
                                <CarouselContent className="-ml-1">
                                    {subtopics.map((subtopic: Subtopic) => (
                                        <CarouselItem
                                            key={subtopic.id}
                                            className="md:basis-1/2 lg:basis-1/3 flex justify-center items-center p-4"
                                        >
                                            <Subtopic
                                                key={subtopic.id}
                                                id={subtopic.id}
                                                topicTitle={topic_name}
                                                title={subtopic.title}
                                                design={subtopic.design}
                                                colour={subtopic.colour}
                                                refresh={getSubtopics}
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        )}
                        <button
                            onClick={() =>
                                router.push(`/${topic_name}/new subtopic`)
                            }
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 mt-8"
                        >
                            Create New Subtopic
                        </button>
                    </div>
                </div>
            )) || (
                <div className="min-h-screen bg-gray-50 py-10 px-4 font-[family-name:var(--font-geist-sans)]">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                            Topic Not Found
                        </h1>
                        <p className="text-gray-600 mt-4">
                            Please create the topic first.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
