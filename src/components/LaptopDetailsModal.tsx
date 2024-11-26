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
}

const getEmojiForScore = (score: number) => {
  if (score >= 90) return "🤩"
  if (score >= 70) return "😃"
  if (score >= 50) return "😐"
  return "😕"
}

const getDescriptionForScore = (score: number) => {
  if (score >= 90) return "מצוין"
  if (score >= 70) return "טוב מאוד"
  if (score >= 50) return "סביר"
  return "יש מקום לשיפור"
}

const getColorForScore = (score: number) => {
  if (score >= 90) return "success"
  if (score >= 70) return "primary"
  if (score >= 50) return "warning"
  return "danger"
}

export default function LaptopDetailsModal({ isOpen, onClose, answers, matchPercentage, componentScores }: LaptopDetailsModalProps) {
  console.log(componentScores);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      placement="center"
      size="2xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">פירוט התאמה</ModalHeader>
            <ModalBody>
              <div className="py-4 text-center" dir="rtl">
                <h3 className="text-3xl font-bold mb-6">
                  התאמה כללית: {matchPercentage}% {getEmojiForScore(matchPercentage)}
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
                      animate={true}
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

                {componentScores
                  .sort((a, b) => a.score - b.score) // Sort from highest to lowest
                  .map((component, index) => {
                  // Determine if this component needs to be skipped based on importance
                  const shouldShow =
                    (component.name === "מחיר" && answers.budget.priceImportance > 0) ||
                    (component.name === "גודל מסך" && answers.screenSize.sizeImportance > 0) ||
                    (component.name === "משקל" && answers.weightImportance > 0) ||
                    (!["מחיר", "גודל מסך", "משקל"].includes(component.name)); // Always show others

                  // Render only if the component should show
                  return shouldShow ? (
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
                            <span>{getEmojiForScore(component.score)}</span>
                            <span className="font-semibold text-lg">{component.name}</span>
                          </div>
                          <Progress 
                            value={component.score} 
                            color={getColorForScore(component.score)}
                            className="mb-2"
                          />
                          <div className="flex justify-between text-sm">
                            <span>{component.score}%</span>
                            <span>{getDescriptionForScore(component.score)}</span>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  ) : null;
                })}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                סגור
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}