import "./styles.scss"
import { useState, useRef, useEffect } from "react";
import {FaClipboard} from "react-icons/fa";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import{
       number,
       upperCaseLetters, 
       lowerCaseLetters, 
       specialCharacters,
      } from "./Characters";

import {COPY_SUCCESS, ALERT} from "./Messages";


toast.configure();

function App() {

  const[password, setPassword] =useState("");
  const[passwordLength, setPasswordLength] = useState(20);
  const[uppercase, setUpperCase] = useState(true);
  const[lowercase, setLowerCase] = useState(true);
  const[numbers, setNumbers] = useState(true);
  const[symbols, setSymbols] = useState(true);

  const copyBtn = useRef();

  const handleGeneratorPassword=()=> {
    if(!uppercase && !lowercase && !numbers && !symbols){
      notifs(ALERT, true);
    }

    let characterList = "";
    if(uppercase){
      characterList += upperCaseLetters;
    }

    if(lowercase){
      characterList += lowerCaseLetters;
    }

    if(numbers){
      characterList += number;
    }

    if(symbols){
      characterList += specialCharacters;
    }
    setPassword(passwordCreator(characterList));
  };

  useEffect(() => {
    handleGeneratorPassword();
  }, []);
 
  const passwordCreator=(characterList)=>{
    let password = "";
    const characterListLength = characterList.length;

    for(let i = 0; i < passwordLength; i++){
      const characterIndex = generateRandomIndex(characterListLength);
      password = password + characterList.charAt(characterIndex)
    }
    return password;
    console.log(password);
  };
  const generateRandomIndex=(limit)=>{
    return Math.round(Math.random() * limit);
  };

  const copyFromClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();

    copyBtn.current.disabled = true;
    setTimeout(() => {
      copyBtn.current.disabled = false;
    }, 3000);
  };

  const notifs = (message, Error = false) => {
    if(Error){
      toast.error(message,{
        position:toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        progress:undefined,
    });
   }else{
    toast(message,{
      position:toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar:false,
      closeOnClick:true,
      pauseOnHover:true,
      draggable:true,
      progress:undefined,
    });
   }
  };

  const handleCopy = () => {
    copyFromClipboard();
    notifs(COPY_SUCCESS);
  }

  return (
    <div className="container">
      <div className="generator">
        <h2 className="generator_header">Password Generator</h2>
        <div className="generator_password">
          {password}
          <button className="generator_passwordGenerateBtn" 
                  ref={copyBtn} 
                  onClick={handleCopy} >

            <FaClipboard />
          </button>
        </div>
        <div className="form-group">
          {/* scrollbox for set the password length */}
          <label htmlFor="password-length">Password Length</label>
          <input name="password-length" 
                 id="password-length" 
                 type="number" 
                 max="20"
                 min="7"
                 defaultValue={passwordLength}
                 onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>
        <div className="form-group">
          {/* checkbox for include Uppercase letters for the password */}
          <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
          <input id="uppercase-letters" 
                 name="uppercase-letters" 
                 type="checkbox"
                 checked={uppercase}
                 onChange={(e) => {
                  setUpperCase(e.target.checked);
                 }}
          />
        </div>
        <div className="form-group">
          {/* checkbox for include Lowercase letters for the password */}
          <label htmlFor="lowercase-letters">Include Lowercase Letters</label>
          <input id="lowercase-letters" 
                 name="lowercase-letters" 
                 type="checkbox"
                 checked={lowercase}
                 onChange={(e) =>{
                  setLowerCase(e.target.checked);
                 }}
          />
        </div>
        <div className="form-group">
          {/* checkbox for include numbers for the password */}
          <label htmlFor="include-numbers">Include Numbers</label>
          <input id="include-numbers" 
                 name="include-numbers" 
                 type="checkbox"
                 checked={numbers}
                 onChange={(e) => {
                  setNumbers(e.target.checked);
                 }}
          />
        </div>
        <div className="form-group">
          {/* checkbox for include symbols for the password */}
          <label htmlFor="include-symbols">Include Symbols</label>
          <input id="include-symbols" 
                 name="include-symbols" 
                 type="checkbox"
                 checked={symbols}
                 onChange={(e) => {
                  setSymbols(e.target.checked);
                 }}
          />
        </div>
        {/* generator button */}
        <button className="generator_btn" onClick={handleGeneratorPassword}>
          Generate New Password
        </button>
      </div>
    </div>
  );
}

export default App;
