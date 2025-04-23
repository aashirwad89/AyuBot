import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

const {onSent , recentPrompt, showResult , loading , resultData, setInput, input} = useContext(Context)

  return (
    <div className='main'>
      <div className="nav">
        <p> Ayu  -  गुरु</p>
        <img src={assets.user_icon} alt="" />
      </div>


      <div className="main-container">

{!showResult
?<>
  <div className="greet">
          <p><span>Hello👋,</span></p>
          <p> How can I help you ?</p>
        </div>
        <div className="cards">
<div className="card">
  <p>How do i identify Medicinal plants</p>
  <img src={assets.compass_icon} alt="" />
</div>
<div className="card">
  <p> What are the benefits of Tulsi?</p>
  <img src={assets.message_icon} alt="" />
</div>
<div className="card">
  <p>Can you recommend a herbal remedy for cough?</p>
  <img src={assets.bulb_icon} alt="" />
</div>
<div className="card">
  <p>Where can I find Ashwagandha plants?</p>
  <img src={assets.code_icon} alt="" />
</div>
        </div>
</>
: <div className='result'>
<div className="result-title">
  <img src={assets.user_icon} alt="" />
  <p>{recentPrompt}</p>
</div>
<div className="result-data">
  <img src={assets.gemini_icon} alt="" />
  {loading
  ?<div className='loader'>
    <hr />
    <hr />
    <hr />
  </div>
  : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
  }

  
</div>
</div>
}




      
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => {
              setInput(e.target.value)
            }} value={input} type="text" placeholder='Enter your prompt Here' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={()=> {
                onSent()
              }} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Ayu Guru may display inaccurate info , including about people and some rare plants naming , so double check it's solution
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
