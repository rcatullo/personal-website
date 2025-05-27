import React from 'react';
import { TabButton } from './TabButton';

type TabType = 'edit' | 'preview';

interface EditorTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const EditorTabs: React.FC<EditorTabsProps> = ({ activeTab, onTabChange }) => (
  <div className="flex">
    <TabButton
      isActive={activeTab === 'edit'}
      onClick={() => onTabChange('edit')}
    >
      Edit
    </TabButton>
    <TabButton
      isActive={activeTab === 'preview'}
      onClick={() => onTabChange('preview')}
    >
      Preview
    </TabButton>
  </div>
);
