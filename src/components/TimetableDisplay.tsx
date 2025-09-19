import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Edit, RotateCcw, Clock, BookOpen } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  hoursPerWeek: number;
  priority: 'high' | 'medium' | 'low';
}

interface TimetableSlot {
  time: string;
  subject: string;
  duration: number;
  color: string;
}

interface TimetableDisplayProps {
  formData: {
    studentName: string;
    classGrade: string;
    subjects: Subject[];
    preferredTimes: string[];
    breakDuration: number;
    daysPerWeek: number;
  };
  onBack: () => void;
  onRegenerate: () => void;
}

const TimetableDisplay: React.FC<TimetableDisplayProps> = ({ formData, onBack, onRegenerate }) => {
  // Generate mock timetable data
  const generateMockTimetable = (): { [key: string]: TimetableSlot[] } => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeSlots = [
      '9:00 - 10:00',
      '10:00 - 11:00',
      '11:15 - 12:15',
      '12:15 - 13:15',
      '14:00 - 15:00',
      '15:00 - 16:00',
      '16:15 - 17:15',
    ];

    const subjectColors = {
      'Mathematics': 'subject-math',
      'English': 'subject-english',
      'Science': 'subject-science',
      'History': 'subject-history',
      'Art': 'subject-art',
      'Physical Education': 'subject-pe',
    };

    const timetable: { [key: string]: TimetableSlot[] } = {};
    
    days.slice(0, formData.daysPerWeek).forEach(day => {
      timetable[day] = timeSlots.map(time => {
        const subject = formData.subjects[Math.floor(Math.random() * formData.subjects.length)];
        return {
          time,
          subject: subject.name,
          duration: 60,
          color: subjectColors[subject.name as keyof typeof subjectColors] || 'subject-math',
        };
      });
    });

    return timetable;
  };

  const timetable = generateMockTimetable();
  const days = Object.keys(timetable);

  const handleExport = (format: string) => {
    // Mock export functionality
    console.log(`Exporting timetable as ${format}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Your Smart Timetable</h1>
        <p className="text-xl text-muted-foreground">
          Generated for {formData.studentName} - {formData.classGrade}
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Details
          </Button>
          <Button variant="secondary" onClick={onRegenerate}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Timetable Grid */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Weekly Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header Row */}
              <div className="grid grid-cols-8 border-b border-border bg-muted/50">
                <div className="p-4 font-semibold text-center">Time</div>
                {days.map(day => (
                  <div key={day} className="p-4 font-semibold text-center border-l border-border">
                    {day}
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {timetable[days[0]]?.map((_, timeIndex) => (
                <div key={timeIndex} className="grid grid-cols-8 border-b border-border hover:bg-muted/30 transition-colors">
                  <div className="p-4 text-sm font-medium text-center bg-muted/20 border-r border-border">
                    {timetable[days[0]][timeIndex].time}
                  </div>
                  {days.map(day => {
                    const slot = timetable[day][timeIndex];
                    return (
                      <div key={day} className="border-l border-border">
                        <div className={`m-2 p-3 rounded-lg ${slot.color} text-white text-center hover:opacity-90 transition-opacity cursor-pointer`}>
                          <div className="font-medium text-sm">{slot.subject}</div>
                          <div className="text-xs opacity-90 mt-1">
                            {slot.duration} min
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">
              {formData.subjects.length}
            </div>
            <div className="text-muted-foreground">Total Subjects</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-secondary mb-2">
              {formData.subjects.reduce((acc, subject) => acc + subject.hoursPerWeek, 0)}
            </div>
            <div className="text-muted-foreground">Weekly Hours</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-subjects-english mb-2">
              {formData.daysPerWeek}
            </div>
            <div className="text-muted-foreground">Study Days</div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span>Subject Legend</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {formData.subjects.map((subject, index) => {
              const colors = ['subject-math', 'subject-science', 'subject-english', 'subject-history', 'subject-art', 'subject-pe'];
              const color = colors[index % colors.length];
              return (
                <div key={subject.id} className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded ${color}`} />
                  <span className="font-medium">{subject.name}</span>
                  <Badge variant="outline">
                    {subject.hoursPerWeek}h/week
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimetableDisplay;