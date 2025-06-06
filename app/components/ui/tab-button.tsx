import React from 'react';

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  children: React.ReactNode;
}

export const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  children,
  ...props
}) => {
  const baseClasses = 'px-4 py-2 font-medium text-sm';
  const activeClasses = 'text-black border-t-2 border-black dark:text-white dark:border-white';
  const inactiveClasses = 'text-gray-500 hover:text-gray-700';

  return (
    <button
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      {...props}
    >
      {children}
    </button>
  );
};
