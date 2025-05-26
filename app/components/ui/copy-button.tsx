"use client";

import React, { useState } from 'react';

interface CopyButtonProps {
    textToCopy: string;
}

const handleCopy = async (textToCopy: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (error) {
        console.error('Copy failed', error);
    }
};

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    return (
        <button 
            onClick={() => handleCopy(textToCopy, setCopied)}
            className="absolute top-2 right-2 border p-1 rounded transition-opacity opacity-0 group-hover:opacity-100"
            title="Copy code"
        >
            {copied ? (
                // Check icon when copied
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                // Copy icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="8" y="8" width="12" height="12" rx="2" ry="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h2" />
                </svg>
            )}
        </button>
    );
};

export default CopyButton;