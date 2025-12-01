'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  const baseStyles = 'w-full px-4 py-3 border rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 text-gray-900 placeholder:text-gray-400';
  const normalStyles = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white';
  const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-white';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`${baseStyles} ${error ? errorStyles : normalStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  const baseStyles = 'w-full px-4 py-3 border rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 resize-none text-gray-900 placeholder:text-gray-400';
  const normalStyles = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white';
  const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-white';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`${baseStyles} ${error ? errorStyles : normalStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  className = '',
  ...props
}) => {
  const baseStyles = 'w-full px-4 py-3 border rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 text-gray-900';
  const normalStyles = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white';
  const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-white';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        className={`${baseStyles} ${error ? errorStyles : normalStyles} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
