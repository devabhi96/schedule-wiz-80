import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Clock, User, BookOpen, Settings } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  hoursPerWeek: number;
  priority: 'high' | 'medium' | 'low';
}

interface TimetableFormProps {
  onGenerate: (formData: any) => void;
}

const TimetableForm: React.FC<TimetableFormProps> = ({ onGenerate }) => {
  const [studentName, setStudentName] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Mathematics', hoursPerWeek: 4, priority: 'high' },
    { id: '2', name: 'English', hoursPerWeek: 3, priority: 'high' },
    { id: '3', name: 'Science', hoursPerWeek: 3, priority: 'medium' },
  ]);
  const [preferredTimes, setPreferredTimes] = useState<string[]>(['morning']);
  const [breakDuration, setBreakDuration] = useState('15');
  const [daysPerWeek, setDaysPerWeek] = useState('5');

  const addSubject = () => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: '',
      hoursPerWeek: 2,
      priority: 'medium',
    };
    setSubjects([...subjects, newSubject]);
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const updateSubject = (id: string, updates: Partial<Subject>) => {
    setSubjects(subjects.map(subject => 
      subject.id === id ? { ...subject, ...updates } : subject
    ));
  };

  const togglePreferredTime = (time: string) => {
    setPreferredTimes(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const handleGenerate = () => {
    const formData = {
      studentName,
      classGrade,
      academicYear,
      subjects,
      preferredTimes,
      breakDuration: parseInt(breakDuration),
      daysPerWeek: parseInt(daysPerWeek),
    };
    onGenerate(formData);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Create Your Timetable</h1>
        <p className="text-xl text-muted-foreground">
          Fill in your details and preferences to generate a personalized study schedule
        </p>
      </div>

      <div className="grid gap-6">
        {/* Student Information */}
        <Card className="card-gradient shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>Student Information</span>
            </CardTitle>
            <CardDescription>
              Enter your basic details for the timetable
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class/Grade</Label>
              <Select value={classGrade} onValueChange={setClassGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grade-9">Grade 9</SelectItem>
                  <SelectItem value="grade-10">Grade 10</SelectItem>
                  <SelectItem value="grade-11">Grade 11</SelectItem>
                  <SelectItem value="grade-12">Grade 12</SelectItem>
                  <SelectItem value="college-1">College Year 1</SelectItem>
                  <SelectItem value="college-2">College Year 2</SelectItem>
                  <SelectItem value="college-3">College Year 3</SelectItem>
                  <SelectItem value="college-4">College Year 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Academic Year</Label>
              <Select value={academicYear} onValueChange={setAcademicYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2025-2026">2025-2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Subject Management */}
        <Card className="card-gradient shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>Subject Management</span>
            </CardTitle>
            <CardDescription>
              Add your subjects and set weekly hours for each
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <div className="flex-1">
                  <Input
                    value={subject.name}
                    onChange={(e) => updateSubject(subject.id, { name: e.target.value })}
                    placeholder="Subject name"
                  />
                </div>
                <div className="w-24">
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={subject.hoursPerWeek}
                    onChange={(e) => updateSubject(subject.id, { hoursPerWeek: parseInt(e.target.value) })}
                  />
                </div>
                <div className="w-32">
                  <Select 
                    value={subject.priority} 
                    onValueChange={(value: 'high' | 'medium' | 'low') => updateSubject(subject.id, { priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Badge className={getPriorityColor(subject.priority)}>
                  {subject.priority}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSubject(subject.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addSubject}
              className="w-full flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Subject</span>
            </Button>
          </CardContent>
        </Card>

        {/* Preferences & Constraints */}
        <Card className="card-gradient shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-primary" />
              <span>Preferences & Constraints</span>
            </CardTitle>
            <CardDescription>
              Set your study preferences and scheduling constraints
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">Preferred Study Times</Label>
              <div className="flex flex-wrap gap-3">
                {['morning', 'afternoon', 'evening'].map((time) => (
                  <div key={time} className="flex items-center space-x-2">
                    <Checkbox
                      id={time}
                      checked={preferredTimes.includes(time)}
                      onCheckedChange={() => togglePreferredTime(time)}
                    />
                    <Label htmlFor={time} className="capitalize">
                      {time} (
                      {time === 'morning' && '6:00 - 12:00'}
                      {time === 'afternoon' && '12:00 - 18:00'}
                      {time === 'evening' && '18:00 - 22:00'}
                      )
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="break">Break Duration (minutes)</Label>
                <Select value={breakDuration} onValueChange={setBreakDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="20">20 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="days">Days per Week</Label>
                <Select value={daysPerWeek} onValueChange={setDaysPerWeek}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 days (Mon-Fri)</SelectItem>
                    <SelectItem value="6">6 days (Mon-Sat)</SelectItem>
                    <SelectItem value="7">7 days (Mon-Sun)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleGenerate}
            size="lg"
            className="px-8 py-4 text-lg shadow-glow transform hover:scale-105 transition-all duration-200"
            disabled={!studentName || !classGrade || subjects.length === 0}
          >
            <Clock className="w-5 h-5 mr-2" />
            Generate Smart Timetable
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimetableForm;