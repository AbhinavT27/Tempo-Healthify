import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Flame, Award, TrendingUp } from "lucide-react";

interface WellnessOverviewProps {
  userName?: string;
  streakCount?: number;
  completionRate?: number;
  motivationalMessage?: string;
  avatarUrl?: string;
  todaysMood?: string;
}

const WellnessOverview: React.FC<WellnessOverviewProps> = ({
  userName = "Sarah",
  streakCount = 7,
  completionRate = 68,
  motivationalMessage = "You're making great progress on your mindfulness goals. Keep up the good work!",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  todaysMood = "Energetic",
}) => {
  const timeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src={avatarUrl} alt={userName} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">
                Good {timeOfDay()}, {userName}!
              </h2>
              <Badge variant="secondary" className="mt-1">
                {todaysMood}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-3 py-1"
            >
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="font-medium">{streakCount} day streak</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-medium">Weekly Progress</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {completionRate}% complete
            </span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>

        <div className="mt-6 bg-muted/30 p-4 rounded-lg border border-muted">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium mb-1">Today's Insight</h3>
              <p className="text-sm text-muted-foreground">
                {motivationalMessage}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessOverview;
