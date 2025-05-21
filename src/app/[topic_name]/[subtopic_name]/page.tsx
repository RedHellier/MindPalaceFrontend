export default async function Quiz({
    params,
}: {
    params: Promise<{ topic_name: string; subtopic_name: string }>;
}) {
    const { topic_name, subtopic_name } = await params;
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                {topic_name} - {subtopic_name}
            </h1>
            <p className="text-center">Quiz content goes here</p>
        </div>
    );
}
