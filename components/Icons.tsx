
import React from 'react';

export const IconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {children}
  </svg>
);

export const DashboardIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></IconWrapper>;
export const CasesIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></IconWrapper>;
export const SuspectsIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></IconWrapper>;
export const DetectivesIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></IconWrapper>;
export const VictimsIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1.5a2.5 2.5 0 00-5 0V21" /></IconWrapper>;
export const WitnessesIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></IconWrapper>;
export const MenuIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></IconWrapper>;
export const CloseIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></IconWrapper>;
export const LogoIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M10.25 2.25a.75.75 0 00-1.5 0v1.23a.75.75 0 01-1.5 0V2.25a.75.75 0 00-1.5 0v1.23a.75.75 0 01-1.5 0V2.25a.75.75 0 00-1.5 0v1.94c0 .85.316 1.65.856 2.258l4.018 4.498a.75.75 0 001.192-.916L5.05 6.944a.75.75 0 01.192-.916L9.5 2.25a.75.75 0 00.75-.75zM13.75 2.25a.75.75 0 011.5 0v1.23a.75.75 0 001.5 0V2.25a.75.75 0 011.5 0v1.23a.75.75 0 001.5 0V2.25a.75.75 0 011.5 0v1.94c0 .85-.316 1.65-.856 2.258l-4.018 4.498a.75.75 0 01-1.192-.916l3.434-5.056a.75.75 0 00-.192-.916L14.5 2.25a.75.75 0 01-.75-.75zM12 21.75a3 3 0 100-6 3 3 0 000 6z"></path></svg>;
export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></IconWrapper>;
export const XCircleIcon = () => <IconWrapper className="text-danger"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></IconWrapper>;
export const InfoIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></IconWrapper>;
export const ArrowRightIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></IconWrapper>;
export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></IconWrapper>;
export const SearchIcon = () => <IconWrapper><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></IconWrapper>;
export const UsersIcon = () => <IconWrapper className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></IconWrapper>;
export const ArrowUpIcon = () => <IconWrapper className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></IconWrapper>;
export const ArrowDownIcon = () => <IconWrapper className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></IconWrapper>;
export const LinkIcon = () => <IconWrapper className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.356-1.356l-1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></IconWrapper>;