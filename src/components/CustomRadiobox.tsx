import React from "react"
import { Radio, Chip } from "@nextui-org/react"
import cn from "classnames"

interface SizeName {
  name: string
  description: string
  isRecommended: string
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
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
        label: "w-full",
      }}
      value={value}
    >
      <div className="w-full flex justify-between items-center gap-2">
        <div>
          <p className="text-lg font-bold text-default-900 dark:text-default-900">
            {sizeName.name}
          </p>
          <p className="text-sm text-default-500">{sizeName.description}</p>
        </div>
        <Chip color={statusColor} size="sm" variant="flat">
          {sizeName.isRecommended}
        </Chip>
      </div>
    </Radio>
  )
}

export default CustomRadio