import { useState } from "react";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import calltoactionimg from "../../../assets/images/testi_bg_shape01.png";
import ffimg from "../../../assets/images/tttt.png";
import upimg from "../../../assets/images/up.png";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Icon from "./Icon";

const CallToAction = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="bg-[#d5e6eb] mt-24">
      <img src={calltoactionimg} alt="" className="pb-10" />

      <SectionTitle
        headingTitle="History & Family Adoption"
        subHeading="Adopt a Pet"
      ></SectionTitle>

      <div className="flex lg:px-24 lg:flex-row flex-col items-center justify-center">
        <figure className="relative lg:w-1/2 flex justify-end lg:px-14">
          <img
            src={ffimg}
            alt=""
            className="lg:w-[400px] w-[200px] h-[200px] lg:h-[400px]"
          />
        </figure>
        {/* <div className="lg:w-1/2 lg:mt-20 px-5 pt-5">
          <div className="collapse collapse-arrow bg-base-200 rounded-none">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-bold">
              Adopt, Do not Shop
            </div>
            <div className="collapse-content">
              <p>
                Every pet deserves a loving home. Your new best friend is
                waiting for you. Adopt a pet today and make a difference.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200 mt-2 rounded-none">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-bold">
              Open Your Heart, Open Your Home
            </div>
            <div className="collapse-content">
              <p>
                Every year, millions of pets are in need of a loving home. By
                adopting, you can give a pet a second chance and fill your life
                with love, joy, and companionship. Take the first step towards
                making a difference today.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200 mt-2 rounded-none">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-bold">
              Give a Pet a Loving Home
            </div>
            <div className="collapse-content">
              <p>
                Thousands of pets are looking for a forever home. Open your
                heart and home to a pet in need, and experience the
                unconditional love and joy that a furry friend can bring to your
                life.
              </p>
            </div>
          </div>
        </div> */}

        <div className="lg:w-1/2 lg:mt-10 px-5 pt-5">
          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(1)}>
              Adopt, Do not Shop
            </AccordionHeader>
            <AccordionBody>
              Every pet deserves a loving home. Your new best friend is waiting
              for you. Adopt a pet today and make a difference.
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(2)}>
              Open Your Heart, Open Your Home
            </AccordionHeader>
            <AccordionBody>
              Every year, millions of pets are in need of a loving home. By
              adopting, you can give a pet a second chance and fill your life
              with love, joy, and companionship. Take the first step towards
              making a difference today.
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(3)}>
              Give a Pet a Loving Home
            </AccordionHeader>
            <AccordionBody>
              Thousands of pets are looking for a forever home. Open your heart
              and home to a pet in need, and experience the unconditional love
              and joy that a furry friend can bring to your life.
            </AccordionBody>
          </Accordion>
        </div>
      </div>

      <img src={upimg} alt="" className="pt-10" />
    </div>
  );
};

export default CallToAction;
