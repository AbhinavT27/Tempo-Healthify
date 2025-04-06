import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  TrendingUpIcon,
  AwardIcon,
  TargetIcon,
} from "lucide-react";

interface ProgressData {
  weeklyProgress: number;
  monthlyProgress: number;
  streakCount: number;
  completedTasks: number;
  totalTasks: number;
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date?: string;
}

interface ProgressChartsProps {
  data?: ProgressData;
}

const ProgressCharts: React.FC<ProgressChartsProps> = ({
  data = {
    weeklyProgress: 68,
    monthlyProgress: 42,
    streakCount: 7,
    completedTasks: 24,
    totalTasks: 36,
    milestones: [
      {
        id: "1",
        title: "First Week Complete",
        description: "Completed your first week of wellness activities",
        completed: true,
        date: "2023-06-15",
      },
      {
        id: "2",
        title: "10 Meditation Sessions",
        description: "Completed 10 meditation sessions",
        completed: true,
        date: "2023-06-22",
      },
      {
        id: "3",
        title: "Healthy Eating Streak",
        description: "Maintained healthy eating for 14 days",
        completed: false,
      },
    ],
  },
}) => {
  const completionPercentage = Math.round(
    (data.completedTasks / data.totalTasks) * 100,
  );

  return (
    <div className="w-full space-y-4 bg-background p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Progress</h2>
        <Badge variant="secondary" className="flex items-center gap-1">
          <CalendarIcon className="h-3 w-3" />
          <span>Last updated today</span>
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="streaks">Streaks</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                      {data.weeklyProgress}%
                    </span>
                    <TrendingUpIcon className="h-4 w-4 text-green-500" />
                  </div>
                  <Progress value={data.weeklyProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                      {data.monthlyProgress}%
                    </span>
                    <TrendingUpIcon className="h-4 w-4 text-green-500" />
                  </div>
                  <Progress value={data.monthlyProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    {completionPercentage}%
                  </span>
                  <div className="text-sm text-muted-foreground">
                    {data.completedTasks} of {data.totalTasks} tasks
                  </div>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="streaks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-6">
                <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-primary">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{data.streakCount}</div>
                    <div className="text-sm text-muted-foreground">days</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Keep going! You're building a healthy habit.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Streak History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }).map((_, i) => {
                  // Simulate some random streak data
                  const isActive = i < data.streakCount || Math.random() > 0.7;
                  return (
                    <div
                      key={i}
                      className={`h-8 rounded-md ${isActive ? "bg-primary" : "bg-muted"}`}
                      title={`Day ${i + 1}`}
                    />
                  );
                })}
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>4 weeks ago</span>
                <span>Today</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          <div className="grid gap-4">
            {data.milestones.map((milestone) => (
              <Card
                key={milestone.id}
                className={milestone.completed ? "border-green-200" : ""}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">
                      {milestone.title}
                    </CardTitle>
                    {milestone.completed ? (
                      <Badge className="bg-green-500">
                        <AwardIcon className="mr-1 h-3 w-3" />
                        Achieved
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <TargetIcon className="mr-1 h-3 w-3" />
                        In Progress
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {milestone.description}
                  </p>
                  {milestone.date && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Completed on {milestone.date}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressCharts;
