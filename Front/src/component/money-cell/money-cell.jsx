import React from "react";
import "@/component/money-cell/money-cell.css";

function MoneyCell(props) {
  const formattedTarget = Number(props.target).toLocaleString("fa-IR");

  const formattedCurrent = Number(props.current).toLocaleString("fa-IR");

  const progress = Math.min(props.prog, 100);

  return (
    <div className="money-cell">
      <div className="circle-wrapper">
        <div
          className="circle-progress"
          style={{
            background: `conic-gradient(
              var(--primary) ${progress}%,
              rgba(255,255,255,0.08) ${progress}%
            )`,
          }}
        >
          <div className="circle-inner">
            <div className="title">{props.title}</div>

            <div className="prog-num">
              {progress}%
            </div>

            <div className="prices">
              <span className="current">
                {formattedCurrent}
              </span>

              <span className="divider"></span>

              <span className="target">
                {formattedTarget}
              </span>
            </div>
          </div>
        </div>

        <div className="cell-edit">
          <i className="bx bxs-pencil"></i>
        </div>
      </div>
    </div>
  );
}

export default MoneyCell;