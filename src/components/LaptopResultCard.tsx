import { Check } from "lucide-react"
import React from "react"
import { Image } from "@nextui-org/react";


interface ProductCardProps {
  name: string
  price: number
  weight: string
  screenSize: string
  imageUrl: string
  productUrl: string
  matchPercentage?: number
}

export default function Component({
  name = "Lenovo IdeaPad Duet 5 12IAU7",
  price = 5131,
  weight = "1.12",
  screenSize = "12.4",
  imageUrl = "/placeholder.svg?height=150&width=150",
  productUrl = "#",
  matchPercentage = 98
}: ProductCardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-row-reverse items-center gap-6">
          {/* Product Image */}
          <div className="relative shrink-0">
            <Image
              src={imageUrl}
              alt={name}
              width={150}
              height={150}
              className="object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-4 text-right">
            <h3 className="text-xl font-semibold">{name}</h3>
            <div className="flex justify-end gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="font-medium">{screenSize} אינטש</span>
                <span className="text-gray-500">מסך</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="font-medium">{weight} ק"ג</span>
                <span className="text-gray-500">משקל</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="font-medium">₪{price}</span>
                <span className="text-gray-500">מחיר</span>
              </div>
            </div>
          </div>

          {/* Match Percentage */}
          <div className="flex flex-col items-center gap-2 w-32">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  className="text-gray-200"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="44"
                  cx="48"
                  cy="48"
                />
                <circle
                  className="text-green-500"
                  strokeWidth="8"
                  strokeDasharray={44 * 2 * Math.PI}
                  strokeDashoffset={44 * 2 * Math.PI * (1 - matchPercentage / 100)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="44"
                  cx="48"
                  cy="48"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-medium">{matchPercentage}%</span>
              </div>
            </div>
            <span className="text-sm text-gray-500">אחוז התאמה</span>
          </div>
        </div>

        {/* Product Link Button */}
        <div className="mt-6 flex justify-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-40"
            onClick={() => window.open(productUrl, '_blank')}
          >
            קישור למוצר
          </button>
        </div>
      </div>
    </div>
  )
}