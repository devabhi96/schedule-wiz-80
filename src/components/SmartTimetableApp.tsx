import React, { useState } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import TimetableForm from './TimetableForm';
import TimetableDisplay from './TimetableDisplay';

type Page = 'home' | 'create' | 'my-timetables' | 'about' | 'view-timetable';

interface FormData {
  studentName: string;
  classGrade: string;
  academicYear: string;
  subjects: any[];
  preferredTimes: string[];
  breakDuration: number;
  daysPerWeek: number;
}

const SmartTimetableApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [generatedTimetable, setGeneratedTimetable] = useState<FormData | null>(null);

  const handleNavigation = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleGetStarted = () => {
    setCurrentPage('create');
  };

  const handleTimetableGenerated = (formData: FormData) => {
    setGeneratedTimetable(formData);
    setCurrentPage('view-timetable');
  };

  const handleBackToForm = () => {
    setCurrentPage('create');
  };

  const handleRegenerate = () => {
    // Could add regeneration logic here
    console.log('Regenerating timetable...');
  };

  const renderAboutPage = () => (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">About Smart Timetable Generator</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our AI-powered timetable generator helps students, teachers, and educational institutions 
          create optimized study schedules that maximize learning efficiency and productivity.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">Key Features</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Smart subject scheduling based on priority</li>
            <li>• Customizable time preferences</li>
            <li>• Break time optimization</li>
            <li>• Multi-format export options</li>
            <li>• Mobile-responsive design</li>
            <li>• Easy regeneration and editing</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-primary">How It Works</h2>
          <ol className="space-y-2 text-muted-foreground">
            <li>1. Enter your student information</li>
            <li>2. Add subjects with hours and priority</li>
            <li>3. Set your time preferences</li>
            <li>4. Generate your optimized timetable</li>
            <li>5. Export or modify as needed</li>
          </ol>
        </div>
      </div>
    </div>
  );

  const renderMyTimetables = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">My Timetables</h1>
        <p className="text-xl text-muted-foreground">
          Manage your saved timetables and create new ones
        </p>
      </div>
      
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📅</div>
        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">No Saved Timetables</h2>
        <p className="text-muted-foreground mb-6">
          You haven't created any timetables yet. Start by creating your first one!
        </p>
        <button
          onClick={() => setCurrentPage('create')}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
        >
          Create Your First Timetable
        </button>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onGetStarted={handleGetStarted} />;
      case 'create':
        return <TimetableForm onGenerate={handleTimetableGenerated} />;
      case 'view-timetable':
        return generatedTimetable ? (
          <TimetableDisplay
            formData={generatedTimetable}
            onBack={handleBackToForm}
            onRegenerate={handleRegenerate}
          />
        ) : (
          <TimetableForm onGenerate={handleTimetableGenerated} />
        );
      case 'my-timetables':
        return renderMyTimetables();
      case 'about':
        return renderAboutPage();
      default:
        return <Hero onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={handleNavigation} />
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default SmartTimetableApp;