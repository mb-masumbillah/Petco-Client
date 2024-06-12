import leg from "../../assets/images/pawprint (1).png"

const SectionTitle = ({headingTitle, subHeading}) => {
    return (
        <div>
           <div>
            <img src={leg} alt="" className="w-6 mx-auto animate-bounce" />
            <p className="text-[#F04335] py-3 pt-0 text-center lg:text-3xl text-lg animate-pulse font-extrabold">{subHeading}</p>
            <h1 className="lg:text-5xl text-2xl text-center text-[#0A303A] font-[900]">{headingTitle}</h1>
        </div>
        </div>
    );
};

export default SectionTitle;