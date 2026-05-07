import { useState } from 'react';

const greetings = {
  English: "Good Morning",
  Spanish: "Buenos días",
  "Haitian Creole": "Bon maten",
  Portuguese: "Bom dia",
  French: "Bonjour",
  Japanese: "おはようございます"
};

const GreetingDisplay = ({ fontSize, greeting }) => {
  return (
    <h1 style={{ fontSize: `${fontSize}px` }}>{greeting}</h1>
  )
};

const SizeButtons = ({ increment, decrement }) => {
  return (
    <>
      <button onClick={increment}>A+</button>
      <button onClick={decrement}>A-</button>
    </>
  )
};

const LanguageButton = ({ language, isActive, onClick }) => {
  return (
    <ul>
      <button onClick={onClick} className={isActive ? 'active' : ''}>
        {language}
      </button>
    </ul>
  )
};

function App() {
  const [greeting, setGreeting] = useState("Good Morning")
  const [fontSize, setFontSize] = useState(42)
  const [activeLanguage, setActiveLanguage] = useState("English")
  const [history, setHistory] = useState([])

  const increment = () => setFontSize(fontSize === 72 ? 72 : fontSize + 6)
  const decrement = () => setFontSize(fontSize === 12 ? 12 : fontSize - 6)

  const handleLanguageClick = (language) => {
    setActiveLanguage(language)
    setGreeting(greetings[language])
    setHistory((prev) => [language, ...prev].slice(0, 5))
  }

  return (
    <main>
      <SizeButtons increment={increment} decrement={decrement} />
      <GreetingDisplay fontSize={fontSize} greeting={greeting} />
      <ul>
        {Object.keys(greetings).map((language) => (
          <LanguageButton
            key={language}
            language={language}
            isActive={activeLanguage === language}
            onClick={() => handleLanguageClick(language)}
          />
        ))}
      </ul>
    </main>
  )
}

export default App