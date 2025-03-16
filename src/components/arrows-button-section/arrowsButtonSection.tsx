import './arrowsButtonSection.scss'

interface Props {
  disabledPrev: boolean;
  disabledNext: boolean;
  handleNext: () => void;
  handlePrev: () => void;
  currSlide: number;
  totalSlides: number;
}

export const ArrowsButtonSection = ({
  currSlide,
  totalSlides,
  disabledPrev,
  disabledNext,
  handleNext,
  handlePrev,
}: Props) => {
  return (
    <div className="arrows">
      <p className="arrows__counter">
        0{currSlide}/0{totalSlides}
      </p>
      <div className="arrows__button-section">
        <button
          className="arrows__button arrow-button"
          onClick={handlePrev}
          disabled={disabledPrev}
        ></button>
        <button
          className="arrows__button arrows__button_next"
          onClick={handleNext}
          disabled={disabledNext}
        ></button>
      </div>
    </div>
  );
};
