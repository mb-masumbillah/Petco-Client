import { useEffect, useState } from "react";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import pawprint from "../../../assets/images/pawprint (1).png";

const LatestNews = () => {
  const [latest, setLetest] = useState([]);
  useEffect(() => {
    axios("/public/latest.json").then((res) => setLetest(res.data));
  }, []);

  console.log(latest);
  return (
    <div className="mt-24">
      <SectionTitle
        headingTitle="Latest News Update"
        subHeading="Our News"
      ></SectionTitle>
      <p className="text-[#676666] text-lg text-center mt-4">
        {" "}
        Our platform is dedicated to making the adoption process as smooth and
        enjoyable as possible. <br /> We connect you with local shelters and
        foster homes, providing detailed profiles <br /> of each pet, including
        their personality traits, health status, and history.
      </p>
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latest.map((l) => (
          <div key={l.name} className="flex">
            <Card className="mt-6 flex-grow">
              <CardHeader color="blue-gray" className="relative h-56">
                <img src={l.image} alt="card-image" />
              </CardHeader>

                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {l.name}
                  </Typography>
                  <Typography>{l.description}</Typography>
                </CardBody>

                <CardFooter className="pt-0 flex flex-grow">
                  <Button
                    size="sm"
                    variant="text"
                    className="flex items-center gap-2 text-[#F04335]"
                  >
                    Learn More
                    <img src={pawprint} alt="" className="w-5 rotate-90" />
                  </Button>
                </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
