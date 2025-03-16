import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./datesSection.scss";
import { makePoints, useViewportSize, useYear } from "../../utils/utils";
import { ArrowsButtonSection } from "../arrows-button-section/arrowsButtonSection";

gsap.registerPlugin(useGSAP);

interface Props {
  setSlide: React.Dispatch<React.SetStateAction<number>>;
  startYear: number;
  endYear: number;
}

export function DatesSection({ setSlide, startYear, endYear }: Props) {
  const size = useViewportSize();
  const { year: yearFrom, changeYear: changeYearFrom } = useYear(startYear);
  const { year: yearTo, changeYear: changeYearTo } = useYear(endYear);
  const [currentSlide, setCurrentSlide] = useState(0);
  const container = useRef(null);
  const slideRef = useRef<number>(0);
  const [disabled, setDisabled] = useState(false);
  const radius = 265;
  const circleCenter = { x: 300, y: 300 };
  const numPoints = 6;
  const points = makePoints(numPoints, radius);

  useEffect(() => {
    changeYearFrom(startYear);
    changeYearTo(endYear);
  }, [startYear, endYear, changeYearFrom, changeYearTo]);
  const { contextSafe } = useGSAP({ scope: container });

  const handleMouseEnter = (index: number) => {
    if (index !== slideRef.current) {
      gsap.to(
        `.datesSection__point:nth-child(${index + 2}) .datesSection__circle`,
        {
          r: 28,
          stroke: "rgba(66, 86, 122, 0.5)",
          strokeWidth: 1,
          fill: "#fff",
        }
      );
      gsap.to(
        `.datesSection__point:nth-child(${
          index + 2
        }) .datesSection__point__text`,
        {
          display: "block",
        }
      );
    }
  };

  const handleMouseLeave = (index: number) => {
    if (index !== slideRef.current) {
      gsap.to(
        `.datesSection__point:nth-child(${index + 2}) .datesSection__circle`,
        {
          r: 2,
          stroke: "#42567A",
          strokeWidth: 1,
          fill: "#42567A",
        }
      );
      gsap.to(
        `.datesSection__point:nth-child(${
          index + 2
        }) .datesSection__point__text`,
        {
          display: "none",
        }
      );
    }
  };

  const onClickBtn = contextSafe((i: number) => {
    const angle = (slideRef.current - i) * 60;
    gsap.to(".datesSection__svg", {
      rotation: `+=${angle}`,
      transformOrigin: "center",
    });
    slideRef.current = i;
    setSlide(i);
    setCurrentSlide(i);
    gsap.utils
      .toArray(".datesSection__point")
      .forEach((el: any, index: number) => {
        gsap.to(el, {
          rotation: `-=${angle}`,
          transformOrigin: "center",
        });
        gsap.to(
          `.datesSection__point:nth-child(${index + 2}) .datesSection__circle`,
          {
            r: index === slideRef.current ? 28 : 2,
            stroke:
              index === slideRef.current ? "rgba(66, 86, 122, 0.5)" : "#42567A",
            strokeWidth: 1,
            fill: index === slideRef.current ? "#FFF" : "#42567A",
          }
        );
        gsap.to(
          `.datesSection__point:nth-child(${
            index + 2
          }) .datesSection__point__text`,
          {
            display: index === slideRef.current ? "block" : "none",
          }
        );
      });
  });

  const handlePrevClick = () => {
    setDisabled(true);
    onClickBtn(slideRef.current - 1);
    setSlide(currentSlide - 1);
    setTimeout(() => {
      setDisabled(false);
    }, 500);
  };
  const handleNextClick = () => {
    setDisabled(true);
    onClickBtn(slideRef.current + 1);
    setSlide(currentSlide + 1);
    setTimeout(() => {
      setDisabled(false);
    }, 500);
  };

  return (
    <>
      <section className="datesSection">
        <div ref={container}>
          <div className="datesSection__verticalLine"></div>
          <h1 className="datesSection__title">Исторические даты</h1>
          <div className="datesSection__carousel">
            <div className="datesSection__horizontalLine"></div>
            <div className="datesSection__slides">
              <p
                className="datesSection__slide-date"
                style={{ color: "#5d5fef" }}
              >
                {yearFrom}
              </p>
              <p
                className="datesSection__slide-date"
                style={{ color: "#ef5da8" }}
              >
                {yearTo}
              </p>
            </div>
            {
              <svg className="datesSection__svg">
                <circle
                  cx={circleCenter.x}
                  cy={circleCenter.y}
                  r={radius}
                  stroke="rgba(66, 86, 122, 0.1)"
                  strokeWidth="1"
                  fill="none"
                />

                {points.map((point, index) =>
                  index === slideRef.current ? (
                    <g
                      key={index}
                      onClick={() => onClickBtn(index)}
                      className="datesSection__point"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                    >
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={28}
                        fill="#FFF"
                        stroke="rgba(48, 62, 88, 0.5)"
                        className="datesSection__circle"
                      />
                      <text
                        x={point.x}
                        y={point.y}
                        fill="#42567A"
                        fontSize="20"
                        fontWeight={700}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        className="datesSection__point__text"
                      >
                        {index + 1}
                      </text>
                    </g>
                  ) : (
                    <g
                      key={index}
                      onClick={() => onClickBtn(index)}
                      className="datesSection__point"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                    >
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={2}
                        fill="#42567A"
                        stroke="#42567A"
                        className="datesSection__circle"
                      />
                      <text
                        display="none"
                        x={point.x}
                        y={point.y}
                        fill="#42567A"
                        fontSize="20"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        className="datesSection__point__text"
                      >
                        {index + 1}
                      </text>
                    </g>
                  )
                )}
              </svg>
            }
            {size.width > 768 && (
              <ArrowsButtonSection
                totalSlides={points.length}
                currSlide={currentSlide + 1}
                disabledPrev={disabled || currentSlide === 0}
                disabledNext={disabled || currentSlide === points.length - 1}
                handleNext={handleNextClick}
                handlePrev={handlePrevClick}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
