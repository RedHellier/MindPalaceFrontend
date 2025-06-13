import { useRouter } from "next/navigation";
import { displayName } from "@/lib/utils";

interface NewPopUpProps {
    backTitle?: string;
    toNewTitle: string;
}

const NewPopUp: React.FC<NewPopUpProps> = ({ backTitle, toNewTitle }) => {
    const router = useRouter();

    const handleClick = (path: string) => {
        router.push(path);
    };

    return (
        <div className="fixed inset-0 bg-gray-800/20 flex items-center justify-center z-50">
            <div className="relative w-100 h-40 bg-white rounded-2xl shadow-md p-6 space-y-5">
                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                    Successfully Created New {backTitle ? "Subt" : "T"}
                    opic: {displayName(toNewTitle)}
                </h1>
                <button
                    data-cy="popup-back-to-topics"
                    onClick={() =>
                        handleClick(backTitle ? `/${backTitle}` : "/topics")
                    }
                    className="absolute bottom-0 left-0 m-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                    {"Back To " +
                        (backTitle ? displayName(backTitle) : "Topics")}
                </button>
                <button
                    data-cy="goto-topic"
                    onClick={() => handleClick(toNewTitle)}
                    className="absolute bottom-0 right-0 m-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                    {"Go To " + displayName(toNewTitle)}
                </button>
            </div>
        </div>
    );
};

export default NewPopUp;
