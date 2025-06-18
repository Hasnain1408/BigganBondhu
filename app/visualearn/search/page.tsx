import { Suspense } from "react"


const topics = [
  { id: 1, title: "Motion", description: "Physics topic about movement." },
  { id: 2, title: "Photosynthesis", description: "Biology topic about plants." },
  // ...more topics
]


function SearchResults({ query }: { query: string }) {
  const results = topics.filter(topic =>
    topic.title.toLowerCase().includes(query.toLowerCase())
  )

  if (!results.length) {
    return <p>No results found for "{query}".</p>
  }

  return (
    <ul>
      {results.map(topic => (
        <li key={topic.id}>
          <h3>{topic.title}</h3>
          <p>{topic.description}</p>
        </li>
      ))}
    </ul>
  )
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