import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface ComponentScore {
  name: string;
  score: number;
}

interface LaptopDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchPercentage: number;
  componentScores: ComponentScore[];
}

const LaptopDetailsModal: React.FC<LaptopDetailsModalProps> = ({
    isOpen,
    onClose,
    matchPercentage,
    componentScores
  }) => {
    // Add debug log
    console.log("Modal componentScores:", componentScores);
  
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1" dir="rtl">
            <h2 className="text-lg font-bold">פירוט התאמה</h2>
          </ModalHeader>
          <ModalBody dir="rtl">
            <div>
              <h3 className="text-xl font-semibold mb-4">התאמה כללית: {matchPercentage}%</h3>
              {componentScores && componentScores.length > 0 ? (
                <ul className="space-y-2">
                  {componentScores.map((component) => (
                    <li key={component.name} className="flex justify-between items-center">
                      <strong className="text-gray-700">{component.name}:</strong>
                      <div className="flex items-center gap-4">
                        <div className="w-48 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${component.score}` }}
                          />
                        </div>
                        <span className="text-primary min-w-[3ch]">{component.score}%</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No component scores available</p>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              סגור
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default LaptopDetailsModal;