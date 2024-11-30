import React from 'react';
import personilizedResults from '../assets/personilizedResults.png';
import laptopComparison from '../assets/laptopComparison.png';
import { CircularProgressbar } from 'react-circular-progressbar';
import { ExternalLink } from 'lucide-react';

const Stepper = () => (
    <div className="max-w-4xl mx-auto px-4 mt-12" dir="rtl" style={window.innerWidth < 768 ? { marginRight: '0.7rem' } : {}}>      <div className="relative flex justify-center">
        <div className="absolute top-[1.6rem] left-16 right-16 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600" />
        {[
          { 
            number: "1", 
            title: "ענו על השאלון", 
            //desc: "2 דקות של שאלות קצרות",
            tasks: ['שימושים', 'משקל', 'מסך', 'תקציב', 'מאפיינים'],
            additionalContent: 
            window.innerWidth >= 1024 && (
                <div style={{ marginTop: "16px", paddingLeft: "24px", paddingRight: "24px" }}>
                  {['שימושים עיקריים', 'משקל','גודל מסך', 'תקציב', 'מאפיינים מיוחדים'].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#9CA3AF" }} />
                      <span style={{ color: "#374151", fontSize: "18px" }}>{item}</span>
                    </div>
                  ))}
                </div>
              )
          },
          { 
            number: "2", 
            title: "קבלו המלצות", 
            desc: "מדורגות לפי התאמה אישית",
            progressBar: (
<               div style={{ width: "100px", margin: "16px auto 0", display: 'flex', justifyContent: 'center' }}> 
                 <CircularProgressbar
                    value={92}
                    text={`${92}%`}
                    strokeWidth={4}
                    styles={{
                      path: { stroke: "#0029a3", strokeLinecap: "butt"  },
                      text: { fill: "#4B5563", fontSize: "24px" },
                      root: { width: "60%", height: "60%" }
                    }}
                  />
                </div>
              ),
            additionalContent: window.innerWidth >= 1024 && (
              <img 
                src={personilizedResults} 
                alt="המלצות מותאמות אישית"
                style={{ 
                    marginTop: '0.75rem',  // mt-3
                    width: '8rem',         // w-32
                    height: 'auto',        // h-auto
                    marginLeft: 'auto',    // mx-auto
                    marginRight: 'auto'    // mx-auto
                  }}                
              />
            )
          },
          { 
            number: "3", 
            title: "השוו והחליטו", 
            desc: "קבלו לינק ישיר לזאפ להשוואה!",
            zaplink:
            <div style={{ width: "100px", margin: "16px auto 0", display: 'flex', justifyContent: 'center' }}> 
                <ExternalLink size={60} color="#0029a3" strokeWidth={0.5} />
            </div>,
            additionalContent: window.innerWidth >= 1024 && (
              <img 
                src={laptopComparison} 
                alt="השוואת מחירים בזאפ"
                className="mt-3 w-32 h-auto mx-auto"
              />
            )
          }
        ].map((step, idx) => (
          <div key={idx} className="relative flex-1 px-4" style={{backgroundColor: "rgba(255,255,255,0.9)"}}>
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
              <div style={{ display: window.innerWidth < 768 ? 'block' : 'none' }}>
                <p style={{ color: "rgb(75, 85, 99)" }} className="text-center text-sm">{step.desc}</p>
                {step.progressBar}
                {step.zaplink && (
                    <div className="w-64"> 
                        {step.zaplink}
                    </div>
                    )}
                {step.tasks && (
                <div>
                    {step.tasks.map((task, index) => (
                    <div key={task} className="flex items-center gap-2 ">
                        <p style={{ color: "rgb(75, 85, 99)" }} className="text-center text-sm">
                        {index + 1}. 
                        </p>
                        <span style={{ color: "rgb(75, 85, 99)" }} className="text-center text-sm">{task}</span>
                    </div>
                    ))}
                </div>
                )}
                                
              </div>
                {window.innerWidth >= 1024 && step.additionalContent}

            </div>
          </div>
        ))}
      </div>
    </div>
   );

export default Stepper;