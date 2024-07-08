import React from 'react';
import ColorView from './ColorView';

export default function CodeView({ color1, color2, color3, gradientType, gradientDirection, anglePercent }) {
    const generateGradientCSS = (color1, color2, color3, gradientDirection, anglePercent, type) => {
      let gradientCSS;
    
      if (color1 && color2 && color3) {
          if (type === 'linear') {
              if (gradientDirection === 'angle') {
                  gradientCSS = `linear-gradient(${anglePercent}deg, ${color1}, ${color2}, ${color3})`;
              } else if (gradientDirection === 'top2bottom') {
                  gradientCSS = `linear-gradient(${color1}, ${color2}, ${color3})`;
              } else if (gradientDirection === 'left2right') {
                  gradientCSS = `linear-gradient(to right, ${color1}, ${color2}, ${color3})`;
              } else if (gradientDirection === 'diagonal') {
                  gradientCSS = `linear-gradient(to bottom right, ${color1}, ${color2}, ${color3})`;
              }        
          } else if (type === 'radial') {
        gradientCSS = `radial-gradient(circle, ${color1}, ${color2}, ${color3})`;
      } else if (type === 'conic') {
        gradientCSS = `conic-gradient(${color1}, ${color2}, ${color3})`;
      }
  } else {
      gradientCSS = 'linear-gradient(45deg, #e8e8e8, #f8f8f8)';
    }
    
      return {
        gradientCSS,
        gradientType: type
      };
    };
   
    const { gradientCSS, gradientType: type } = generateGradientCSS(color1, color2, color3, gradientDirection, anglePercent, gradientType);
  
    console.log(gradientCSS)
  
    return (
      <div className="results-view-code-container">
        <h3>Copy and Paste this code into your css file:</h3>
        <pre className="css-code">
          background: {gradientCSS}
          <br/>
          -moz-background: {gradientCSS}
          <br/>
          -webkit: {gradientCSS}
      </pre>
        <ColorView
          gradientType={gradientType} 
          gradientCSS={gradientCSS} 
          type={type} 
          gradientDirection={gradientDirection}
        />
      </div>
    );
  }
  