"use client";

import { useState } from "react";
import { supabase } from "../../../supabaseClient";
import clsx from "clsx";
import { useSearchParams } from 'next/navigation';

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export default function NewSubTopicPage() {
    const [title, setTitle] = useState("");
    const [design, setDesign] = useState("house1");
    const [colour, setColour] = useState("text-black");
    const [error, setError] = useState("");

    const searchParams = useSearchParams();
    const topic = searchParams.get('topic');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !design || !colour) {
            setError("All fields are required.");
            return;
        }
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;

        await fetch(backendURL + "/topic/subtopic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                topic,
                title, //subtopic title
                design,
                colour,
            }),
        }).then(async (res) => {
            console.log(res.status);
        });

        return;
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {error && <div className="text-red-500 text-sm">{error}</div>}

            <form
                className="flex flex-col items-center justify-center m-8"
                onSubmit={handleSubmit}
            >
                <label htmlFor="title">
                    Title:
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </label>
                <label htmlFor="design">
                    Design:
                    <select
                        id="design"
                        name="design"
                        onChange={(e) => setDesign(e.target.value)}
                        defaultValue="house1"
                    >
                        <option value="house1">House</option>
                        <option value="igloo">Igloo</option>
                    </select>
                </label>
                <label htmlFor="colour">
                    Colour:
                    <select
                        id="design"
                        name="design"
                        onChange={(e) => setColour(e.target.value)}
                        className={clsx(colour)}
                        defaultValue="text-black"
                    >
                        <option value="text-black" className="text-black">
                            Black
                        </option>
                        <option value="text-blue-500" className="text-blue-500">
                            Blue
                        </option>
                        <option value="text-red-500" className="text-red-500">
                            Red
                        </option>
                    </select>
                </label>
                <button>Create New Subtopic</button>
            </form>
        </div>
    );
}
