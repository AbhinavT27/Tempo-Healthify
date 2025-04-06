import React from "react";
import { Home, User, BarChart3, BookOpen } from "lucide-react";
import WellnessOverview from "./Dashboard/WellnessOverview";
import DailyTasksList from "./Dashboard/DailyTasksList";
import ContentRecommendations from "./Dashboard/ContentRecommendations";
import ProgressCharts from "./ProgressTracking/ProgressCharts";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 pb-20 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Welcome to Healthify</h1>

        {/* Wellness Overview Section */}
        <section className="mb-8">
          <WellnessOverview />
        </section>

        {/* Daily Tasks Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Daily Tasks</h2>
          <DailyTasksList />
        </section>

        {/* Progress Charts Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <ProgressCharts />
        </section>

        {/* Content Recommendations Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
          <ContentRecommendations />
        </section>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-2 flex justify-around items-center">
        <button className="flex flex-col items-center p-2 text-primary">
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary">
          <BarChart3 size={24} />
          <span className="text-xs mt-1">Progress</span>
        </button>
        <button className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary">
          <BookOpen size={24} />
          <span className="text-xs mt-1">Library</span>
        </button>
        <button className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary">
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default HomePage;
