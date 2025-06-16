import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";
import { displayName } from "@/lib/utils";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL!;

interface SubtopicProps {
    id: string;
    title: string;
    topicTitle: string;
    design: string;
    colour: string;
    refresh: (topicTitle: string) => void;
}

const Subtopic = (props: SubtopicProps) => {
    const router = useRouter();
    const { id, title, topicTitle, colour, refresh } = props;

    const handleClick = (title: string) => {
        router.push(`/${topicTitle}/${title}`);
    };

    const handleDelete = async (id: string) => {
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;

        // Implement delete functionality here
        console.log(`Delete subtopic with id: ${id}`);
        await fetch(`${backendURL}/subtopic/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ id }),
        });

        refresh(topicTitle);
    };

    return (
        <div data-cy="subtopic-item">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center space-y-4 w-60">
                <button
                    className="hover:cursor-pointer"
                    onClick={() => handleClick(title)}
                >
                    <h1
                        className={`mt-2 text-center text-lg font-semibold text-gray-700 ${colour}`}
                    >
                        {displayName(title, " ")}
                    </h1>
                </button>
                <button
                    data-cy="delete-subtopic"
                    className="text-white bg-red-500 px-4 py-2 rounded-xl hover:cursor-pointer"
                    onClick={() => handleDelete(id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Subtopic;
