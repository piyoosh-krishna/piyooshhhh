import React from 'react';
import './WaterText.css';

interface WaterTextProps {
  text: string;
  className?: string;
}

const WaterText: React.FC<WaterTextProps> = ({ text, className = "" }) => {
  return (
    <div className={`water-text-container ${className}`}>
      <h2 className="water-text">{text}</h2>
      <h2 className="water-text">{text}</h2>
    </div>
  );
};

export default WaterText;
