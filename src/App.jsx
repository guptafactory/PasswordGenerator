import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  // variables
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 10);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed) str += "0123456789";
    if(charAllowed) str += "~`!@#$%^&*()_+-={}[];:<>,.?/|'";
    for(let i = 0; i < length; i++) {
      let ind = Math.floor(Math.random() * str.length);
      pass += str.charAt(ind);
    }
    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword]);
  useEffect(()=>{
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-500 bg-gray-800">
          <h1 className='text-white text-center m-4'>Password Generator</h1>
          <div className='flex shadow-sm rounded-lg overflow-hidden mb-4'>
            {/* password input */}
            <input type="text" 
            value={password} 
            className='outline-none w-full py-1 px-3' 
            placeholder='password' 
            readOnly
            ref={passwordRef}
            />
            {/* copy button */}
            <button onClick={copyToClipboard}  className='outline-none bg-blue-700 text-white hover:bg-sky-700  px-3 py-0.5 shrink-0'>Copy</button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              {/* password length range */}
              <input type="range" 
              min={6} 
              max={30} 
              value={length} 
              className='cursor-pointer' 
              onChange={(e) => {
                setLength(e.target.value)
              }}
              />
              <label>Length: {length}</label>
            </div>
            {/* number allowed checkbox */}
            <div className="flex items-center gap-x-1">
              <input 
              type="checkbox" 
              defaultChecked={numAllowed} 
              onChange={()=>setNumAllowed(!numAllowed)}
              />
              <label>Numbers</label>
            </div>
            {/* char allowed checkbox */}
            <div className="flex items-center gap-x-1">
              <input 
              type="checkbox" 
              defaultChecked={charAllowed} 
              onChange={()=>setCharAllowed(!charAllowed)}
              />
              <label>Characters</label>
            </div>
          </div>
      </div>
  )
}

export default App
