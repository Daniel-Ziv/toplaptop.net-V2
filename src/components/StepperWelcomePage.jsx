import React from 'react';

const Stepper = () => (
  <div className="max-w-4xl mx-auto px-4 mt-12" dir="rtl">
    <div className="relative flex justify-between">
    <div className="absolute top-[1.6rem] left-16 right-16 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600" />
      
      {[
        { number: "1", title: "ענו על השאלון", desc: "2 דקות של שאלות קצרות", bg: "rgba(255,255,255,0.9)" },
        { number: "2", title: "קבלו המלצות", desc: "מדורגות לפי התאמה אישית", bg: "rgba(255,255,255,0.9)" }, 
        { number: "3", title: "השוו והחליטו", desc: "קבלו לינק ישיר לזאפ להשוואה!", bg: "rgba(255,255,255,0.9)" }
        ].map((step, idx, arr) => (
            
              
        <div key={idx} className="relative flex-1 px-4" style={{backgroundColor: step.bg}}>
            <div className="flex flex-col items-center">
            <div style={{
                width: "50px",
                height: "50px", 
                borderRadius: "100px",
                background: "rgba(0,111,238,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#021b61",
                
                fontSize: "20px"
            }}>
                    {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">{step.title}</h3>
                <p style={{ color: "rgb(75, 85, 99)" }} className="text-center text-sm">{step.desc}</p>          </div>
            </div>
      ))}
    </div>
  </div>
);

export default Stepper;