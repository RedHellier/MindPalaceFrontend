"use client";

import { useState } from "react";
import { supabase } from "../../supabaseClient";
import clsx from "clsx";
import BackButton from "@/components/BackButton";
import NewPopUp from "@/components/NewPopUp";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Canvas from "@/components/Canvas";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export default function NewTopicPage() {
    const [title, setTitle] = useState("");
    const [design, setDesign] = useState("000");
    const [colour, setColour] = useState("text-black");
    const [error, setError] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);

    const changeDesignElement = (
        element: "roof" | "windows" | "doors",
        direction: -1 | 1,
    ) => {
        console.log("Change ", element, " by ", direction);
        const elementIndex =
            element === "roof" ? 0 : element === "windows" ? 1 : 2;
        let newRoofIndex: number = Number(design[elementIndex]) + direction;
        newRoofIndex =
            newRoofIndex < 0 ? 2 : newRoofIndex > 2 ? 0 : newRoofIndex;
        const newDesign =
            design.slice(0, elementIndex) +
            newRoofIndex.toString() +
            design.slice(elementIndex + 1);
        setDesign(newDesign);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !design || !colour) {
            setError("All fields are required.");
            return;
        }

        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;

        await fetch(`${backendURL}/topic`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ title, design, colour }),
        }).then(async (response) => {
            if (response.ok) {
                setShowPopUp(true);
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to create subtopic.");
            }
        });

        // Optionally reset fields or navigate
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-8 font-[family-name:var(--font-geist-sans)]">
            <BackButton path="/topics" buttonText="Back to Topics" />
            <form
                data-cy="new-topic-form"
                onSubmit={handleSubmit}
                className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 space-y-5"
            >
                <h2 className="text-xl font-semibold text-gray-700 text-center">
                    Create a New Topic
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
                        data-cy="topic-title"
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="flex flex-col items-center justify-between text-gray-600 mb-4">
                    <Canvas width={250} height={300} design={design}></Canvas>
                    <div className="flex items-center justify-between w-full mt-2">
                        <Button
                            onClick={() => changeDesignElement("roof", -1)}
                            type="button"
                        >
                            <ArrowLeft />
                        </Button>
                        Roof
                        <Button
                            onClick={() => changeDesignElement("roof", 1)}
                            type="button"
                        >
                            <ArrowRight />
                        </Button>
                    </div>
                    <div className="flex items-center justify-between w-full mt-2">
                        <Button
                            onClick={() => changeDesignElement("windows", -1)}
                            type="button"
                        >
                            <ArrowLeft />
                        </Button>
                        Windows
                        <Button
                            onClick={() => changeDesignElement("windows", 1)}
                            type="button"
                        >
                            <ArrowRight />
                        </Button>
                    </div>
                    <div className="flex items-center justify-between w-full mt-2">
                        <Button
                            onClick={() => changeDesignElement("doors", -1)}
                            type="button"
                        >
                            <ArrowLeft />
                        </Button>
                        Doors
                        <Button
                            onClick={() => changeDesignElement("doors", 1)}
                            type="button"
                        >
                            <ArrowRight />
                        </Button>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="colour"
                        className="block text-sm font-medium text-gray-600 mb-1"
                    >
                        Colour
                    </label>
                    <select
                        data-cy="topic-colour"
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
                    data-cy="save-topic-btn"
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-200"
                >
                    Create New Topic
                </button>
            </form>
            {showPopUp && <NewPopUp toNewTitle={title} />}
        </div>
    );
}
