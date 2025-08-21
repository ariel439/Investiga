
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CasesPage from './pages/CasesPage';
import SuspectsPage from './pages/SuspectsPage';
import DetectivesPage from './pages/DetectivesPage';
import VictimsPage from './pages/VictimsPage';
import WitnessesPage from './pages/WitnessesPage';
import { processData } from './data';
import { DashboardIcon, CasesIcon, SuspectsIcon, DetectivesIcon, VictimsIcon, WitnessesIcon, MenuIcon, CloseIcon } from './components/Icons';
import { logoBase64 } from './components/ImageData';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const data = processData();

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/cases', label: 'Casos', icon: <CasesIcon /> },
    { path: '/suspects', label: 'Suspeitos', icon: <SuspectsIcon /> },
    { path: '/detectives', label: 'Detetives', icon: <DetectivesIcon /> },
    { path: '/victims', label: 'Vítimas', icon: <VictimsIcon /> },
    { path: '/witnesses', label: 'Testemunhas', icon: <WitnessesIcon /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center justify-center gap-y-4 pt-8 pb-6 border-b border-brand-secondary">
        <div className="bg-brand-accent p-2 rounded-full shadow-lg shadow-brand-accent/30">
            <img src={logoBase64} alt="Investiga Logo" className="h-14 w-14" />
        </div>
        <h1 className="text-2xl font-bold tracking-widest text-brand-text">Investiga</h1>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-brand-accent text-white shadow-lg'
                  : 'hover:bg-brand-secondary text-brand-text-secondary'
              }`
            }
          >
            {link.icon}
            <span className="ml-4 font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-brand-secondary text-center text-xs text-brand-text-secondary">
        <p>&copy; 2024 Divisão de Crimes Complexos</p>
      </div>
    </div>
  );

  const Header = () => {
    const location = useLocation();
    const currentLink = navLinks.find(link => link.path === location.pathname);
    const title = currentLink ? currentLink.label : 'Painel de Controle';

    return (
      <header className="bg-brand-primary/80 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between h-20 px-6 border-b border-brand-secondary">
        <div className="flex items-center">
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 mr-4 md:hidden text-brand-text-secondary hover:text-white"
            >
                <MenuIcon />
            </button>
            <h1 className="text-2xl font-bold text-brand-text">{title}</h1>
        </div>
        <div className="flex items-center gap-x-4">
            <img
                className="w-10 h-10 rounded-full object-cover"
                src="https://picsum.photos/id/1005/100/100"
                alt="User Avatar"
            />
        </div>
      </header>
    );
  };
  
  return (
    <HashRouter>
      <div className="flex h-screen bg-brand-primary font-sans">
        {/* Mobile Sidebar */}
        <div 
          className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <aside className={`fixed top-0 left-0 h-full w-64 bg-brand-primary border-r border-brand-secondary z-40 transform transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SidebarContent />
          <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="absolute top-4 right-4 p-2 text-brand-text-secondary hover:text-white md:hidden"
          >
              <CloseIcon />
          </button>
        </aside>

        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-brand-primary border-r border-brand-secondary flex-shrink-0">
            <SidebarContent />
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-900">
            <Routes>
              <Route path="/" element={<DashboardPage data={data} />} />
              <Route path="/cases" element={<CasesPage data={data} />} />
              <Route path="/suspects" element={<SuspectsPage data={data} />} />
              <Route path="/detectives" element={<DetectivesPage data={data} />} />
              <Route path="/victims" element={<VictimsPage data={data} />} />
              <Route path="/witnesses" element={<WitnessesPage data={data} />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;