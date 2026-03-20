import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TabbedContent = ({ tabs = [], defaultTab = 0, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex border-b border-neutral-200 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            role="tab"
            aria-selected={activeTab === index}
            aria-label={tab.label}
            className={`px-6 py-3 font-semibold transition-colors duration-200 relative whitespace-nowrap ${
              activeTab === index
                ? 'text-primary'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {tab.icon && <i className={`${tab.icon} mr-2`}></i>}
            {tab.label}
            {activeTab === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tabs[activeTab]?.content}
        </motion.div>
      </div>
    </div>
  );
};

export default TabbedContent;
