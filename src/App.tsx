import React, { useState } from "react";
import "./App.scss";
import "swiper/scss";
import "swiper/css/navigation";
import { SliderSection } from "./components/slider/sliderSection";
import { DatesSection } from "./components/datesSection/datesSection";
import { data, useViewportSize } from "./utils/utils";
import { ArrowsButtonSection } from "./components/arrows-button-section/arrowsButtonSection";

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const size = useViewportSize();
  const handlePrevClick = () => {
    setCurrentSlide(currentSlide - 1);
  };
  const handleNextClick = () => {
    setCurrentSlide(currentSlide + 1);
  };
  return (
    <main className="main">
      <DatesSection
        setSlide={setCurrentSlide}
        startYear={data[currentSlide].from}
        endYear={data[currentSlide].to}
      />
      <SliderSection events={data[currentSlide].events} />
      {size.width < 768 && <ArrowsButtonSection disabledPrev={currentSlide === 0} disabledNext={currentSlide === data.length - 1} handleNext={handleNextClick} handlePrev={handlePrevClick} currSlide={currentSlide + 1} totalSlides={data.length} />}
    </main>
  );
}

export default App;
