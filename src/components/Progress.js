import React from "react";

function Progress({ step, totalSteps }) {
  return (
    <div id="progress" className="progress" dir="rtl">
      {`שאלה ${step} מתוך ${totalSteps}`}
    </div>
  );
}

export default Progress;
