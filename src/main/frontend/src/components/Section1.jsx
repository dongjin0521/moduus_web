import React from "react";
import x25 from "./Elements1/25.png";
import frame35 from "./Elements1/frame-35.png";
import frame36 from "./Elements1/frame-36.png";
import frame37 from "./Elements1/frame-37.png";
import frame38 from "./Elements1/frame-38.png";
import image132 from "./Elements1/image132.png";
import image141 from "./Elements1/image141.png";
import image146 from "./Elements1/image146.png";
import image147 from "./Elements1/image147.png";
import image148 from "./Elements1/image148.png";
import image from "./Elements1/wekor.png";
import moduusAiStudio from "./Elements1/ModuusAiStudio.png";
import rectangle94 from "./Elements1/Rectangle94.png";
import "./Section1.css";
import weCaptureYourBrandSEmotionInATrendyWay from "./Elements1/we.png";

export const Section1 = () => {
    return (
        <div className="element">
            <div className="overlap-group-wrapper">
                <div className="overlap-group">
                    <img className="img" alt="Element" src={x25} />

                    <img className="image" alt="Image" src={image147} />

                    <img className="image-2" alt="Image" src={image146} />

                    <img className="image-3" alt="Image" src={image141} />

                    <img className="image-4" alt="Image" src={image132} />

                    <img className="image-5" alt="Image" src={image148} />

                    <img className="rectangle" alt="Rectangle" src={rectangle94} />

                    <img
                        className="moduus-ai-studio"
                        alt="Moduus ai studio"
                        src={moduusAiStudio}
                    />

                    <img className="img-2" alt="Img" src={image} />

                    <img
                        className="we-capture-your"
                        alt="We capture your"
                        src={weCaptureYourBrandSEmotionInATrendyWay}
                    />

                    <img className="frame" alt="Frame" src={frame35} />

                    <img className="frame-2" alt="Frame" src={frame37} />

                    <img className="frame-3" alt="Frame" src={frame36} />

                    <img className="frame-4" alt="Frame" src={frame38} />
                </div>
            </div>
        </div>
    );
};

export default Section1;