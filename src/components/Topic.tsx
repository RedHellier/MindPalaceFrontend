import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";
import { displayName } from "@/lib/utils";
import Canvas from "@/components/Canvas";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

interface TopicProps {
    id: string;
    title: string;
    design: string;
    colour: string;
    refresh: () => void;
}

const Topic = (props: TopicProps) => {
    const router = useRouter();
    const { id, title, design, colour, refresh } = props;

    const handleClick = (title: string) => {
        router.push(`/${title}`);
    };

    const handleDelete = async (id: string) => {
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;

        // Implement delete functionality here
        console.log(`Delete topic with id: ${id}`);
        await fetch(`${backendURL}/topic/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ id }),
        }).then(async (response) => {
            if (!response.ok) {
                const { error } = await response.json();
                console.error("Error deleting topic:", error);
                alert("Failed to delete topic. Please try again.");
            } else {
                const data = await response.json();
                console.log("Topic deleted successfully:", data);
            }
        });

        refresh();
    };

    return (
        <div data-cy="topic-item">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center space-y-4 w-60">
                <button
                    className="hover:cursor-pointer"
                    onClick={() => handleClick(title)}
                >
                    <Canvas image={design} />
                    <h1
                        className={`mt-2 text-center text-lg font-semibold text-gray-700 ${colour}`}
                    >
                        {displayName(title, " ")}
                    </h1>
                </button>
                <button
                    data-cy="delete-topic"
                    className="text-white bg-red-500 px-4 py-2 rounded-xl hover:cursor-pointer"
                    onClick={() => handleDelete(id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Topic;
