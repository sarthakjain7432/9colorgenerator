import React, { useState } from 'react';
import Values from 'values.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ColorGenerator = () => {
  const [color, setColor] = useState('');
  const [list, setList] = useState([]);

  const generateColors = () => {
    try {
      const colorValues = new Values(color);
      setList(colorValues.all(10));
    } 
    catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleEnter=(e)=>{
    if(e.key === "Enter"){
      generateColors();
    }
  }

  const copied= () => {
  toast.success('Color copied to clipboard', {
    position: "top-center",
    autoClose: 3000, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

  return (
    <div>
      <div style={{"display":"flex","justifyContent":"center","alignItems":"center","marginTop":"30px"}}>
       <div style={{"fontSize":"28px"}}>Color Generator</div>
       <input type="text" style={{"height":"30px","marginLeft":"20px"}} value={color} onChange={(e)=>setColor(e.target.value)} onKeyDown={handleEnter}/>
       <button style={{"height":"36px","backgroundColor":color}} onClick={generateColors}>Submit</button>        
      </div>     
        <div style={{display:"flex","flexWrap":"wrap",marginTop:"40px"}}>
          {list.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: item.hexString(),
                  width:"227px",
                  height:"120px"
                }}
                onClick={()=>
                <>
                navigator.clipboard.writeText(item.hexString())
                {copied()}
                </>
                }
              >
                <div className={index > 10 ? "inWhite" : ""}>{item.hexString()}</div>
                <div className={index > 10 ? "inWhite" : ""}>{item.weight}%</div>
              </div>
          ))}
        </div>
        <ToastContainer />
    </div>
  );
};

export default ColorGenerator;



