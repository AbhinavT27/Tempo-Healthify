import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Clock, Play } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  type: "video" | "article" | "exercise";
  isBookmarked?: boolean;
}

interface ContentRecommendationsProps {
  recommendations?: ContentItem[];
  onBookmark?: (id: string) => void;
  onView?: (id: string) => void;
}

const ContentRecommendations = ({
  recommendations = [
    {
      id: "1",
      title: "Morning Yoga Routine",
      description:
        "Start your day with this energizing 15-minute yoga sequence.",
      thumbnail:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
      duration: "15 min",
      category: "Fitness",
      type: "video",
      isBookmarked: false,
    },
    {
      id: "2",
      title: "Mindful Meditation Guide",
      description:
        "Learn the basics of mindfulness meditation with this beginner-friendly guide.",
      thumbnail:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
      duration: "10 min",
      category: "Mindfulness",
      type: "article",
      isBookmarked: true,
    },
    {
      id: "3",
      title: "Healthy Meal Prep Ideas",
      description: "Simple and nutritious meal prep ideas for a busy week.",
      thumbnail:
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      duration: "20 min",
      category: "Nutrition",
      type: "article",
      isBookmarked: false,
    },
    {
      id: "4",
      title: "Quick HIIT Workout",
      description: "High-intensity interval training to boost your metabolism.",
      thumbnail:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
      duration: "25 min",
      category: "Fitness",
      type: "video",
      isBookmarked: false,
    },
    {
      id: "5",
      title: "Stress Relief Techniques",
      description: "Practical techniques to manage stress in your daily life.",
      thumbnail:
        "https://images.unsplash.com/photo-1506126279646-a697353d3166?w=600&q=80",
      duration: "12 min",
      category: "Mental Health",
      type: "exercise",
      isBookmarked: false,
    },
    {
      id: "6",
      title: "Better Sleep Habits",
      description:
        "Develop healthy sleep habits for improved rest and recovery.",
      thumbnail:
        "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80",
      duration: "8 min",
      category: "Sleep",
      type: "article",
      isBookmarked: false,
    },
  ],
  onBookmark = () => {},
  onView = () => {},
}: ContentRecommendationsProps) => {
  return (
    <div className="w-full bg-background p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Recommended For You</h2>
        <p className="text-muted-foreground">
          Content tailored to your wellness goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((item) => (
          <Card key={item.id} className="overflow-hidden h-full flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full h-12 w-12 bg-white/80 hover:bg-white"
                    onClick={() => onView(item.id)}
                  >
                    <Play className="h-6 w-6 text-primary" />
                  </Button>
                </div>
              )}
              <Badge
                className="absolute top-2 right-2"
                variant={
                  item.type === "video"
                    ? "default"
                    : item.type === "article"
                      ? "secondary"
                      : "outline"
                }
              >
                {item.type}
              </Badge>
            </div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className={
                    item.isBookmarked ? "text-primary" : "text-muted-foreground"
                  }
                  onClick={() => onBookmark(item.id)}
                >
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>
              <Badge variant="outline" className="w-fit">
                {item.category}
              </Badge>
            </CardHeader>

            <CardContent className="pb-2 flex-grow">
              <CardDescription>{item.description}</CardDescription>
            </CardContent>

            <CardFooter className="pt-0 flex justify-between items-center">
              <div className="flex items-center text-muted-foreground text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {item.duration}
              </div>
              {item.type !== "video" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary"
                  onClick={() => onView(item.id)}
                >
                  View
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentRecommendations;
