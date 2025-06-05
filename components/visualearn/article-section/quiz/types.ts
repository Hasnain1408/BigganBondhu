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
  perfectAnswers: string;
  currentStreak: string;
  timeBonus: string;
}

export type Language = "en" | "bn";

// Enhanced text localization with more aesthetic phrasing
export const getQuizTexts = (lang: Language): QuizTexts => {
  return lang === "bn" ? {
    title: "জ্ঞান যাচাই",
    subtitle: "আপনার দক্ষতা পরিমাপ করুন",
    question: "প্রশ্ন নং",
    of: "/",
    nextQuestion: "পরবর্তী প্রশ্ন ➔",
    prevQuestion: "← পূর্ববর্তী প্রশ্ন",
    submit: "উত্তর নিশ্চিত করুন",
    showExplanation: "ব্যাখ্যা দেখুন ✨",
    hideExplanation: "ব্যাখ্যা গোপন করুন",
    explanation: "🧠 ব্যাখ্যা:",
    correct: "সঠিক উত্তর! 🎉",
    incorrect: "ভুল উত্তর! 💡",
    score: "অর্জিত নম্বর",
    finalScore: "চূড়ান্ত ফলাফল",
    excellent: "অসাধারণ দক্ষতা! 🌟",
    good: "ভালো হয়েছে! 👍",
    needsPractice: "আরও অনুশীলন প্রয়োজন 📚",
    retryQuiz: "আবার চেষ্টা করুন 🔄",
    timeLeft: "সময় অবশিষ্ট",
    streak: "ধারাবাহিকতা",
    bestStreak: "সেরা ধারাবাহিকতা",
    seconds: "সেকেন্ড",
    perfectAnswers: "নিখুঁত উত্তর",
    currentStreak: "বর্তমান ধারা",
    timeBonus: "দ্রুত উত্তর বোনাস"
  } : {
    title: "Knowledge Challenge",
    subtitle: "Measure Your Mastery",
    question: "Question",
    of: "/",
    nextQuestion: "Next Question ➔",
    prevQuestion: "← Previous Question",
    submit: "Confirm Answer",
    showExplanation: "Show Explanation ✨",
    hideExplanation: "Hide Explanation",
    explanation: "🧠 Explanation:",
    correct: "Correct! 🎉",
    incorrect: "Incorrect! 💡",
    score: "Score",
    finalScore: "Final Result",
    excellent: "Mastery Achieved! 🌟",
    good: "Well Done! 👍",
    needsPractice: "Needs Practice 📚",
    retryQuiz: "Try Again 🔄",
    timeLeft: "Time Remaining",
    streak: "Streak",
    bestStreak: "Best Streak",
    seconds: "seconds",
    perfectAnswers: "Perfect Answers",
    currentStreak: "Current Streak",
    timeBonus: "Quick Answer Bonus"
  };
};

