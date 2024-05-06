import { useEffect, useState } from "react";
import reset from "./public/device_reset_FILL0_wght400_GRAD0_opsz24.svg";
import play from "./public/play_arrow_FILL1_wght400_GRAD0_opsz24.svg";
import pause from "./public/stop_FILL1_wght400_GRAD0_opsz24.svg";

function App() {
  const [state, setState] = useState(false);
  const [milli, setMilli] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  useEffect(() => {
    let temp;
    if (state)
      temp = setInterval(() => {
        setMilli((milli) => milli + 1);
      }, 10);
    else clearInterval(temp);
    return () => clearInterval(temp);
  }, [state]);

  useEffect(() => {
    if (state) {
      if (milli > 0 && milli % 100 === 0) {
        setSecond((second) => second + 1);
        setMilli(0);
      }
      if (second && second % 60 === 0) {
        setMinute((minute) => minute + 1);
        setSecond(0);
      }
      if (minute && minute % 60 === 0) {
        setHour((hour) => hour + 1);
        setMinute(0);
      }
    }
  }, [milli, second, minute, hour]);

  return (
    <div className="w-screen bg-[#121212] h-screen py-20 flex justify-center items-center">
      <div className="xl:w-[30vw] xl:h-[30vw] lg:w-[40vw] lg:h-[40vw] md:w-[50vw] md:h-[50vw] sm:w-[60vw] sm:h-[60vw] w-[70vw] h-[70vw] rounded-full bg-red-600 flex justify-center items-center relative">
        <div className="w-[90%] h-[90%] bg-[#212121] rounded-full flex justify-center items-center ">
          <span className=" font-bold text-white">
            <span className="text-[4em]">
              {hour}:{minute}:{second}
            </span>
            <span className="text-[2em] text-red-600">.{milli}</span>
          </span>
        </div>
        <div className="absolute -bottom-4 w-full md:h-[17%] h-[20%] flex justify-evenly gap-[10px] items-center">
          {!state && (
            <button
              aria-label="reset timer"
              className="bg-white h-full md:w-[17%] w-[20%] rounded-xl shadow-lg flex justify-center items-center"
              onClick={() => {
                setMilli(0);
                setSecond(0);
                setMinute(0);
                setHour(0);
              }}
            >
              <img src={reset} alt="" className="w-[50%] h-[50%]" />
            </button>
          )}
          <button
            aria-label={state ? "pause timer" : "start timer"}
            className="bg-white h-full md:w-[17%] w-[20%] rounded-full shadow-lg flex justify-center items-center"
            onClick={() => {
              setState((state) => !state);
            }}
          >
            <img
              src={state ? pause : play}
              alt=""
              className="w-[50%] h-[50%]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
