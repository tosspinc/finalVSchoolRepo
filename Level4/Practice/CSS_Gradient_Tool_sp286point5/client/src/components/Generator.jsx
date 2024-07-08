import React, {useState, useEffect} from "react";
import ResultsSection from "./ResultsSection";
import OptionsForm from "./OptionsForm";

export default function Generator(props) {
    const [color1, setColor1] = useState('');
    const [color2, setColor2] = useState('');
    const [color3, setColor3] = useState('');
    const [gradientType, setGradientType] = useState('');
    const [gradientDirection, setGradientDirection] = useState('');
    const [anglePercent, setAnglePercent] = useState(0);
    const {gradientCSS} = props;

    const handleColor1Change = (e) => {
        setColor1(e.target.value)
    }

    const handleColor2Change = (e) => {
        setColor2(e.target.value)
    }

    const handleColor3Change = (e) => {
        setColor3(e.target.value)
    }

    const handleGradientTypeChange = (e) => {
        setGradientType(e.target.value);
        console.log(e)
    }

    console.log(handleGradientTypeChange);

    const handleGradientDirectionChange = (e) => {
        setGradientDirection(e.target.value)
    }

    const handleAnglePercentChange = (e) => {
        setAnglePercent(e.target.value)
    }

    useEffect(() => {
        if (gradientType === 'linear') {
            setGradientDirection('to right')
            setAnglePercent(0)
        }
    }, [gradientType])

    return (
        <div className="main-generator-container">
            <OptionsForm
                color1={color1}
                color2={color2}
                color3={color3}
                gradientType={gradientType}
                gradientDirection={gradientDirection}
                handleColor1Change={handleColor1Change}
                handleColor2Change={handleColor2Change}
                handleColor3Change={handleColor3Change}
                handleGradientTypeChange={handleGradientTypeChange}
                handleGradientDirectionChange={handleGradientDirectionChange}
                anglePercent={anglePercent}
                handleAnglePercentChange={handleAnglePercentChange}
            />
            <ResultsSection
                color1={color1}
                color2={color2}
                color3={color3}
                gradientType={gradientType}
                gradientDirection={gradientDirection}
                anglePercent={anglePercent}
                handleAnglePercentChange={handleAnglePercentChange}
                gradientCSS={gradientCSS}
            />
        </div>
    )
}

