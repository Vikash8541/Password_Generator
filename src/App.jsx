import { useCallback, useEffect, useRef, useState } from "react";

// Task - 1 -> what we need to change , so we for all them useState hook
// Task - 2 -> to generate a random password with proper optimization and we are using the same functionality , for when the length range change , number check and uncheck and character check and uncheck . So for this we use useCallback hook. useCallback , is use basically when we defined same functionality for multiple places and save caches in memories and also help to optimize the code . useCallback passes 1. function , 2. dependencies
// Task -3 - useEffect hook use for rendering the passwordGenerator function and also help change anything in the value then function will restart again.
// Task - 4 -> add functionality for the copy the password text only useRef and useCallback.
// Task - 5 -> It add by me , change the state or design of the copy button when copy the password and also add the dependence using useEffect hook.

const App = () => {
  // Task - 1 - done
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copybtn, setCopyBtn] = useState("copy");
  const [copybtnbg, setCopyBtnBg] = useState("blue");

  // Task - 2

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}[]`";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char); // Fix: charAt uses index directly
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // Task - 3
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  // Task - 4
  // useRef () => to help to get the reference of the values

  const passwordRef = useRef(null);
  // to copy the password value as reference

  // Now create a function for copy the password value using useCallback fn to optimize it also.

  const PasswordGeneratorCopy = useCallback(() => {
    // now how to know the text is copy or not. So we use passwordRef variable
    // passowrdRef - variable, .current -> to copy the current values , ?.select - it select the optional value , because we don't the current value , it could be zero also. passwordRef it will also help to optimize the code.
    passwordRef.current?.select();
    // setSelectionRange() -> It help to declare the range of the copy of the password.- It also help to optimize.
    passwordRef.current?.setSelectionRange(0, 20);
    // It will copy the password text , writeText will help to copy the password
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // Task 5

  const copyButtonChange = useCallback(() => {
    setCopyBtn("copied");
    setCopyBtnBg("green");
  }, []);

  // New Task: Reset the button state when dependencies change (length, numberAllowed, charAllowed)
  useEffect(() => {
    setCopyBtn("copy");
    setCopyBtnBg("blue");
  }, [length, numberAllowed, charAllowed]); // Resets when any dependency changes

  return (
    <>
      <div className="flex items-center justify-center flex-col mt-10">
        <div className="text-center">
          <h1 className="text-3xl text-center font-bold">Password Generator</h1>
        </div>
        <div className="password-box bg-gray-700 h-auto flex-col rounded-md w-[1200px] mt-6 flex items-start justify-center p-4">
          <div className="password-input flex items-center justify-center mb-3">
            <input
              type="text"
              value={password}
              placeholder="Password"
              className="text-black h-[50px] w-[1000px] pl-3 text-xl rounded-s-md outline-none"
              readOnly
              ref={passwordRef}
            />
            <button
              className="py-3.5 outline-none px-5 flex items-center justify-center rounded-e-md text-white"
              onClick={() => {
                copyButtonChange();
                PasswordGeneratorCopy();
              }}
              style={{ backgroundColor: copybtnbg }}
            >
              {copybtn}
            </button>
          </div>
          <div className="flex items-center justify-center gap-3">
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">Length ({length})</label>
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numbers">Numbers</label>
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characters">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;