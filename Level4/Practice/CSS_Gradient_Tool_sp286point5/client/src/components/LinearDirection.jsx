import AnglePercent from "./AnglePercent";

export default function LinearDirection(props) {
    const {gradientDirection, handleGradientDirectionChange, gradientType, anglePercent, handleAnglePercentChange} = props
    return (
        <div className='linear-direction '>
            <h4>Linear Direction</h4>
            <div className='gradient-input'>
                <input 
                    type="radio" 
                    id="top2bottom" 
                    name="linear-direction"
                    checked={gradientDirection === 'top2bottom'}
                    value="top2bottom"
                    onChange={handleGradientDirectionChange}
                />
                <label htmlFor="top2bottom">Top to Bottom</label>
                <input 
                    type="radio" 
                    id="left2right" 
                    name="linear-direction"
                    checked={gradientDirection === 'left2right'}
                    value="left2right"
                    onChange={handleGradientDirectionChange}
                />
                <label htmlFor="left2right">Left to Right</label>
                <input 
                    type="radio" 
                    id="diagonal" 
                    name="linear-direction"
                    checked={gradientDirection === 'diagonal'}
                        value="diagonal"
                        onChange={handleGradientDirectionChange}
                    />
                    <label htmlFor="diagonal">Diagonal</label>
                    <input 
                        type="radio" 
                        id="angle" 
                        name="linear-direction"
                        checked={gradientDirection === 'angle'}
                        value="angle"
                        onChange={handleGradientDirectionChange}
                    />
                    <label htmlFor="angle">Custom Angle</label>
                    {gradientType === 'linear' && gradientDirection === 'angle' && (
                        <AnglePercent
                            gradientType={gradientType}
                            gradientDirection={gradientDirection}
                            anglePercent={anglePercent}
                            handleAnglePercentChange={handleAnglePercentChange}
                      />
                    )}
                </div>
            </div>
        )
}