import React from "react";
import { Checkbox, Chip } from "@nextui-org/react";
import cn from "classnames";

const CustomCheckbox = ({ sizeName, statusColor, value }) => {
  return (
    <Checkbox
      aria-label={sizeName.name}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-1 border-transparent",
          "data-[selected=true]:border-primary mt-1"
        ),
        label: "w-full",
      }}
      value={value}
    >
      <div className="w-full flex justify-between items-center gap-2 ">
        {/* Display main name for the size */}
        <div>
          <p className="text-lg font-bold text-default-900 dark:text-default-900">
            {sizeName.name}
          </p>
          <p className="text-sm text-default-500">{sizeName.description}</p>
        </div>

        {/* Optional status chip */}
        <Chip color={statusColor} size="sm" variant="flat">
          {sizeName.isRecommended}
        </Chip>
      </div>
    </Checkbox>
  );
};

export default CustomCheckbox;
