import React from "react"

export default function GradientOptions(props) {
    const {gradientType, handleGradientTypeChange} = props
       return (
           <div className='gradient-option'>
               <h3>Gradient Type</h3>
               <div className='gradient-input'>
                   <input 
                       type="radio" 
                       id="linear" 
                       name="gradient-type"
                       value="linear"
                       checked={gradientType === 'linear'}
                       onChange={handleGradientTypeChange}
                   />
                   <label htmlFor="linear">Linear</label>
                   <input 
                       type="radio" 
                       id="radial" 
                       name="gradient-type"
                       value="radial"
                       checked={gradientType === 'radial'}
                       onChange={handleGradientTypeChange}
                   />
                   <label htmlFor="radial">Radial</label>
                   <input 
                       type="radio" 
                       id="conic" 
                       name="gradient-type"
                       value="conic"
                       checked={gradientType === 'conic'}
                       onChange={handleGradientTypeChange}
                   />
                   <label htmlFor="conic">Conic</label>
               </div>
           </div>
       )
   }