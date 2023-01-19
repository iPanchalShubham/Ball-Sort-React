import React, { useEffect, useState } from "react";
import yellowBall from "../assets/bread.png";
import greenBall from "../assets/cowmilk2.png";
import bg from "../assets/countryBg3.jpeg";
import countryLogo from "../assets/Stamp.png";
import Confetti from "./Confetti";
import ballIsActiveSound from "../assets/sound/ballSound.wav";
import ballIsInserted from "../assets/sound/insertSound2.wav";
import winSound from "../assets/sound/WinSound.wav";
type Ball = { ballColor: string; bottleId: string };
function BallSort() {
  const [bottle1, setBottle1] = useState<Ball[]>([
    { ballColor: "bg-yellow-700", bottleId: "bottle1" },
    { ballColor: "bg-green-700", bottleId: "bottle1" },
    { ballColor: "bg-green-700", bottleId: "bottle1" },
  ]);
  const [bottle2, setBottle2] = useState<Ball[]>([
    { ballColor: "bg-green-700", bottleId: "bottle2" },
    { ballColor: "bg-yellow-700", bottleId: "bottle2" },
    { ballColor: "bg-yellow-700", bottleId: "bottle2" },
  ]);

  const [emptyBottle, setEmptyBottle] = useState<Ball[]>([]);
  const [activeBall, setActiveBall] = useState({ ballColor: "", bottleId: "" });
  const [time, setTime] = useState({ min: 0, sec: 0 });
  const BallsMovementHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    // Bottle1
    if (activeBall.ballColor) {
      const sound = new Audio();
      if (e.currentTarget.id === "bottle1") {
        if (bottle1.length < 3) {
          sound.src = ballIsInserted;
          bottle1.push(activeBall);
          sound.play();
          if (activeBall.bottleId === "bottle1") {
            bottle1.pop();
          } else if (activeBall.bottleId === "bottle2") {
            bottle2.pop();
          } else if (activeBall.bottleId === "emptyBottle") {
            emptyBottle.pop();
          }
          bottle1[bottle1.length - 1].bottleId = "bottle1";
          setActiveBall({ ballColor: "", bottleId: "" });
        }
        // If the active ball is itself belongs to the current tube.
        else if (activeBall.bottleId === "bottle1") {
          setActiveBall({ ballColor: "", bottleId: "" });
        } else {
          alert("Bottle is already full");
        }
      }
      //   Bottle2
      else if (e.currentTarget.id === "bottle2") {
        if (bottle2.length < 3) {
          sound.src = ballIsInserted;
          bottle2.push(activeBall);
          sound.play();
          if (activeBall.bottleId === "bottle1") {
            bottle1.pop();
          } else if (activeBall.bottleId === "bottle2") {
            bottle2.pop();
          } else if (activeBall.bottleId === "emptyBottle") {
            emptyBottle.pop();
          }
          bottle2[bottle2.length - 1].bottleId = "bottle2";

          setActiveBall({ ballColor: "", bottleId: "" });
        } // If the active ball is itself belongs to the current tube.
        else if (activeBall.bottleId === "bottle2") {
          setActiveBall({ ballColor: "", bottleId: "" });
        } else {
          alert("Bottle is already full");
        }
      }
      // Bottle3
      else if (e.currentTarget.id === "emptyBottle") {
        if (emptyBottle.length < 3) {
          sound.src = ballIsInserted;
          emptyBottle.push(activeBall);
          sound.play();
          if (activeBall.bottleId === "bottle1") {
            bottle1.pop();
          } else if (activeBall.bottleId === "bottle2") {
            bottle2.pop();
          } else if (activeBall.bottleId === "emptyBottle") {
            emptyBottle.pop();
          }

          emptyBottle[emptyBottle.length - 1].bottleId = "emptyBottle";

          setActiveBall({ ballColor: "", bottleId: "" });
        } // If the active ball is itself belongs to the current tube.
        else if (activeBall.bottleId === "emptyBottle") {
          setActiveBall({ ballColor: "", bottleId: "" });
        } else {
          alert("Bottle is already full");
        }
      }
    }
    // Make the ball active from the tube user clicked on.
    else {
      const sound = new Audio();
      if (e.currentTarget.id === "bottle1") {
        if (bottle1[bottle1.length - 1]) {
          sound.src = ballIsActiveSound;
          sound.play();
          setActiveBall(bottle1[bottle1.length - 1]);
        } else {
          alert("Bottle is empty");
        }
      } else if (e.currentTarget.id === "bottle2") {
        if (bottle2[bottle2.length - 1]) {
          sound.src = ballIsActiveSound;
          sound.play();
          setActiveBall(bottle2[bottle2.length - 1]);
        } else {
          alert("Bottle is empty");
        }
      } else {
        if (emptyBottle[emptyBottle.length - 1]) {
          sound.src = ballIsActiveSound;
          sound.play();
          setActiveBall(emptyBottle[emptyBottle.length - 1]);
        } else {
          alert("Bottle is empty");
        }
      }
    }
  };

  console.log(activeBall.ballColor + "" + activeBall.bottleId);

  // Timer
  let interval: any;
  useEffect(() => {
    let firstTime = Date.now();
    interval = setInterval(() => {
      let currentTime = Date.now() - firstTime;
      let sec = Math.floor((currentTime / 1000) % 60);
      let min = Math.floor(currentTime / 1000 / 60);

      setTime(() => ({
        sec,
        min,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Winning condition
  useEffect(() => {
    if (
      (JSON.stringify(bottle1) ===
        JSON.stringify([
          { ballColor: "bg-green-700", bottleId: "bottle1" },
          { ballColor: "bg-green-700", bottleId: "bottle1" },
          { ballColor: "bg-green-700", bottleId: "bottle1" },
        ]) ||
        JSON.stringify(bottle2) ===
          JSON.stringify([
            { ballColor: "bg-green-700", bottleId: "bottle2" },
            { ballColor: "bg-green-700", bottleId: "bottle2" },
            { ballColor: "bg-green-700", bottleId: "bottle2" },
          ]) ||
        JSON.stringify(emptyBottle) ===
          JSON.stringify([
            { ballColor: "bg-green-700", bottleId: "emptyBottle" },
            { ballColor: "bg-green-700", bottleId: "emptyBottle" },
            { ballColor: "bg-green-700", bottleId: "emptyBottle" },
          ])) &&
      (JSON.stringify(bottle1) ===
        JSON.stringify([
          { ballColor: "bg-yellow-700", bottleId: "bottle1" },
          { ballColor: "bg-yellow-700", bottleId: "bottle1" },
          { ballColor: "bg-yellow-700", bottleId: "bottle1" },
        ]) ||
        JSON.stringify(bottle2) ===
          JSON.stringify([
            { ballColor: "bg-yellow-700", bottleId: "bottle2" },
            { ballColor: "bg-yellow-700", bottleId: "bottle2" },
            { ballColor: "bg-yellow-700", bottleId: "bottle2" },
          ]) ||
        JSON.stringify(emptyBottle) ===
          JSON.stringify([
            { ballColor: "bg-yellow-700", bottleId: "emptyBottle" },
            { ballColor: "bg-yellow-700", bottleId: "emptyBottle" },
            { ballColor: "bg-yellow-700", bottleId: "emptyBottle" },
          ]))
    ) {
      clearInterval(interval);
      console.log("WIN");
    }
  }, [activeBall]);

  return (
    <>
      <Confetti />

      {/* Main Background */}
      <img
        src={bg}
        alt="Most Trusted Dairy Brand"
        className="w-screen h-screen absolute z-[-1] bg-blend-darken object-cover "
      />

      {/* Country Delight Logo */}
      <div className="flex justify-center">
        <img
          src={countryLogo}
          alt="Country Delight"
          className="absolute h-72 w-72 object-contain"
        />
      </div>
      {/* Timer */}
      <div className="text-center font-Game mt-16 text-lg sm:text-2xl sm:mt-12">
        {[time.min, ":", time.sec]}
      </div>
      {/* Bottles */}
      <div className="flex items-center h-screen w-full  justify-center rounded-full">
        <div className="flex space-x-10">
          {/* BOTTLE 1 */}
          <div
            className="flex flex-col-reverse border-x-4 border-gray-100  border-b-2 h-56 w-20  rounded-b-full cursor-pointer  border-t-4 rounded-t-lg backdrop-blur-sm"
            id="bottle1"
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              BallsMovementHandler(e)
            }
          >
            {bottle1.map((ball, i) => (
              <img
                src={
                  ball.ballColor === "bg-yellow-700"
                    ? yellowBall
                    : ball.ballColor === "bg-green-700"
                    ? greenBall
                    : ""
                }
                key={ball.bottleId + i}
                className={` ${
                  i == bottle1.length - 1 &&
                  activeBall.ballColor == ball.ballColor &&
                  activeBall.bottleId == ball.bottleId
                    ? "-translate-y-60 duration-300 ease-in-out"
                    : "duration-300 ease-in-out"
                }
            `}
              />
            ))}
          </div>
          {/* BOTTLE 2 */}

          <div
            className="flex flex-col-reverse border-x-4 border-gray-100  border-b-2 h-56 w-20 rounded-b-full cursor-pointer border-t-4 backdrop-blur-sm"
            id="bottle2"
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              BallsMovementHandler(e)
            }
          >
            {bottle2.map((ball, i) => (
              <img
                src={
                  ball.ballColor === "bg-yellow-700"
                    ? yellowBall
                    : ball.ballColor === "bg-green-700"
                    ? greenBall
                    : ""
                }
                key={ball.bottleId + i}
                className={` ${
                  i == bottle2.length - 1 &&
                  activeBall.ballColor == ball.ballColor &&
                  activeBall.bottleId == ball.bottleId
                    ? `-translate-y-48 duration-300 ease-in-out`
                    : "duration-300 ease-in-out"
                }`}
              />
            ))}
          </div>

          {/* EMPTY BOTTLE  */}

          <div>
            <div
              className="flex flex-col-reverse border-x-4 border-gray-100  border-b-2 h-56 w-20  rounded-b-full cursor-pointer   border-t-4 backdrop-blur-sm
          "
              id="emptyBottle"
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                BallsMovementHandler(e)
              }
            >
              {emptyBottle.map((ball, i) => (
                <img
                  src={
                    ball.ballColor === "bg-yellow-700"
                      ? yellowBall
                      : ball.ballColor === "bg-green-700"
                      ? greenBall
                      : ""
                  }
                  key={ball.bottleId + i}
                  className={` ${
                    i == emptyBottle.length - 1 &&
                    activeBall.ballColor == ball.ballColor &&
                    activeBall.bottleId == ball.bottleId
                      ? "-translate-y-60 duration-300 ease-in-out"
                      : "duration-300 ease-in-out"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BallSort;
