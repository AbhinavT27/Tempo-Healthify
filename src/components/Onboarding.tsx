import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useAuth } from "../context/AuthContext";

const OnboardingStep1 = ({ onNext }: { onNext: () => void }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    { id: "weight", label: "Weight Management" },
    { id: "stress", label: "Stress Reduction" },
    { id: "sleep", label: "Better Sleep" },
    { id: "fitness", label: "Improved Fitness" },
    { id: "nutrition", label: "Healthier Eating" },
    { id: "mental", label: "Mental Wellbeing" },
  ];

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((goal) => goal !== id) : [...prev, id],
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Select Your Health Goals</h2>
        <p className="text-muted-foreground mt-2">
          Choose all that apply to you
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedGoals.includes(goal.id) ? "bg-primary/10 border-primary" : "border-border hover:bg-background/80"}`}
            onClick={() => toggleGoal(goal.id)}
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                id={goal.id}
                checked={selectedGoals.includes(goal.id)}
                onCheckedChange={() => toggleGoal(goal.id)}
              />
              <Label htmlFor={goal.id} className="cursor-pointer">
                {goal.label}
              </Label>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={onNext}
        className="w-full"
        disabled={selectedGoals.length === 0}
      >
        Continue
      </Button>
    </div>
  );
};

const OnboardingStep2 = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const [challenges, setChallenges] = useState("");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Health Challenges</h2>
        <p className="text-muted-foreground mt-2">
          Tell us about any health challenges you're facing
        </p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="challenges">Your Challenges</Label>
        <textarea
          id="challenges"
          value={challenges}
          onChange={(e) => setChallenges(e.target.value)}
          className="w-full min-h-[150px] p-3 border rounded-md"
          placeholder="E.g., I struggle with maintaining a consistent exercise routine..."
        />
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack} className="w-1/2">
          Back
        </Button>
        <Button onClick={onNext} className="w-1/2">
          Continue
        </Button>
      </div>
    </div>
  );
};

const OnboardingStep3 = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const [activityLevel, setActivityLevel] = useState<string>("");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Your Preferences</h2>
        <p className="text-muted-foreground mt-2">
          Help us personalize your experience
        </p>
      </div>

      <div className="space-y-4">
        <Label>Activity Level</Label>
        <RadioGroup value={activityLevel} onValueChange={setActivityLevel}>
          <div className="flex items-center space-x-2 p-2 border rounded-md mb-2">
            <RadioGroupItem value="sedentary" id="sedentary" />
            <Label htmlFor="sedentary">Sedentary (little to no exercise)</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 border rounded-md mb-2">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light">Light (exercise 1-3 days/week)</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 border rounded-md mb-2">
            <RadioGroupItem value="moderate" id="moderate" />
            <Label htmlFor="moderate">Moderate (exercise 3-5 days/week)</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 border rounded-md">
            <RadioGroupItem value="active" id="active" />
            <Label htmlFor="active">Active (exercise 6-7 days/week)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack} className="w-1/2">
          Back
        </Button>
        <Button onClick={onNext} className="w-1/2" disabled={!activityLevel}>
          Continue
        </Button>
      </div>
    </div>
  );
};

const OnboardingStep4 = ({
  onComplete,
  onBack,
}: {
  onComplete: () => void;
  onBack: () => void;
}) => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <p className="text-muted-foreground mt-2">
          This helps us create your personalized plan
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Your age"
          />
        </div>

        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Your height in cm"
          />
        </div>

        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Your weight in kg"
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack} className="w-1/2">
          Back
        </Button>
        <Button
          onClick={onComplete}
          className="w-1/2"
          disabled={!age || !height || !weight}
        >
          Complete Setup
        </Button>
      </div>
    </div>
  );
};

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const handleComplete = () => {
    // In a real app, you would save all the collected data
    completeOnboarding();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Healthify</h1>
          <p className="mt-2 text-muted-foreground">
            Let's set up your personalized wellness plan
          </p>
        </div>

        <div className="flex justify-between mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {i}
            </div>
          ))}
        </div>

        {step === 1 && <OnboardingStep1 onNext={() => setStep(2)} />}
        {step === 2 && (
          <OnboardingStep2
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <OnboardingStep3
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && (
          <OnboardingStep4
            onComplete={handleComplete}
            onBack={() => setStep(3)}
          />
        )}
      </div>
    </div>
  );
}
