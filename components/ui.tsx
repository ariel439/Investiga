
import React, { ReactNode, useEffect } from 'react';
import { CaseSeverity, CaseStatus, WitnessReliability } from '../types';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-brand-secondary rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${className}`}>
      {children}
    </div>
  );
};


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div 
        className="bg-brand-primary rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden border border-brand-secondary"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-brand-secondary flex-shrink-0">
          <h2 className="text-2xl font-bold text-brand-text">{title}</h2>
          <button onClick={onClose} className="text-brand-text-secondary hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case 'investigação': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'resolvido': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'arquivada': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'reaberta': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-700';
    }
};

export const getSeverityColor = (severity: CaseSeverity) => {
    switch (severity) {
      case 'Crítico': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Gravíssimo': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'Grave': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Médio': return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      case 'Baixo': return 'bg-teal-500/20 text-teal-300 border-teal-500/30';
      default: return 'bg-gray-700';
    }
};

export const getReliabilityColor = (reliability: WitnessReliability) => {
    switch (reliability) {
        case 'alta': return 'bg-green-500/20 text-green-300 border-green-500/30';
        case 'media': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
        case 'baixa': return 'bg-red-500/20 text-red-300 border-red-500/30';
        default: return 'bg-gray-700';
    }
};


export const Tag: React.FC<{ colorClass: string; children: ReactNode }> = ({ colorClass, children }) => (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider border ${colorClass}`}>
        {children}
    </span>
);

export const CircularProgressBar: React.FC<{ percentage: number; size?: number; strokeWidth?: number; }> = ({ percentage, size = 100, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-brand-secondary"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-brand-accent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-brand-text">{`${percentage}%`}</span>
      </div>
    </div>
  );
};
