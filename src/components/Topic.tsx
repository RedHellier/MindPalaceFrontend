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
        router.push(`/subtopics?topic=${encodeURIComponent(title)}`);
    };
    return (
        <div className="flex flex-col items-center justify-center m-8">
            <button
                className="hover:cursor-pointer"
                onClick={
                    
                    () => 
                        {
                            if (title !== "new_topic")
                            {
                                handleClick(title)
                            }
                            else
                            {
                                router.push(`/${title}`);
                            }
                        }
                }
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
                ></Image>
                <h1 className={colour}>{title.replace("_", " ")}</h1>
            </button>
        </div>
    );
};

export default Topic;
