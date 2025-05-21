import NewSubtopicForm from "@/components/NewSubtopicForm";

export default async function NewSubtopicPage({
    params,
}: {
    params: Promise<{ topic_name: string }>;
}) {
    const { topic_name } = await params;
    return <NewSubtopicForm topicTitle={topic_name} />;
}
