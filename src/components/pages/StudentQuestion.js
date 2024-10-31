import React from "react";
import Container from "../Container";
import Header from "../Header";
import { Button, ButtonGroup, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import NavigationButtons from "../NavigationButtons";

const BachelorsList = [
  { key: "1", label: "מדעי המחשב" },
  { key: "2", label: "הנדסת חשמל" },
  { key: "3", label: "עיצוב" },
  { key: "4", label: "הנדסת מכונות" },
  { key: "5", label: "טכנולוגית למידה" },
];

export default function StudentQuestion({ onAnswer, nextStep, prevStep, isStudent, selectedDegree }) {
  
  // Handle student selection (Yes/No)
  const handleStudentSelection = (answer) => {
    const updatedAnswer = { isStudent: answer, selectedDegree: answer === "no" ? "" : selectedDegree };
    onAnswer(updatedAnswer); // Update `isStudent` in parent
  };

  // Handle degree selection in Autocomplete
  const handleDegreeSelection = (key) => {
    const selected = BachelorsList.find(degree => degree.key === key);
    onAnswer({ isStudent, selectedDegree: selected ? selected.label : "" }); 
  };

  const handleNext = () => {
    nextStep(); 
  };

  return (
    <Container>
      <Header 
        text="לפני שנתחיל, אתם סטודנטים?" 
        className="mb-4 text-4xl font-bold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black font-display" 
      />
      
      <div className="flex flex-col items-center space-y-4">
        <ButtonGroup>
          <Button 
            color={isStudent === "yes" ? "primary" : "default"}
            aria-pressed={isStudent === "yes"}
            onClick={() => handleStudentSelection("yes")}
          >
            כן
          </Button>
          <Button 
            color={isStudent === "no" ? "primary" : "default"}
            aria-pressed={isStudent === "no"}
            onClick={() => handleStudentSelection("no")}
          >
            לא
          </Button>
        </ButtonGroup>
        
        {/* Show Autocomplete only if user selected "yes" */}
        {isStudent === "yes" && (
          <Autocomplete
            label="בחר תואר"
            selectedKey={BachelorsList.find(degree => degree.label === selectedDegree)?.key} // Keep previous selection
            className="max-w-xs w-full"
            onSelectionChange={handleDegreeSelection}
            listboxProps={{
                emptyContent: 'התואר שלך לא כאן? בחר ב״אחר״'
            }}
          >
            {BachelorsList.map((degree) => (
              <AutocompleteItem key={degree.key} value={degree.key}>
                {degree.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        )}
      </div>
      
      <NavigationButtons 
        onNext={handleNext} 
        onBack={prevStep} 
        disableNext={
          (isStudent === "yes" && !selectedDegree) || isStudent === ""
        } // Disable next if student is yes but no degree is selected or if isStudent is empty
      />
    </Container>
  );
}
