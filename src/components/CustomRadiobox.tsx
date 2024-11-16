import React from "react"
import { Radio, Chip } from "@nextui-org/react"
import cn from "classnames"


interface SizeName {
  name: string;
  description: string;
  isRecommended: boolean;  
}

interface CustomRadioProps {
  sizeName: SizeName
  statusColor: "success" | "warning" | "danger" | "primary" | "secondary"
  value: string
}

const CustomRadio: React.FC<CustomRadioProps> = ({ sizeName, statusColor, value }) => {
  
  return (
    <Radio
      aria-label={sizeName.name}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-1 border-transparent",
          "data-[selected=true]:border-primary",
          "relative" 
        ),
        label: "w-full",
        
      }}
      value={value}
    >
      <div className="w-full flex items-center gap-2">
        <div className="flex-grow">
          <p className="text-lg font-bold text-default-900 dark:text-default-900">
            {sizeName.name}
          </p>
          <p className="text-sm text-default-500">{sizeName.description}</p>
        </div>
        {sizeName.isRecommended && (
          <Chip 
            color={statusColor} 
            size="sm" 
            variant="flat"
            className="flex-shrink-0"
          >
            מומלץ
          </Chip>
        )}
      </div>
    </Radio>
  );
};


export default CustomRadio