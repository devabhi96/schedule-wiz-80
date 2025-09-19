import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Zap } from 'lucide-react';
import heroImage from '@/assets/hero-timetable.jpg';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Smart Timetable
              <span className="block bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Create personalized study schedules that adapt to your needs. 
              Optimize your time, boost productivity, and achieve academic success.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 mb-8 text-white/80">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-300" />
                <span>Smart Scheduling</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-300" />
                <span>Multi-User Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-300" />
                <span>Flexible Planning</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-300" />
                <span>AI-Powered</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-glow transform hover:scale-105 transition-all duration-200"
              >
                Create Your Timetable
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Smart Timetable Generator Interface"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-scale-in">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-sm font-medium">Mathematics</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">9:00 - 10:00 AM</p>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-subjects-english rounded-full"></div>
                <span className="text-sm font-medium">English</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">2:00 - 3:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;