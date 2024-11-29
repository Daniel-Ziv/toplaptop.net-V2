'use client'
import React from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Progress, Card, CardBody, Tooltip, button } from "@nextui-org/react"
import { motion } from "framer-motion"
import { PieChart } from 'react-minimal-pie-chart';


interface ComponentScore {
  name: string
  score: number
}

interface LaptopDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  answers: any
  matchPercentage: number
  componentScores: ComponentScore[]
  priceDiff: number
  laptopWeight: number
  screen_size: number
  ram: number
}

const getEmojiForScore = (score: number) => {
  if (score >= 90) return "🤩"
  if (score >= 70) return "😃"
  if (score >= 50) return "😐"
  return "😕"
}

const getDescriptionForScore = (score: number, name: string, answers: any, priceDiff:number, getUserWeight:Function, ram:number, screen_size:number, laptopWeight:number) => {
  if (name === "מחיר" && priceDiff > 0) return `חריגה של ${priceDiff} ש״ח מהתקציב (${answers.budget.price}₪)`
  if (name === "משקל" && score < 100) return `משקל של ${laptopWeight} ק״ג לעומת ${getUserWeight(answers.weightImportance)} ק״ג שבחרתם`
  if (name === "גודל מסך"){
    if(score<100 && score >= 90)  return "גודל מהמסך קצת חורג מההעדפה"
    if(score<90 && score >= 70)  return "גודל מהמסך חורג מההעדפה"
    if(score<70 && score >= 50)  return "גודל מהמסך מאוד חורג מההעדפה"
  }
  if (name === "זיכרון RAM" && score < 100) {
    if (score >= 90) return "כמעט מושלם לצרכים שלך"
    if (score >= 70) return "מספיק זכרון ראם לרוב המשימות" 
    if (score >= 50) return "עלול להיות איטי בריבוי משימות"
    return "זיכרון RAM נמוך מהנדרש"
   }
   
   if (name === "מעבד" && score < 100) {
    if (score >= 90) return "ביצועים מעולים למשימות שלך"
    if (score >= 70) return "מעבד טוב למרבית השימושים"
    if (score >= 50) return "יתקשה במשימות מורכבות"
    return "מעבד חלש מהנדרש"
   }
   
   if (name === "כרטיס מסך" && score < 100) {
    if (score >= 90) return "ביצועים גרפיים מעולים"
    if (score >= 70) return "מתאים לרוב המשימות הגרפיות"
    if (score >= 50) return "עלול להתקשות בגרפיקה כבדה"
    return "כרטיס מסך חלש מהנדרש"
   }
   
   if (name === "נפח אחסון" && score < 100) {
    if (score >= 90) return "נפח כמעט מושלם לצרכים"
    if (score >= 70) return "נפח טוב למרבית השימושים"
    if (score >= 50) return "נפח מוגבל, יש לנהל קבצים"
    return "נפח אחסון קטן מהנדרש"
   }

   if (name === "סוג זיכרון" && score < 100) {
    if (score >= 90) return "זיכרון מהיר, ביצועים מעולים"
    if (score >= 70) return "מהירות זיכרון טובה"
    if (score >= 50) return "מהירות זיכרון סבירה"
    return "זיכרון איטי מהנדרש"
   }
   
   if (name === "סוג אחסון" && score < 100) {
    if (score >= 90) return "אחסון מהיר מאוד, זמן תגובה מדהים"
    if (score >= 70) return "אחסון מהיר, זמן תגובה טוב"
    if (score >= 50) return "מהירות אחסון בסיסית" 
    return "אחסון איטי, זמני תגובה ארוכים"
  }

  return `${name} מצוין!`
}

const getColorForScore = (score: number) => {
  if (score >= 90) return "success"
  if (score >= 70) return "primary"
  if (score >= 50) return "warning"
  return "danger"
}

const getUserWeight = (weight: number) => {
  if (weight === 0.125) return 2;
  if (weight === 0.25) return 1.5;
  return weight;
};

