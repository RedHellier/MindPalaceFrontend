"use client";

import BackButton from "@/components/BackButton";
import NewSubtopicForm from "@/components/NewSubtopicForm";
import { displayName } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function NewSubtopicPage() {
    const { topic_name } = useParams<{ topic_name: string }>();

    return (
        <>
            <BackButton
                path={"/" + topic_name}
                buttonText={"Back to " + displayName(topic_name)}
            />
            <NewSubtopicForm topicTitle={topic_name} />
        </>
    );
}
