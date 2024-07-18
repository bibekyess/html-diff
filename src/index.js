import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import HtmlDiff from "htmldiff-js";
import "./style.css";

function App() {
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [diffHtml, setDiffHtml] = useState({ __html: "" });

  useEffect(() => {
    const diff = HtmlDiff.execute(firstText, secondText);
    setDiffHtml({ __html: diff });
    console.log("Raw diff HTML:", diff); // Log the raw diff HTML
  }, [firstText, secondText]);

  return (
    <div className="wrapper">
      <div className="input-section">
        <div>
          <h3>Old HTML</h3>
          <textarea
            value={firstText}
            onChange={(e) => setFirstText(e.target.value)}
            placeholder="Enter the old HTML here"
            rows={10}
            cols={50}
          />
        </div>
        <div>
          <h3>New HTML</h3>
          <textarea
            value={secondText}
            onChange={(e) => setSecondText(e.target.value)}
            placeholder="Enter the new HTML here"
            rows={10}
            cols={50}
          />
        </div>
      </div>
      <div className="output-section">
        <div className="inner">
          <h3>OLD HTML</h3>
          <div dangerouslySetInnerHTML={{ __html: firstText }} />
        </div>
        <div className="inner">
          <h3>NEW HTML</h3>
          <div dangerouslySetInnerHTML={{ __html: secondText }} />
        </div>
        <div className="inner">
          <h3>DIFFERENCE</h3>
          <div dangerouslySetInnerHTML={diffHtml} />
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);