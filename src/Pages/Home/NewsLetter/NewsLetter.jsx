import { Input } from "@material-tailwind/react";
import newLetter from "../../../assets/images/newsletter_bg.jpg";

const NewsLetter = () => {
  return (
    <div className="lg:mt-20 mt-10">
      <div className="lg:relative">
        <img src={newLetter} alt="" className="rounded-xl lg:block hidden" />
        <div className="lg:absolute flex top-0 w-full h-full px-10 lg:gap-10 gap-4 lg:text-white text-[#F04335] lg:flex-row flex-col justify-center items-center">
          <div className="lg:w-1/3 w-full">
            <h1 className="lg:text-5xl text-3xl text-center font-extrabold">Newsletter For</h1>
            <p className="text-center">* Do Not Show Your Email.</p>
          </div>
          <div className="lg:w-2/3 w-full">
            <form>
              <div className="flex lg:gap-5 gap-1 lg:flex-row flex-col justify-center items-center">
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className="lg:text-xl lg:h-14 bg-white lg:border-none border"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <button className="lg:text-[#F04335] rounded-lg font-bold text-white lg:h-14 lg:text-xl px-6 lg:bg-white bg-[#F04335]">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
