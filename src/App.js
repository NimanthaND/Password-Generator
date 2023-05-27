import React, { useState } from 'react';
import './App.css';

const generatePassword = (length, includeWord, includeUppercase, includeLowercase, includeNumbers, includeSymbols) => {
  const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
  };
  let availableCharacters = '';

  if (includeUppercase) {
    availableCharacters += characters.uppercase;
  }

  if (includeLowercase) {
    availableCharacters += characters.lowercase;
  }

  if (includeNumbers) {
    availableCharacters += characters.numbers;
  }

  if (includeSymbols) {
    availableCharacters += characters.symbols;
  }

  const word = includeWord;
  const wordLength = word.length;
  let password = '';

  while (password.length < length) {
    if (includeWord && password.length < wordLength) {
      password += word.charAt(password.length);
    } else {
      password += availableCharacters.charAt(Math.floor(Math.random() * availableCharacters.length));
    }
  }

  return password;

};

const App = () => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeWord, setIncludeWord] = useState('');
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handlePasswordLengthChange = (event) => {
    const length = parseInt(event.target.value, 10);
    setPasswordLength(length);
  };

  const handleIncludeWordChange = (event) => {
    setIncludeWord(event.target.value);
  };

  const handleIncludeUppercaseChange = () => {
    setIncludeUppercase(!includeUppercase);
  };

  const handleIncludeLowercaseChange = () => {
    setIncludeLowercase(!includeLowercase);
  };

  const handleIncludeNumbersChange = () => {
    setIncludeNumbers(!includeNumbers);
  };

  const handleIncludeSymbolsChange = () => {
    setIncludeSymbols(!includeSymbols);
  };

  const handleGeneratePassword = () => {
    const password = generatePassword(passwordLength, includeWord, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    setGeneratedPassword(password);
  };

  const handleCopyToClipboard = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword)
        .then(() => {
          alert('Password copied to clipboard!');
        })
        .catch((error) => {
          console.error('Failed to copy password:', error);
        });
    }
  };

  return (
    <div className="container">
      <h2>Password Generator</h2>

      <div className="form-container">
        <div className="input-group">
          <label htmlFor="passwordLength">Password Length:</label>
          <input
            type="number"
            id="passwordLength"
            min="7"
            max="20"
            value={passwordLength}
            onChange={handlePasswordLengthChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="includeWord">Include Word:</label>
          <input
            type="text"
            id="includeWord"
            value={includeWord}
            onChange={handleIncludeWordChange}
            style={{ width: '125px' }}
          />
        </div>

        <div className="checkbox-group">
          <label>
            Include Uppercase Letters
            <input className='tabs'
              type="checkbox"
              checked={includeUppercase}
              onChange={handleIncludeUppercaseChange}
            />
          </label>
          <label>
            Include Lowercase Letters
            <input className='tabs'
              type="checkbox"
              checked={includeLowercase}
              onChange={handleIncludeLowercaseChange}
            />
          </label>
          <label>
            Include Numbers
            <input className='tabs2'
              type="checkbox"
              checked={includeNumbers}
              onChange={handleIncludeNumbersChange}
            />
          </label>
          <label>
            Include Symbols
            <input className='tabs3'
              type="checkbox"
              checked={includeSymbols}
              onChange={handleIncludeSymbolsChange}
            />
          </label>
        </div>
        <div className='button-group'>
        <button className="generate-button" onClick={handleGeneratePassword}>Generate Password</button>
        </div>

        {generatedPassword && (
          <div className="result">
            <h3>Generated Password:</h3>
           <div className="pass-generate-box">
            <p className="highlighted">{generatedPassword}</p>
           </div>
           <div className='button-group'>
            <button className="copy-button" onClick={handleCopyToClipboard}>Copy to Clipboard</button>
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default App;


