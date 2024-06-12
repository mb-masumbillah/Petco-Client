import { EffectFade, Navigation, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// all images
import banner1 from "../../../assets/images/allpets2.jpg";
import banner2 from "../../../assets/images/allpets4.png";
import banner3 from "../../../assets/images/allpets5.jpg";
import banner4 from "../../../assets/images/slider_bg01.jpg";
import banner5 from "../../../assets/images/jumbotron.jpg";
import banner6 from "../../../assets/images/allpet6.jpeg";
import banner7 from "../../../assets/images/sliderrrrr.jpg";

const Banner = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={banner1} className="w-full lg:h-[550px] h-[200px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner2} className="w-full lg:h-[550px] h-[200px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner3} className="w-full lg:h-[550px] h-[200px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner4} className="w-full lg:h-[550px] h-[200px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner5} className="w-full lg:h-[550px] h-[200px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner6} className="w-full lg:h-[550px] h-[200px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner7} className="w-full lg:h-[550px] h-[200px]" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
