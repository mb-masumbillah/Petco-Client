
import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import LatestNews from "../LatestNews/LatestNews";
import NewsLetter from "../NewsLetter/NewsLetter";
import PetsCategory from "../PetsCategory/PetsCategory";

const Home = () => {
  return (
    <div className="mt-20">
      <Banner></Banner>
      <PetsCategory></PetsCategory>
      <CallToAction></CallToAction>
      <AboutUs></AboutUs>
      <LatestNews></LatestNews>
      <NewsLetter></NewsLetter>
    </div>
  );
};

export default Home;
