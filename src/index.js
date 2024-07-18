import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import HtmlDiff from "htmldiff-js";
import "./style.css";

const sampleHtml1 = `
<table style="border-collapse: collapse; border: 1px solid black; padding: 8px; text-align: left;">
  <tr>
    <td rowspan="2" style="border: 1px solid black;">정비종류</td>
    <td rowspan="2" style="border: 1px solid black;">약호</td>
    <td colspan="2" style="border: 1px solid black;">정비주기</td>
    <td rowspan="2" style="border: 1px solid black;">비고</td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">운행거리( )㎞</td>
    <td style="border: 1px solid black;">운행기간</td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">반복정비</td>
    <td style="border: 1px solid black;">RS</td>
    <td style="border: 1px solid black;">일 회1 1</td>
    <td style="border: 1px solid black;">-</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">기본정비</td>
    <td style="border: 1px solid black;">ES</td>
    <td style="border: 1px solid black;">1,200</td>
    <td style="border: 1px solid black;">-</td>
    <td style="border: 1px solid black;">일 운행 후3</td>
  </tr>
  <tr>
    <td rowspan="3" style="border: 1px solid black;">경정비 </td>
    <td style="border: 1px solid black;">LI-1</td>
    <td style="border: 1px solid black;">0</td>
    <td style="border: 1px solid black;">개월2</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">LI-3</td>
    <td style="border: 1px solid black;">48,000</td>
    <td style="border: 1px solid black;">개월4</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">LI-6</td>
    <td style="border: 1px solid black;">96,000</td>
    <td style="border: 1px solid black;">개월8</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td rowspan="5" style="border: 1px solid black;">중정비 </td>
    <td style="border: 1px solid black;">GI-1</td>
    <td style="border: 1px solid black;">192,000</td>
    <td style="border: 1px solid black;">개월16</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">GI-2</td>
    <td style="border: 1px solid black;">384,000</td>
    <td style="border: 1px solid black;">개월32</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">GI-4</td>
    <td style="border: 1px solid black;">768,000</td>
    <td style="border: 1px solid black;">개월64</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">GI-6</td>
    <td style="border: 1px solid black;">1,152,000</td>
    <td style="border: 1px solid black;">년8</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">GI-9</td>
    <td style="border: 1px solid black;">2,304,000</td>
    <td style="border: 1px solid black;">년16</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">차륜교환</td>
    <td style="border: 1px solid black;">NWC</td>
    <td style="border: 1px solid black;">차륜교환</td>
    <td style="border: 1px solid black;">-</td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">임시정비</td>
    <td style="border: 1px solid black;">T</td>
    <td style="border: 1px solid black;">-</td>
    <td style="border: 1px solid black;">-</td>
    <td style="border: 1px solid black;">사업소 T1, 정비단 T2</td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">특종정비</td>
    <td style="border: 1px solid black;">R</td>
    <td style="border: 1px solid black;">-</td>
    <td style="border: 1px solid black;">-</td>
    <td style="border: 1px solid black;">사업소 R1 정비단 R2</td>
  </tr>
</table>

`;

const sampleHtml2 = `
<table style="border-collapse: collapse; border: 1px solid black; padding: 8px; text-align: left;">
  <tr>
    <td rowspan="2" style="border: 1px solid black;">정비주기</td>
    <td rowspan="2" style="border: 1px solid black;">약호</td>
    <td colspan="2" style="border: 1px solid black;">정비주기</td>
    <td rowspan="2" style="border: 1px solid black;">비고</td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">운행거리( )㎞</td>
    <td style="border: 1px solid black;">운행기간</td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">반복정비</td>
    <td style="border: 1px solid black;">RS</td>
    <td style="border: 1px solid black;">일 회1 1</td>
    <td style="border: 1px solid black;">-</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">기본정비</td>
    <td style="border: 1px solid black;">ES</td>
    <td style="border: 1px solid black;">1,200</td>
    <td style="border: 1px solid black;">-</td>
    <td style="border: 1px solid black;">일 운행 후3</td>
  </tr>
  <tr>
    <td rowspan="3" style="border: 1px solid black;">경정비 </td>
    <td style="border: 1px solid black;">LI-1</td>
    <td style="border: 1px solid black;">16,000</td>
    <td style="border: 1px solid black;">개월2</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">LI-3</td>
    <td style="border: 1px solid black;">48,000</td>
    <td style="border: 1px solid black;">개월4</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">LI-100</td>
    <td style="border: 1px solid black;">96,000</td>
    <td style="border: 1px solid black;">개월8</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td rowspan="5" style="border: 1px solid black;">중정비 </td>
    <td style="border: 1px solid black;">GI-1</td>
    <td style="border: 1px solid black;">192,000</td>
    <td style="border: 1px solid black;">개월16</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">GI-2</td>
    <td style="border: 1px solid black;">384,000</td>
    <td style="border: 1px solid black;">개월32</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">GI-4</td>
    <td style="border: 1px solid black;">768,000</td>
    <td style="border: 1px solid black;">개월64</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">GI-6</td>
    <td style="border: 1px solid black;">1,152,000</td>
    <td style="border: 1px solid black;">년8</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">GI-9</td>
    <td style="border: 1px solid black;">2,304,000</td>
    <td style="border: 1px solid black;">년16</td>
    <td style="border: 1px solid black;"></td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">차륜교환</td>
    <td style="border: 1px solid black;">NWC</td>
    <td style="border: 1px solid black;">차륜교환</td>
    <td style="border: 1px solid black;">-</td>
  </tr>
  <tr>
    <td style="border: 1px solid black;">임시정비</td>
    <td style="border: 1px solid black;">T</td>
    <td style="border: 1px solid black;">-</td>
    <td style="border: 1px solid black;">-</td>
    <td style="border: 1px solid black;">사업소 T1, 정비단 T2</td>
  </tr>

</table>

`;

function App() {
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [diffHtml, setDiffHtml] = useState({ __html: "" });

  useEffect(() => {
    if (firstText && secondText) {
      const diff = HtmlDiff.execute(firstText, secondText);
      setDiffHtml({ __html: diff });
      console.log("Raw diff HTML:", diff);
    }
  }, [firstText, secondText]);

  const loadSamples = () => {
    setFirstText(sampleHtml1);
    setSecondText(sampleHtml2);
  };

  return (
    <div className="wrapper">
      <button onClick={loadSamples}>Load Sample HTML</button>
      <div className="input-section">
        <div>
          <h3> OLD HTML (RAW)</h3>
          <textarea
            value={firstText}
            onChange={(e) => setFirstText(e.target.value)}
            placeholder="Enter the old HTML here"
            rows={10}
            cols={40}
          />
        </div>
        <div>
          <h3>NEW HTML (RAW)</h3>
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
      <div className="raw-diff">
        <h3> Diff HTML (RAW)</h3>
        <pre>{diffHtml.__html}</pre>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);