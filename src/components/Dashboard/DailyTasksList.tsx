import React, { useState } from "react";
import { Check, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  category: string;
  completed: boolean;
}

interface DailyTasksListProps {
  tasks?: Task[];
  onTaskComplete?: (taskId: string) => void;
}

const DailyTasksList = ({
  tasks = [
    {
      id: "1",
      title: "Morning Meditation",
      description: "Start your day with a 10-minute mindfulness session",
      estimatedTime: "10 min",
      category: "Mental Health",
      completed: false,
    },
    {
      id: "2",
      title: "Hydration Reminder",
      description: "Drink a full glass of water with lemon",
      estimatedTime: "5 min",
      category: "Nutrition",
      completed: false,
    },
    {
      id: "3",
      title: "Quick Stretching",
      description: "Do a series of full-body stretches to improve flexibility",
      estimatedTime: "15 min",
      category: "Fitness",
      completed: false,
    },
    {
      id: "4",
      title: "Gratitude Journaling",
      description: "Write down three things you are grateful for today",
      estimatedTime: "10 min",
      category: "Mental Health",
      completed: false,
    },
    {
      id: "5",
      title: "Evening Walk",
      description: "Take a relaxing walk after dinner to aid digestion",
      estimatedTime: "20 min",
      category: "Fitness",
      completed: false,
    },
  ],
  onTaskComplete = () => {},
}: DailyTasksListProps) => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState<string | null>(null);

  const handleTaskComplete = (taskId: string) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter((id) => id !== taskId));
    } else {
      setCompletedTasks([...completedTasks, taskId]);
      setShowConfetti(taskId);
      setTimeout(() => setShowConfetti(null), 2000);
      onTaskComplete(taskId);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "mental health":
        return "bg-purple-100 text-purple-800";
      case "nutrition":
        return "bg-green-100 text-green-800";
      case "fitness":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Today's Tasks</h2>
        <span className="text-sm text-gray-500">
          {completedTasks.length}/{tasks.length} completed
        </span>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-4 min-w-max">
          {tasks.map((task) => {
            const isCompleted = completedTasks.includes(task.id);
            return (
              <Card
                key={task.id}
                className={`w-72 relative ${isCompleted ? "bg-gray-50" : "bg-white"}`}
              >
                {showConfetti === task.id && (
                  <motion.div
                    className="absolute inset-0 overflow-hidden z-10 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full absolute"
                          style={{
                            backgroundColor: [
                              "#FF6B6B",
                              "#4ECDC4",
                              "#FFE66D",
                              "#1A535C",
                              "#FF9F1C",
                            ][Math.floor(Math.random() * 5)],
                          }}
                          initial={{
                            x: 0,
                            y: 0,
                            scale: 0,
                          }}
                          animate={{
                            x: (Math.random() - 0.5) * 200,
                            y: (Math.random() - 0.5) * 200,
                            scale: Math.random() * 1.5 + 0.5,
                            opacity: [1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <Badge
                      className={`${getCategoryColor(task.category)} font-medium`}
                    >
                      {task.category}
                    </Badge>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{task.estimatedTime}</span>
                    </div>
                  </div>

                  <h3
                    className={`text-lg font-semibold mb-2 ${isCompleted ? "text-gray-500 line-through" : "text-gray-800"}`}
                  >
                    {task.title}
                  </h3>

                  <p
                    className={`text-sm mb-4 ${isCompleted ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {task.description}
                  </p>

                  <Button
                    onClick={() => handleTaskComplete(task.id)}
                    variant={isCompleted ? "outline" : "default"}
                    className={`w-full ${isCompleted ? "bg-green-50 text-green-600 border-green-200" : ""}`}
                  >
                    {isCompleted ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      "Mark Complete"
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyTasksList;
