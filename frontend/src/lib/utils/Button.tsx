import React from 'react';

interface Props {
    label: string;
    className?: string;
    onClick?: () => void; 
}

const Button: React.FC<Props> = ({ label, className = '', onClick }) => { 
    return (
        <button 
            className={`bg-pink-500 text-white px-4 py-2 rounded-full ${className}`} 
            onClick={onClick} 
        >
            {label}
        </button>
    );
};

export default Button;

