import { useRouter } from "next/navigation";
import Image from "next/image";
import house1 from "@/assets/house1.jpg";
import igloo from "@/assets/igloo.jpg";
import square from "@/assets/square.jpg";

interface TopicProps {
    title: string;
    design: string;
    colour: string;
}

const Topic = (props: TopicProps) => {
    const router = useRouter();
    const { title, design, colour } = props;
    console.log(design);

    const handleClick = (title: string) => {
        if (title !== "new_topic") 
        {
            router.push(`/subtopics?topic=${encodeURIComponent(title)}`);
        } 
        else 
        {
            router.push(`/${title}`);
        }
    };
    return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center space-y-4 w-60">
            <button
                className="hover:cursor-pointer"
                onClick={() => handleClick(title) }
            >
                <Image
                    src={
                        design === "house1"
                            ? house1
                            : design === "igloo"
                            ? igloo
                            : square
                    }
                    width="200"
                    height="300"
                    alt={`${title} image`}
                    className="rounded-lg"
                ></Image>
                <h1 className={`mt-2 text-center text-lg font-semibold text-gray-700 ${colour}`}>
                    {title.replace("_", " ")}
                </h1>
            </button>
        </div>
    );
};

export default Topic;