export default function LaptopDetailsModal({ isOpen, onClose, answers, matchPercentage, componentScores, priceDiff, laptopWeight, ram, screen_size }: LaptopDetailsModalProps) {
  const priorityComponents = ["מחיר", "משקל", "גודל מסך"];
  const sortedScores = [...componentScores].sort((a, b) => a.score - b.score);

  const renderScoreCard = (component: ComponentScore, index: number) => (
    <motion.div
      key={component.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="mb-4"
    >
      <Card className="w-full">
        <CardBody>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-lg">{component.name}</span>
            <span>{getEmojiForScore(component.score)}</span>
              
          </div>
          <Progress 
            value={component.score} 
            color={getColorForScore(component.score)}
            className="mb-2"
          />
          <div className="flex justify-between text-sm">
            <span>{component.score}%</span>
            <span>{getDescriptionForScore(component.score, component.name, answers, priceDiff, getUserWeight, ram, screen_size, laptopWeight)}</span>
            
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      size="2xl"
      className="h-[98vh]"
      hideCloseButton={true}

      
    >
      <ModalContent className="h-full max-h-[98vh]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">פירוט התאמה</ModalHeader>
            <ModalBody>
              <div className="py-4 text-center" dir="rtl">
                <h3 className="text-3xl font-bold mb-6">
                  התאמה כללית: {matchPercentage}% {getEmojiForScore(matchPercentage)}
                </h3>
                
                <h3 className="text-3xl font-semibold mb-2">
                  התפלגות הציון:
                </h3>
                <div className="flex flex-row items-center justify-center gap-4 mb-32">
                  <div style={{ width: '150px', height: '150px', marginBottom:'12px'}} className="sm:w-[200px] sm:h-[200px]">
                    
                    <PieChart
                      data={[
                        { 
                          title: 'מחיר', 
                          value: answers.budget.priceImportance * 100, 
                          color: '#4CAF50'
                        },
                        { 
                          title: 'משקל', 
                          value: answers.weightImportance * 100, 
                          color: '#2196F3'
                        },
                        { 
                          title: 'גודל מסך', 
                          value: answers.screenSize.sizeImportance * 100, 
                          color: '#FFC107'
                        },
                        { 
                          title: 'משימות', 
                          value: (1 - (answers.budget.priceImportance + answers.weightImportance + answers.screenSize.sizeImportance)) * 100,
                          color: '#9C27B0'
                        }
                      ]}
                      labelStyle={{
                        fontSize: '0.25rem',
                        fill: '#fff',
                      }}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div style={{ backgroundColor: '#4CAF50' }} className="w-4 h-4 rounded-full"></div>
                      <span>מחיר - {answers.budget.priceImportance * 100}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div style={{ backgroundColor: '#2196F3' }} className="w-4 h-4 rounded-full"></div>
                      <span>משקל - {answers.weightImportance * 100}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div style={{ backgroundColor: '#FFC107' }} className="w-4 h-4 rounded-full"></div>
                      <span>גודל מסך - {answers.screenSize.sizeImportance * 100}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div style={{ backgroundColor: '#9C27B0' }} className="w-4 h-4 rounded-full"></div>
                      <span>ביצועים - {(1 - (answers.budget.priceImportance + answers.weightImportance + answers.screenSize.sizeImportance)) * 100}%</span>
                    </div>
                  </div>
                </div>

               
                {sortedScores.filter(component =>
                  priorityComponents.includes(component.name) &&
                  ((component.name === "מחיר" && answers.budget.priceImportance > 0) ||
                  (component.name === "גודל מסך" && answers.screenSize.sizeImportance > 0) ||
                  (component.name === "משקל" && answers.weightImportance > 0))
                ).length > 0 && (
                  <>
                    <h3 className="text-3xl font-semibold mb-2">העדפות טכניות:</h3>
                    {sortedScores
                      .filter(component =>
                        priorityComponents.includes(component.name) &&
                        ((component.name === "מחיר" && answers.budget.priceImportance > 0) ||
                        (component.name === "גודל מסך" && answers.screenSize.sizeImportance > 0) ||
                        (component.name === "משקל" && answers.weightImportance > 0))
                      )
                      .map((component, index) => renderScoreCard(component, index))}
                  </>
                )}

                {/* Render task components */}
                <h3 className="text-3xl font-semibold mb-2">התאמת רכיבים למשימות:</h3>
                {sortedScores
                  .filter(component => !priorityComponents.includes(component.name))
                  .map((component, index) => renderScoreCard(component, index))}
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-center items-center">
              
              <Button color="danger" variant="light" onPress={onClose} className="items-center ">
                סגור
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}