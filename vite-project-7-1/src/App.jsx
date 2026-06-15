import { useState } from 'react';
import './App.css';

const greetings = {
  Spanish: "Buenos días",
  "Haitian Creole": "Bon maten",
  Portuguese: "Bom dia",
  French: "Bonjour",
  Japanese: "おはようございます"
};

const GreetingDisplay = ({ fontSize, greeting }) => {
  return (
    <h1 style={{ fontSize: `${fontSize}px` }}>{greeting}</h1>
  );
};

const SizeButtons = ({ increment, decrement }) => {
  return (
    <>
      <button onClick={increment}>A+</button>
      <button onClick={decrement}>A-</button>
    </>
  );
};

const LanguageButtons = ({ activeLanguage, onLanguageClick }) => {
  return (
    <div>
      {Object.keys(greetings).map((language) => (
        <button
          key={language}
          onClick={() => onLanguageClick(language)}
          className={activeLanguage === language ? 'active' : ''}
        >
          {language}
        </button>
      ))}
    </div>
  );
};

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <button onClick={toggleTheme}>
      {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

const ClickHistory = ({ history, clearHistory }) => {
  return (
    <div>
      <h2>History</h2>
      <ul>
        {history.map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
      <button onClick={clearHistory}>Clear History</button>
    </div>
  );
};

function App() {
  const [greeting, setGreeting] = useState("Good Morning");
  const [fontSize, setFontSize] = useState(42);
  const [activeLanguage, setActiveLanguage] = useState(null);
  const [history, setHistory] = useState([]);
  const [isDark, setIsDark] = useState(false);

  const increment = () => setFontSize(fontSize === 72 ? 72 : fontSize + 6);
  const decrement = () => setFontSize(fontSize === 12 ? 12 : fontSize - 6);

  const handleLanguageClick = (language) => {
    setActiveLanguage(language);
    setGreeting(greetings[language]);
    setHistory((prev) => [language, ...prev].slice(0, 5));
  };

  const toggleTheme = () => setIsDark(!isDark);
  const clearHistory = () => setHistory([]);

  return (
    <main className={isDark ? 'dark' : 'light'}>
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <SizeButtons increment={increment} decrement={decrement} />
      <GreetingDisplay fontSize={fontSize} greeting={greeting} />
      <LanguageButtons activeLanguage={activeLanguage} onLanguageClick={handleLanguageClick} />
      <ClickHistory history={history} clearHistory={clearHistory} />
    </main>
  );
}

export default App;
