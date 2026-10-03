import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/modals/SearchModal';
import { CreatePostModal } from './components/modals/CreatePostModal';
import { RecogniseModal } from './components/modals/RecogniseModal';

// Pages
import { Home } from './pages/Home';
import { Feed } from './pages/Feed';
import { Impact } from './pages/Impact';
import { News } from './pages/News';
import { Events } from './pages/Events';
import { Resources } from './pages/Resources';
import { Recognition } from './pages/Recognition';
import { Leadership } from './pages/Leadership';
import { Admin } from './pages/Admin';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'feed':
        return <Feed />;
      case 'impact':
        return <Impact />;
      case 'news':
        return <News />;
      case 'events':
        return <Events />;
      case 'resources':
        return <Resources />;
      case 'recognition':
        return <Recognition />;
      case 'leadership':
        return <Leadership />;
      case 'admin':
        return <Admin />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="apple-app-shell min-h-screen flex flex-col text-slate-900 selection:bg-rose-100 selection:text-rose-900">
      <Navbar />
      <main className="flex-1 max-w-[88rem] w-full mx-auto px-4 sm:px-6 lg:px-10 py-7 sm:py-10">
        {renderActivePage()}
      </main>
      <Footer />

      {/* Global Modals */}
      <SearchModal />
      <CreatePostModal />
      <RecogniseModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
