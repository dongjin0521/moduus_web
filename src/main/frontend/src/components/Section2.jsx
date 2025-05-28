import React from "react";
import x26 from "./Elements2/26.png";
import AI from "./Elements2/AI.png";
import aboutUs from "./Elements2/about-us.png";
import image59 from "./Elements2/image-59.png";
import image91 from "./Elements2/image-91.png";
import image from "./Elements2/image.png";
import moduusAiStudioAi from "./Elements2/moduus-AI.png";
import ourMission from "./Elements2/our-mission.png";
import ourVision from "./Elements2/our-vision.png";
import rectangle94 from "./Elements2/rectangle-94.png";
import rectangle95 from "./Elements2/rectangle-95.png";
import rectangle103 from "./Elements2/rectangle-103.png";
import rectangle104 from "./Elements2/rectangle-104.png";
import "./Section2.css";
import vector2 from "./Elements2/vector-2.png";

export const Section2 = () => {
  return (
    <div className="element">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <img className="img" alt="Element" src={x26} />

          <img className="image" alt="Image" src={image59} />

          <img className="rectangle" alt="Rectangle" src={rectangle94} />

          <img className="image-2" alt="Image" src={image91} />

          <img className="about-us" alt="About us" src={aboutUs} />

          <img className="our-mission" alt="Our mission" src={ourMission} />

          <img className="our-vision" alt="Our vision" src={ourVision} />

          <img
            className="moduus-AI-studio-AI"
            alt="Moduus AI studio AI"
            src={moduusAiStudioAi}
          />

          <img className="vector" alt="Vector" src={vector2} />

          <img className="rectangle-2" alt="Rectangle" src={rectangle95} />

          <img className="rectangle-3" alt="Rectangle" src={rectangle103} />

          <img className="rectangle-4" alt="Rectangle" src={rectangle104} />

          <img className="AI" alt="Ai" src={AI} />

          <img className="image-3" alt="Image" src={image} />
        </div>
      </div>
    </div>
  );
};

export default Section2;