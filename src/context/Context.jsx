import { createContext, useEffect, useState } from "react"; 
import run from "../config/Ayuguru";


export  const Context = createContext();

const ContextProvider = (props) => {

  const [input, setInput] = useState("");
  const [recentPrompt , setRecentPrompt] = useState("");
  const [previousPrompt , setPreviousPrompt] = useState([]);
  const [showResult , setShowResult] = useState(false);
  const [loading ,setLoading] = useState(false);
  const [resultData , setResultData] = useState("");


const delayPara = (index, nextWord)=>{
setTimeout(function(){
setResultData(prev=> prev+nextWord)
}, 75*index)
}

const newChat = ()=>{
  setLoading(false)
  setShowResult(false)
}

  
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response ;
    if (prompt!== undefined){
        response = await run(prompt);
        setRecentPrompt(prompt)


    }else {
      setPreviousPrompt(prev=> [...prev, input])
      setRecentPrompt(input)
      response= await run(input)
    }
  let responseArray = response.split("**")
  let newResponse = "" ;
  for(let i=0; i<responseArray.length; i++){
    if(i===0 || i%2 !==1){
newResponse += responseArray[i];
    }
    else{
      newResponse += "<br>"+responseArray[i]+"</br>";
    }
  }
  let newResponse2 = newResponse.split("*").join("</br>")
  let newResponsearray = newResponse2.split(" ");
  for(let i=0; i< newResponsearray.length; i++){
    const nextWord = newResponsearray[i];
    delayPara(i, nextWord+" ")
  }
  setLoading(false);
  setInput("");

  };

  useEffect(() => {
    // Calling the onSent function inside useEffect to avoid side effects in the component body.
    
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const contextValue = {
    previousPrompt, 
    setPreviousPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt, 
    showResult, 
    loading,
    resultData,
    input,
    setInput,
   newChat

  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
 