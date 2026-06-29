import { useState } from 'react';
import type { Language } from './utils/translations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { KeyFeatures } from './components/KeyFeatures';
import { WatchImpact } from './components/WatchImpact';
import { VoicesFromLoom } from './components/VoicesFromLoom';
import { Awards } from './components/Awards';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header
        currentLang={language}
        setLang={setLanguage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main>
        <Hero currentLang={language} />
        <KeyFeatures currentLang={language} />
        <WatchImpact currentLang={language} />
        <VoicesFromLoom currentLang={language} />
        <Awards currentLang={language} />
      </main>
      <Footer currentLang={language} />
      <WhatsAppButton />
    </>
  );
}

export default App;
