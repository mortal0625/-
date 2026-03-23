import { useState } from 'react';
import { Shield, LayoutDashboard, ScanFace, FileSearch, Menu, X, Link, Mic, Presentation } from 'lucide-react';
import { cn } from './utils';
import Dashboard from './components/Dashboard';
import MediaScanner from './components/MediaScanner';
import LogAnalyzer from './components/LogAnalyzer';
import PhishingChecker from './components/PhishingChecker';
import AudioScanner from './components/AudioScanner';
import PresentationMode from './components/PresentationMode';

type Tab = 'dashboard' | 'scanner' | 'audio' | 'phishing' | 'analyzer' | 'presentation';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: '系統總覽', icon: LayoutDashboard },
    { id: 'scanner', label: '影像深偽掃描', icon: ScanFace },
    { id: 'audio', label: '語音深偽分析', icon: Mic },
    { id: 'phishing', label: '釣魚連結防護', icon: Link },
    { id: 'analyzer', label: '日誌與威脅分析', icon: FileSearch },
    { id: 'presentation', label: '專案報告模式', icon: Presentation },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'scanner': return <MediaScanner />;
      case 'audio': return <AudioScanner />;
      case 'phishing': return <PhishingChecker />;
      case 'analyzer': return <LogAnalyzer />;
      case 'presentation': return <PresentationMode />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans flex selection:bg-indigo-500/30">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-zinc-900 border-r border-zinc-800 fixed h-full z-20">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-inner shadow-indigo-400/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              TrueSight
            </h1>
          </div>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive 
                    ? "bg-indigo-600/10 text-indigo-400" 
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800/50">
            <p className="text-xs text-zinc-500 mb-2">邊緣防護引擎</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-400">線上 (v2.4.1)</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-900 border-b border-zinc-800 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold text-white">TrueSight</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-zinc-400">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-zinc-950 z-20 p-4">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-4 rounded-xl text-base font-medium transition-all",
                    isActive 
                      ? "bg-indigo-600/10 text-indigo-400" 
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen bg-zinc-950">
        <div className="max-w-6xl mx-auto p-6 md:p-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
