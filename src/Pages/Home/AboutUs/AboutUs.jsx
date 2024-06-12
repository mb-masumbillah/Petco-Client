import SectionTitle from "../../../Component/SectionTitle/SectionTitle";

const AboutUs = () => {
    return (
        <div className="mt-24">
            <SectionTitle headingTitle="About Us" subHeading="Our Work"></SectionTitle>
            <div className="mt-14 text-[#676666] w-full lg:w-[900px] mx-auto text-center">
                <p>
                    Welcome to PetCo, your trusted platform for pet adoption. Our mission is to connect loving families with pets in need of a home. We created this website to simplify the adoption process and make it accessible to everyone. By leveraging technology, we aim to bridge the gap between shelters and potential pet owners, ensuring that every pet finds a loving and caring home.
                </p>
                <p>
                    Our platform allows you to easily search for pets based on various criteria such as species, breed, age, and location. Detailed profiles of each pet help you understand their personality, health status, and background, making it easier for you to find the perfect match. Join us in our mission to provide every pet with a forever home and bring joy to families through the companionship of a loving pet.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;