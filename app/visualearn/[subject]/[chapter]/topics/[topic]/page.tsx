import type { Metadata } from "next"
import { notFound } from "next/navigation"
import TopicContent from "@/components/visualearn/topic-content"
import TopicNavigation from "@/components/visualearn/topic-navigation"

interface TopicPageProps {
  params: {
    subject: string
    chapter: string
    topic: string
  }
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { subject, chapter, topic } = params;
  const topicData = getTopicData(subject, chapter, topic);

  if (!topicData) {
    return {
      title: "Topic Not Found",
    }
  }

  return {
    title: `${topicData.title} - ${topicData.chapter} - ${topicData.subject}`,
    description: topicData.description,
  }
}

function getTopicData(subjectId: string, chapterId: string, topicId: string) {
  // Default fallback for demo purposes
  return {
    id: topicId,
    subject: subjectId.charAt(0).toUpperCase() + subjectId.slice(1),
    chapter: chapterId.charAt(0).toUpperCase() + chapterId.slice(1),
    title: topicId.charAt(0).toUpperCase() + topicId.slice(1).replace(/-/g, " "),
    description: `Topic on ${topicId} in ${chapterId} of ${subjectId}`,
    content: "Content for this topic will be available soon.",
    hasSimulation: false,
    hasQuiz: false,
    nextTopic: null,
    prevTopic: null,
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { subject, chapter, topic } = params;
  const topicData = getTopicData(subject, chapter, topic);

  if (!topicData) {
    notFound();
  }

  return (
    <div className="container py-8">
      <TopicNavigation subject={subject} chapter={chapter} topic={topicData} />
      <TopicContent subject={subject} chapter={chapter} topic={topicData} />
    </div>
  );
}
