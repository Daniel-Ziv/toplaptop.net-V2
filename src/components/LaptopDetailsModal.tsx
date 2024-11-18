'use client'
import React from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Progress, Card, CardBody, Tooltip } from "@nextui-org/react"
import { motion } from "framer-motion"

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
                {componentScores
                  .sort((a, b) => b.score - a.score) // Sort from highest to lowest
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