export default async function NewSubtopicPage({
    params,
}: {
    params: Promise<{ topic_name: string }>;
}) {
    const { topic_name } = await params;
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                {topic_name} - New Subtopic
            </h1>
            <p className="text-center">New subtopic content goes here</p>
        </div>
    );
}
