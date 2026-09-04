import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useRef, useState } from "react";

export default function DrawingArea() {
  const container = useRef(null);

  const [firstClick, setFirstClick] = useState<boolean>(true);

  const { contextSafe } = useGSAP(() => {}, { scope: container });

  const handleClick = contextSafe((e: React.MouseEvent) => {
    //get the position and actual size of SVG real-time
    const rect = e.currentTarget.getBoundingClientRect();
    //client X - rect calculates the space between the Browser and the element to ensure getting the correct coordinates when performed a click
    // /rect.width and height converts the coordinates from pixel to percentage
    // multiply 500 , converts ratio to SVG units (view port)
    const xAxis = Math.round(((e.clientX - rect.left) / rect.width) * 500);
    const yAxis = Math.round(((e.clientY - rect.top) / rect.height) * 500);

    const userLine = document.querySelector(".user-line");
    const currentPoint = userLine?.getAttribute("points");

    if (firstClick) {
      userLine?.setAttribute("points", `${xAxis} , ${yAxis}`);
      setFirstClick(false);

      const svg = document.querySelector("svg");
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      circle.setAttribute("cx", `${xAxis}`);
      circle.setAttribute("cy", `${yAxis}`);
      circle.setAttribute("r", `${10}`);
      circle.setAttribute("fill", "red");
      circle.setAttribute("class", "dot");
      svg?.append(circle);

      //animate the new circle for first click guide
      gsap.from(".dot", {
        duration: 1,
        ease: "back",
        scale: 0.5,
        transformOrigin: "50% 50%",
      });
    } else {
      setFirstClick(false);

      //undo the first click guide
      gsap.to(".dot", {
        duration: 1,
        ease: "power1",
        scale: 0,
        transformOrigin: "50% 50%",
      });

      userLine?.setAttribute("points", `${currentPoint} ${xAxis} , ${yAxis}`);
      const userCirlce = document.querySelector(".user-circle");
      userCirlce?.setAttribute("transformBox", "fill-box");

      gsap.set(".user-circle", {
        attr: { cx: xAxis, cy: yAxis },
        clearProps: "transform",
        opacity: 1,
      });

      // 2. Animate cleanly from the true center
      gsap.fromTo(
        ".user-circle",
        { scale: 0, transformOrigin: "center center" },
        {
          scale: 1,
          repeat: 1,
          yoyo: true,
          duration: 0.3,
        },
      );
    }
  });

  const handleReset = (): void => {
    setFirstClick(true);

    const circle = document.querySelector("circle");
    circle?.remove();

    const userLine = document.querySelector(".user-line");
    userLine?.setAttribute("points", "");
  };

  return (
    <div ref={container} className="flex flex-col items-center gap-4">
      <h1 className="text-6xl font-bold text-center">Drawing Area</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        className="w-full max-w-200 h-auto"
        onClick={handleClick}
      >
        <g className="line-vertical">
          <line
            style={{
              fill: "none",
              stroke: "rgb(126, 126, 126)",
              strokeWidth: 3,
            }}
            x1={100}
            y1={0}
            x2={100}
            y2={500}
          />
          <line
            style={{
              fill: "none",
              stroke: "rgb(126, 126, 126)",
              strokeWidth: 3,
            }}
            x1={0}
            y1={0}
            x2={0}
            y2={500}
          />
          <line
            style={{
              fill: "none",
              stroke: "rgb(126, 126, 126)",
              strokeWidth: 3,
            }}
            x1={200}
            y1={0.003}
            x2={200}
            y2={500}
          />
          <line
            style={{
              fill: "none",
              stroke: "rgb(126, 126, 126)",
              strokeWidth: 3,
            }}
            x1={300}
            y1={0.003}
            x2={300}
            y2={500}
          />
          <line
            style={{
              fill: "none",
              stroke: "rgb(126, 126, 126)",
              strokeWidth: 3,
            }}
            x1={400}
            y1={0}
            x2={400}
            y2={499.997}
          />
          <line
            style={{
              fill: "none",
              stroke: "rgb(126, 126, 126)",
              strokeWidth: 3,
            }}
            x1={500}
            y1={0}
            x2={500}
            y2={499.997}
          />
        </g>
        <g
          className="line-vertical"
          transform="matrix(0, 1, -1, 0, -0.000019, -0.000009)"
          style={{
            transformOrigin: "250px 250px",
          }}
        >
          <line
            style={{
              fill: "none",
              stroke: "rgb(126, 126, 126)",
              strokeWidth: 2,
            }}
            x1={100}
            y1={0}
            x2={100}
            y2={500}
          />
          <line
            style={{
              fill: "none",
              stroke: "rgb(126, 126, 126)",
              strokeWidth: 2,
            }}
            x1={0}
            y1={0}
            x2={0}
            y2={500}
          />
          <line
            style={{
              fill: "none",
              stroke: "rgb(126, 126, 126)",
              strokeWidth: 2,
            }}
            x1={200}
            y1={0.003}
            x2={200}
            y2={500}
          />
          <line
            style={{
              fill: "none",
              stroke: "rgb(126, 126, 126)",
              strokeWidth: 2,
            }}
            x1={300}
            y1={0.003}
            x2={300}
            y2={500}
          />
          <line
            style={{
              fill: "none",
              stroke: "rgb(126, 126, 126)",
              strokeWidth: 2,
            }}
            x1={400}
            y1={0}
            x2={400}
            y2={499.997}
          />
          <line
            style={{
              fill: "none",
              stroke: "rgb(126, 126, 126)",
              strokeWidth: 2,
            }}
            x1={500}
            y1={0}
            x2={500}
            y2={499.997}
          />
        </g>
        <polyline
          className="user-line"
          style={{
            fill: "none",
            stroke: "rgb(103, 118, 171)",
            strokeLinecap: "round",
            strokeWidth: 15,
          }}
          points="0 , 0"
        />
        <circle
          className="user-circle"
          opacity={0}
          cx={0}
          cy={0}
          r={10}
          fill="orange"
          style={{ transform: "scale(0)" }}
        />
      </svg>
      <button
        className="border-2 border-cyan-100 bg-blue-300 p-7 rounded-2xl w-40"
        onClick={handleReset}
      >
        Clear
      </button>
    </div>
  );
}
