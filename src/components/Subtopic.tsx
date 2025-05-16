import { useRouter } from "next/navigation";
import Image from "next/image";
import house1 from "@/assets/house1.jpg";
import igloo from "@/assets/igloo.jpg";
import square from "@/assets/square.jpg";

interface SubtopicProps {
    title: string;
    topicTitle : string;
    design: string;
    colour: string;
}

const Subtopic = (props: SubtopicProps) => {
    const router = useRouter();
    const { title, topicTitle, design, colour } = props;

    const handleClick = (page: string) => {

        alert("to implement getting cards or creating cards for existing subtopic");
        //implement bringing up cards here.
        router.push(`/${page}`);
    };
    return (
        <div className="flex flex-col items-center justify-center m-8">
            <button
                className="hover:cursor-pointer"
                onClick={
                    
                    () => 
                        {
                            if (title !== "new_subtopic")
                            {
                                handleClick(title)
                            }
                            else
                            {
                                
                                router.push(`/subtopics/${title}?topic=${topicTitle}`);
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

export default Subtopic;
