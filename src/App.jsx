import { useState } from "react";

export default function AspectRatioCalculator() {
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1920);
  const [locked, setLocked] = useState(true);
  const [ratio, setRatio] = useState("9:16");

  const parseRatio = (r) => {
    const [w, h] = r.split(":").map(Number);
    return { w, h };
  };

  const handleWidthChange = (newWidth) => {
    const { w, h } = parseRatio(ratio);
    const newHeight = locked ? Math.round((newWidth * h) / w) : height;
    setWidth(newWidth);
    setHeight(newHeight);
  };

  const handleHeightChange = (newHeight) => {
    const { w, h } = parseRatio(ratio);
    const newWidth = locked ? Math.round((newHeight * w) / h) : width;
    setHeight(newHeight);
    setWidth(newWidth);
  };

  const adjustSize = (amount) => {
    handleWidthChange(width + amount);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      <h1 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
        Aspect Ratio Calculator
      </h1>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-1">Aspect Ratio</label>
        <select
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
          value={ratio}
          onChange={(e) => setRatio(e.target.value)}
        >
          <option value="9:16">9:16 (Vertical)</option>
          <option value="16:9">16:9 (Horizontal)</option>
          <option value="3:4">3:4</option>
          <option value="1:2">1:2</option>
          <option value="custom">Custom (Unlocked)</option>
        </select>
      </div>

      <div className="flex justify-between gap-4 mb-4">
        <div className="w-1/2">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Width</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
            value={width}
            onChange={(e) => handleWidthChange(parseInt(e.target.value))}
          />
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Height</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
            value={height}
            onChange={(e) => handleHeightChange(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => adjustSize(-10)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          -10 px
        </button>
        <button
          onClick={() => setLocked(!locked)}
          className={\`px-4 py-2 rounded \${locked ? "bg-green-500 text-white hover:bg-green-600" : "bg-red-500 text-white hover:bg-red-600"}\`}
        >
          Aspect Ratio: {locked ? "Locked" : "Unlocked"}
        </button>
        <button
          onClick={() => adjustSize(10)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          +10 px
        </button>
      </div>
    </div>
  );
}
