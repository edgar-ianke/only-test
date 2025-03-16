import arrowButton from "../../assets/nav-arrow_blue.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Post } from "../post/post";
import "./sliderSection.scss";
import { useViewportSize } from "../../utils/utils";
import gsap from "gsap";
import { useEffect, useRef } from "react";

interface Props {
  events: { year: number; description: string }[];
}

export function SliderSection({ events }: Props) {
  const ref = useRef(null);
  const size = useViewportSize();
  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 1 });
    }
  }, [events]);
  const content =
    size.width > 768 ? (
      <>
        <button className="sliderSection__arrow prev-btn"></button>

        <Swiper
          navigation={{
            disabledClass: "swiper-disabled-btn",
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          spaceBetween={20}
          slidesPerView={3}
          modules={[Navigation]}
        >
          {events.map((event, i) => (
            <SwiperSlide key={i}>
              <Post title={event.year} text={event.description} />
            </SwiperSlide>
          ))}
        </Swiper>
        {<button className="sliderSection__arrow next-btn"></button>}
      </>
    ) : (
      <>
        <Swiper
          navigation={{
            disabledClass: "swiper-disabled-btn",
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          pagination={{
            clickable: true,
          }}
          spaceBetween={20}
          slidesPerView={1.5}
          modules={[Pagination, Navigation]}
        >
          {events.map((event, i) => (
            <SwiperSlide key={i}>
              {({ isNext }) =>
                isNext ? (
                  <div className="next">
                    <Post title={event.year} text={event.description} />
                  </div>
                ) : (
                  <Post title={event.year} text={event.description} />
                )
              }
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );

  return (
    <section ref={ref} className="sliderSection">
      {content}
    </section>
  );
}
