import { useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import house1 from "@/assets/house1.jpg";
import igloo from "@/assets/igloo.jpg";

interface TopicProps {
    title: string;
    design: string;
    colour: string;
}

const Topic = (props: TopicProps) => {
    const router = useRouter();
    const { title, design, colour } = props;
    console.log(design);

    const handleClick = (page: string) => {
        router.push(`/${page}`);
    };
    return (
        <div className="flex flex-col items-center justify-center">
            <a href={`/${title}`}>
                <Image
                    src={design === "house1" ? house1 : igloo}
                    width="200"
                    height="300"
                    alt="house1"
                ></Image>
            </a>
            <button
                onClick={() => handleClick(title)}
                className={clsx(
                    "flex flex-col items-center w-1/4 p-4 m-2 bg-white rounded-lg hover:cursor-pointer",
                    colour,
                )}
            >
                <h1>{props.title}</h1>
            </button>
        </div>
    );
};

export default Topic;
