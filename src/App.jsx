
import './App.css'
import React, { useState } from 'react';



const App = () => {
  const [imag,setimage]=useState("")
  const [isloading ,setisloading]=useState(false)
  const [finalresult,setresult]=useState("Please wait QR code is generating......")
  const [qrdata,setqrdata]=useState("https://mr-shan-portfolio369dc.netlify.app/")
  const [qrsize,setsize]=useState("150")
  const Generatebutton= async()=>{
    setisloading(true)
    
    if(qrdata!=""){
      setisloading(false)
      if(qrsize!=""){
        try {
          const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`
          setimage(url)
          setisloading(false)
          setqrdata("")
          setsize("")
         } catch (error) {
          alert("try again")
          setisloading(false)
         }finally{
          setisloading(false)
         }
         
      }
      else{
        alert("PLEASE ENTER YOUR IMAGE SIZE")
        setisloading(false)
      }
    }
    else{
      alert("PLEASE ENTER YOUR  QR DATA")
      setisloading(false)
    }
  }

  const dowloadingbutton=()=>{
    fetch(imag).then((response)=>response.blob()).then((blob)=>{
      const links =document.createElement("a")
        links.href=URL.createObjectURL(blob)
        links.download="QRcode.png"
       document.body.appendChild(links)
       links.click()
       document.body.removeChild(links)
       
    })
  }

  return (
    <div className='container class_container'>
       
      <div className='row'>
        <div className='col-12'>
        <h1>QR CODE GENERATOR</h1>
        {isloading?<p>{finalresult}</p>:<div className='imageposition'>
      <img src={imag} className='qr-image'/>
      </div>}
        
      <div>
        <label htmlFor='datainput' className='inputlabel'>Data for QR Code</label>
        <input type='text' id='datainput' value={qrdata} onChange={(e)=>setqrdata(e.target.value)} disabled={isloading} placeholder='Enter data for QR code'/>
        <label htmlFor='sizeinput' className='inputlabel'>Image size (e.g.,150)</label>
        <input type='text' id='sizeinput' value={qrsize}    onChange={(e)=>setsize(e.target.value)}  placeholder='Enter image size'/>
        <button className='Generate_button' onClick={Generatebutton}>Generate QR Code</button>
        <button className='Dowload_button' onClick={dowloadingbutton}>Dowload QR Code</button>
       
        </div>
        <p>Designed By <a href='https://mr-shan-portfolio369dc.netlify.app/' target='_blank'>Shanmugam</a></p>
        
      </div>
      </div>
     
    </div>
    
  );
};

export default App;