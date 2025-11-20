import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

/**
 * UI Context Provider
 * Manages global UI states (modals, overlays, etc.)
 */
export const UIProvider = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);
  const toggleSearch = () => setSearchOpen((prev) => !prev);

  const openMobileMenu = () => setMobileMenuOpen(true);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const openModal = (modalId) => setActiveModal(modalId);
  const closeModal = () => setActiveModal(null);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const value = {
    // Search
    searchOpen,
    openSearch,
    closeSearch,
    toggleSearch,
    
    // Mobile Menu
    mobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    toggleMobileMenu,
    
    // Modal
    activeModal,
    openModal,
    closeModal,
    
    // Sidebar
    sidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

/**
 * Custom hook to use UI state
 * @returns {Object} UI functions and states
 */
export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

export default UIContext;
