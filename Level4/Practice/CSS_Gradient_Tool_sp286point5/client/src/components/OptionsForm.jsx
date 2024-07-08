import React from 'react';
import GradientOptions from './GradientOptions';
import LinearDirection from './LinearDirection';

export default function OptionsForm(props) {
    const {
        color1,
        color2,
        color3,
        gradientType,
        gradientDirection,
        anglePercent,
        handleColor1Change,
        handleColor2Change,
        handleColor3Change,
        handleGradientTypeChange,
        handleGradientDirectionChange,
        handleAnglePercentChange,
      } = props;

  return (
    <div className="options-form-container">
        <form>
            <h3>Color Choices</h3>
            <div className="color-input">
                <h4>Color 1</h4>
                <div className="input-color-code">{color1}</div>
                <input type="color" onChange={handleColor1Change} value={color1} />
            </div>
            <div className="color-input">
                <h4>Color 2</h4>
                <div className="input-color-code">{color2}</div>
                <input type="color" onChange={handleColor2Change} value={color2} />
            </div>
            <div className="color-input">
                <h4>Color 3</h4>
                <div className="input-color-code">{color3}</div>
                <input type="color" onChange={handleColor3Change} value={color3} />
            </div>            
            <GradientOptions 
                gradientType={gradientType}
                gradientDirection={gradientDirection}
                handleGradientTypeChange={handleGradientTypeChange}
                handleGradientDirectionChange={handleGradientDirectionChange}
            />
            {gradientType === 'linear' && (
                <LinearDirection 
                    gradientDirection={gradientDirection}
                    gradientType={gradientType}
                    handleGradientDirectionChange={handleGradientDirectionChange}
                    anglePercent={anglePercent}
                    handleAnglePercentChange={handleAnglePercentChange}
                />                   
            )}   
        </form>
    </div>
);}