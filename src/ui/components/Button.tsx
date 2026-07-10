import React, { useState, useEffect } from 'react';
import './Button.module.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
  size = 'medium',
  color = '#4A90E2',
  className = '',
  style,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeStyles: { [key: string]: React.CSSProperties } = {
    small: {
      padding: '8px 16px',
      fontSize: '12px',
      minHeight: '32px',
    },
    medium: {
      padding: '12px 24px',
      fontSize: '16px',
      minHeight: '44px',
    },
    large: {
      padding: '16px 32px',
      fontSize: '18px',
      minHeight: '56px',
    },
  };

  const buttonStyle: React.CSSProperties = {
    ...sizeStyles[size],
    backgroundColor: isHovered && !disabled ? color : `${color}99`,
    color: '#fff',
    border: `2px solid ${color}`,
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.5 : 1,
    transform: isHovered && !disabled ? 'scale(1.05)' : 'scale(1)',
    outline: 'none',
    ...style,
  };

  return (
    <button
      className={`game-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={buttonStyle}
    >
      {text}
    </button>
  );
};

export default Button;
