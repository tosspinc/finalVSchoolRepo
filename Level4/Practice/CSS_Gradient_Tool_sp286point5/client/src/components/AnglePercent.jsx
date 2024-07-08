export default function AnglePercent({ gradientType, gradientDirection, anglePercent, handleAnglePercentChange }) {
    return (
      <div className='gradient-input'>
        <label htmlFor={`angle-percent`} className='angle-label'>Angle %: </label>
        <input 
          type='number' 
          id='angle-percent'
          name='angle-percent'
          value={anglePercent}
          min={1}
          max={360}
          onChange={handleAnglePercentChange}
          style={{ display: gradientType === 'linear' && gradientDirection === 'angle' ? 'inline-block' : 'none' }}
        />
      </div>
    )
  }
