import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import shape from "../../../assets/images/breed_shape.svg";

import { Card, CardHeader } from "@material-tailwind/react";

const PetsCategory = () => {
  const [pets, setPet] = useState([]);

  useEffect(() => {
    axios("petsCategory.json").then((res) => setPet(res.data));
  }, []);
  return (
    <div className="lg:mt-24 mt-10">
      <SectionTitle
        headingTitle="Pets Category"
        subHeading="Category"
      ></SectionTitle>
      <div className="lg:pt-14 pt-6">
        <Swiper
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper border-y-2 border-[#0A303A]"
        >
          {pets.map((pet) => (
            <SwiperSlide key={pet.name}>
              {/* <div
                key={pet.name}
                className="card card-compact lg:w-96 shadow-xl rounded-none my-5 relative"
              >
                <figure>
                  <img
                    src={pet.image}
                    className="max-w-[390px] lg:h-[408px] md:h-[220px] h-[120px] rounded-md"
                  />
                </figure>
                <div className="card-body absolute bottom-0 w-full flex justify-center items-center">
                  <h2 className="card-title relative flex justify-center items-center">
                    <img src={shape} alt="" />
                    <span className="absolute text-[#F04335] lg:text-3xl text-base text-center block font-bold">
                      {pet.name}
                    </span>
                  </h2>
                </div>
              </div> */}

              <Card className="max-w-[24rem] overflow-hidden">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none my-8"
                >
                  <img src={pet.image} alt="ui/ux review check" className="lg:w-[390px] lg:h-[408px] md:h-[220px] h-[120px] rounded-md" />
                  <div className="absolute bottom-3 w-full flex justify-center items-center">
                    <h2 className="card-title relative flex justify-center items-center">
                      <img src={shape} alt="" />
                      <span className="absolute text-[#F04335] lg:text-3xl text-base text-center block font-bold">
                        {pet.name}
                      </span>
                    </h2>
                  </div>
                </CardHeader>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PetsCategory;
