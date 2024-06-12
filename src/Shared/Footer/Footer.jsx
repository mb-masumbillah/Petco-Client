import { Carousel, Typography } from "@material-tailwind/react";
import footer from "../../assets/images/footer_bg.jpg";
import down from "../../assets/images/down.png";
import h1 from "../../assets/images/h1.png";
import logo from "../../assets/images/logo.png";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { CiLinkedin, CiTwitter } from "react-icons/ci";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="mt-24">
      <div className=" relative">
        <img src={footer} alt="" className="h-[450px] lg:h-auto" />
        <img src={down} alt="" className="absolute top-0" />
        <div className="absolute lg:top-12 top-8 h-full">
          <footer className="relative w-full">
            <div className="mx-auto w-full max-w-7xl px-8">
              <div className="flex lg:flex-row text-[#0A303A] flex-col">
                <Typography
                  variant="h5"
                  className="mb-6 text-[#0A303A] lg:w-1/3 w-full"
                >
                  <img src={logo} alt="" />
                </Typography>
                <div className="flex lg:grid lg:grid-cols-3 flex-wrap lg:w-2/3 w-full text-[#0A303A] justify-between gap-4">
                  <div>
                    <h1 className="font-bold text-xl">Our Policies</h1>
                    <div className="flex flex-col mt-2">
                      <a className="link link-hover">Branding</a>
                      <a className="link link-hover">Design</a>
                      <a className="link link-hover">Marketing</a>
                      <a className="link link-hover">Advertisement</a>
                    </div>
                  </div>
                  <div>
                    <h1 className="font-bold text-xl">Our Services</h1>
                    <div className="flex flex-col mt-2">
                      <a className="link link-hover">Branding</a>
                      <a className="link link-hover">Design</a>
                      <a className="link link-hover">Marketing</a>
                      <a className="link link-hover">Advertisement</a>
                    </div>
                  </div>
                  <div className="border border-[#F04335] lg:w-full w-[150px] mx-auto">
                    <Carousel
                      loop={true}
                      autoplay={true}
                      className="rounded-xl"
                    >
                      <img
                        src="https://i.ibb.co/12K1qnX/cat-2083492-640.jpg"
                        alt="image 1"
                        className="lg:h-full lg:w-full w-[150px] h-[150px] object-cover object-center"
                      />
                      <img
                        src="https://themebeyond.com/pre/petco-prev/petco-live/img/images/adop_img02.png"
                        alt="image 2"
                        className="lg:h-full lg:w-full w-[150px] h-[150px]  object-cover object-center"
                      />
                      <img
                        src="https://i.ibb.co/dtsrwnj/bunny-5014814-640.jpg"
                        alt="image 3"
                        className="lg:h-full lg:w-full w-[150px] h-[150px]  object-cover object-center"
                      />
                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <img src={h1} alt="" className="absolute bottom-0" />
      </div>
      <div className="w-full bg-[#181A21] -mt-1">
        <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row px-5 md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-white md:mb-0"
          >
            &copy; {currentYear}{" "}
            <a href="https://material-tailwind.com/">Material Tailwind</a>. All
            Rights Reserved.
          </Typography>
          <div className="flex gap-4 text-[#ABB3B5] sm:justify-center">
            <Typography
              as="a"
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaFacebook></FaFacebook>
            </Typography>
            <Typography
              as="a"
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaGoogle></FaGoogle>
            </Typography>
            <Typography
              as="a"
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <CiTwitter></CiTwitter>
            </Typography>
            <Typography
              as="a"
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <FaGithub></FaGithub>
            </Typography>
            <Typography
              as="a"
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              {" "}
              <CiLinkedin></CiLinkedin>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
