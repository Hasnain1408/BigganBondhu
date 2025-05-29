import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const questions = [
  {
    question: "What is the formula for the range of a projectile?",
    options: [
      "R = (v₀² * sin(2θ)) / g",
      "R = v₀ * t",
      "R = (v₀ * sinθ) / g",
      "R = (2 * v₀ * cosθ) / g",
    ],
    answer: 0,
  },
  {
    question: "At what angle is the range of a projectile maximized?",
    options: ["30°", "45°", "60°", "90°"],
    answer: 1,
  },
  {
    question: "What is the vertical velocity at the highest point of the trajectory?",
    options: ["Maximum", "Zero", "Equal to initial vertical velocity", "Equal to gravity"],
    answer: 1,
  },
];

export default function ProjectileQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selected === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelected(null);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold">Quiz Completed!</h2>
        <p>Your Score: {score} / {questions.length}</p>
        <Button onClick={handleRestart}>Restart Quiz</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">{questions[currentQuestion].question}</h2>
      <RadioGroup value={selected?.toString()} onValueChange={(val) => setSelected(parseInt(val))}>
        {questions[currentQuestion].options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button onClick={handleSubmit} disabled={selected === null}>
        Submit
      </Button>
    </div>
  );
}
