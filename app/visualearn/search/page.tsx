import TopicContent from "@/components/visualearn/topic-content";
import TopicNavigation from "@/components/visualearn/topic-navigation";
import { Suspense } from "react"





function SearchResults({ query }: { query: string }) {
  const results = TopicContent subject={subject} chapter={chapter} topic={topicData};
  

  // if (!results.length) {
  //   return <p>No results found for "{query}".</p>
  // }

  // TODO: Replace these with actual logic to get the correct subject, chapter, and topicData based on the search query
  const subject = "chemistry";
  const chapter = "reaction";
  const topicData = {
    id: "",
    title: "",
    description: "",
    content: "",
    hasSimulation: false,
    hasQuiz: false,
    nextTopic: null,
    prevTopic: null,
  };

  return (
      <div className="container py-8">
        <TopicNavigation subject={subject} chapter={chapter} topic={topicData} />
        <TopicContent subject={subject} chapter={chapter} topic={topicData} />
      </div>
    );
}

export default function SearchPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  const query = searchParams.q || ""

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults query={query} />
      </Suspense>
    </main>
  )
}