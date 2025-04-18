"use client"
import { useState } from "react";
import Image from "next/image";
import example1 from '../Images/Emaple1.jpg'
import img1 from '../Images/Image1.jpg';
import img2 from '../Images/Image2.jpg';
export default function DownloadForm() {
  const [transactionId, setTransactionId] = useState()
  const [amount,setAmount]=useState('')
  const [category,setCategory]=useState();
  const [buttonText, setbuttonText] = useState("Download templates")
  let qrc1=document.getElementsByClassName('qrcode')[0];
  let qrc2=document.getElementsByClassName('qrcode')[1];
  let qrc3=document.getElementsByClassName('qrcode')[2];
  const handleSubmit = async (e) => {
    let val=document.getElementById('category');
    
    
    qrc2.style.display="none";
    qrc3.style.display="none";
    e.preventDefault();
    setbuttonText("Requesting to download....")
   if (val.value=="Shaadi cards") {
    
    const response = await fetch('/api/download-design', { method: 'GET'})
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Templates.zip';
    a.click();
    window.URL.revokeObjectURL(url);
   }
   if (val.value=="Flaxes") {
    const response = await fetch('/api/download-flaxes', { method: 'GET'})
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Templates.zip';
    a.click();
    window.URL.revokeObjectURL(url);
   }
   if (val.value=="Posters") {
    const response = await fetch('/api/download-posters', { method: 'GET'})
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Templates.zip';
    a.click();
    window.URL.revokeObjectURL(url);
   }
   if (val.value=="Greeting cards") {
    const response = await fetch('/api/download-greeting-cards-temp', { method: 'GET'})
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Templates.zip';
    a.click();
    window.URL.revokeObjectURL(url);
   }
   if (val.value=="Id cards") {
    const response = await fetch('/api/download-id-card-temp', { method: 'GET'})
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Templates.zip';
    a.click();
    window.URL.revokeObjectURL(url);
   }
   if (val.value=="Visiting cards") {
    const response = await fetch('/api/download-visiting-card-temp', { method: 'GET'})
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Templates.zip';
    a.click();
    window.URL.revokeObjectURL(url);
   }
   
   setbuttonText("Download templates");

  };
 
  const setCharge=()=>{
    let val=document.getElementById('category');
    if (val.value=="Shaadi cards") {
      qrc1.style.display="block";
      setAmount(500);
    }
    if (val.value=="Visiting cards") {
      setAmount(200);
    }
    if (val.value=="Posters") {
      setAmount(300);
    }
    if (val.value=="Flaxes") {
      setAmount(700);
    }
    if (val.value=="Greeting cards") {
      setAmount(100);
    }
    if (val.value=="Id cards") {
      setAmount(50);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Image src={example1} width={200} height={200} alt="QR code" className="qrcode" />
        <Image src={img1} width={200} height={200} alt="QR code" className="qrcode" />
        <Image src={img2} width={200} height={200} alt="QR code" className="qrcode" />
      </div>
      <div>
        <h2>Pay the amount, and get all the desings</h2>
        <label htmlFor="category">Select your category</label>
        <div>
          <select name="category" id="category" className="field" value={category} onChange={(e)=>{setCategory(e.target.value)}}>
            <optgroup>
              <option value="Select">Select</option>
              <option value="Shaadi cards">Shaadi cards</option>
              <option value="Visiting cards">Visiting cards</option>
              <option value="Id cards">Id cards</option>
              <option value="Posters">Posters</option>
              <option value="Greeting cards">Greeting cards</option>
              <option value="Flaxes">Flaxes</option>
            </optgroup>
          </select>
        </div>
        <label htmlFor="tid">Enter the transactionId</label>
        <div>
          <input type="text" name="tId" value={transactionId} onChange={(e) => { setTransactionId(e.target.value) }} id="tid" className="field" required placeholder="Enter your transaction id" />
        </div>
        <label htmlFor="Amount">Amount</label>
        <div>
          <input type="number" name="amount" id="Amount" value={amount} className="field" onChange={setCharge} placeholder="Press any key to set amount(optional" />
        </div>
        <button type="submit">Download Templates</button>
      </div>
    </form>
  );
}
