import { useRouter } from "next/navigation";

interface BackButtonProps {
    path: string;
    buttonText?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ path, buttonText }) => {
    const router = useRouter();

    const handleBack = () => {
        router.push(path);
    };

    return (
        <button
            onClick={handleBack}
            className="absolute top-0 left-0 m-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
            {buttonText || "Back"}
        </button>
    );
};

export default BackButton;
