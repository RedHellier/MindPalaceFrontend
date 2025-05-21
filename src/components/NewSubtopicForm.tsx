"use client";

import { useState } from "react";
import { supabase } from "../supabaseClient";
import clsx from "clsx";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

type NewTopicProps = {
    topicTitle: string;
};

export default function NewTopicPage({ topicTitle }: NewTopicProps) {
    const [title, setTitle] = useState("");
    const [design, setDesign] = useState("house1");
    const [colour, setColour] = useState("text-black");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !design || !colour) {
            setError("All fields are required.");
            return;
        }

        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;

        await fetch(`${backendURL}/subtopic`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ topicTitle, title, design, colour }),
        });

        // Optionally reset fields or navigate
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-8 font-[family-name:var(--font-geist-sans)]">
            <form
                onSubmit={handleSubmit}
                className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 space-y-5"
            >
                <h2 className="text-xl font-semibold text-gray-700 text-center">
                    Create a New Subtopic for {topicTitle}
                </h2>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-600 mb-1"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="design"
                        className="block text-sm font-medium text-gray-600 mb-1"
                    >
                        Design
                    </label>
                    <select
                        id="design"
                        value={design}
                        onChange={(e) => setDesign(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="house1">House</option>
                        <option value="igloo">Igloo</option>
                        <option value="square">Square</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="colour"
                        className="block text-sm font-medium text-gray-600 mb-1"
                    >
                        Colour
                    </label>
                    <select
                        id="colour"
                        value={colour}
                        onChange={(e) => setColour(e.target.value)}
                        className={clsx(
                            "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                            colour,
                        )}
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
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-200"
                >
                    Create New Subtopic
                </button>
            </form>
        </div>
    );
}
