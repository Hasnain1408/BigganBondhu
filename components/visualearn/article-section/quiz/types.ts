export interface Question {
  question: { en: string; bn: string };
  options: { en: string; bn: string }[];
  explanation: { en: string; bn: string };
  answer: number;
}

export interface QuizContent {
  title: { en: string; bn: string };
  subtitle: { en: string; bn: string };
  questions: Question[];
}

export interface QuizTexts {
  title: string;
  subtitle: string;
  question: string;
  of: string;
  nextQuestion: string;
  prevQuestion: string;
  submit: string;
  showExplanation: string;
  hideExplanation: string;
  explanation: string;
  correct: string;
  incorrect: string;
  score: string;
  finalScore: string;
  excellent: string;
  good: string;
  needsPractice: string;
  retryQuiz: string;
  timeLeft: string;
  streak: string;
  bestStreak: string;
  seconds: string;
}

export type Language = "en" | "bn";

// Text localization function
export const getQuizTexts = (lang: Language): QuizTexts => {
  return lang === "bn" ? {
    title: "ভেক্টর উপাংশ কুইজ",
    subtitle: "আপনার ভেক্টর জ্ঞান পরীক্ষা করুন",
    question: "প্রশ্ন",
    of: "এর",
    nextQuestion: "পরবর্তী প্রশ্ন",
    prevQuestion: "পূর্ববর্তী প্রশ্ন",
    submit: "জমা দিন",
    showExplanation: "ব্যাখ্যা দেখুন",
    hideExplanation: "ব্যাখ্যা লুকান",
    explanation: "ব্যাখ্যা:",
    correct: "সঠিক!",
    incorrect: "ভুল!",
    score: "স্কোর",
    finalScore: "চূড়ান্ত স্কোর",
    excellent: "চমৎকার!",
    good: "ভাল!",
    needsPractice: "আরো অনুশীলন প্রয়োজন",
    retryQuiz: "আবার চেষ্টা করুন",
    timeLeft: "বাকি সময়",
    streak: "ধারাবাহিক সঠিক",
    bestStreak: "সেরা ধারা",
    seconds: "সেকেন্ড"
  } : {
    title: "Vector Components Quiz",
    subtitle: "Test your vector knowledge",
    question: "Question",
    of: "of",
    nextQuestion: "Next Question",
    prevQuestion: "Previous Question",
    submit: "Submit Answer",
    showExplanation: "Show Explanation",
    hideExplanation: "Hide Explanation",
    explanation: "Explanation:",
    correct: "Correct!",
    incorrect: "Incorrect!",
    score: "Score",
    finalScore: "Final Score",
    excellent: "Excellent!",
    good: "Good job!",
    needsPractice: "Needs more practice",
    retryQuiz: "Retry Quiz",
    timeLeft: "Time Left",
    streak: "Streak",
    bestStreak: "Best Streak",
    seconds: "seconds"
  };
};