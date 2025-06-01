import React from "react";
import { SafetyTip } from "../types";

interface SafetyTipCardProps {
  tip: SafetyTip | null;
}

const SafetyTipCard: React.FC<SafetyTipCardProps> = ({ tip }) => {
  if (!tip) {
    return (
      <div className="bg-white shadow-xl rounded-lg p-6 min-h-[200px] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Click "New Tip" to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-2xl rounded-xl p-8 transition-all duration-500 ease-in-out hover:shadow-pink-200/50">
      <div className="mb-4">
        <span className="inline-block bg-pink-100 text-pink-700 text-sm font-semibold px-3 py-1 rounded-full">
          {tip.category}
        </span>
      </div>
      <p className="text-gray-800 text-lg leading-relaxed">{tip.tip}</p>
      {tip.source && (
        <p className="text-xs text-gray-400 mt-4 italic">
          Source: {tip.source}
        </p>
      )}
    </div>
  );
};

export default SafetyTipCard;
