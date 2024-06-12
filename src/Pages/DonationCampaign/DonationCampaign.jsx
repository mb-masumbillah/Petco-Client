import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import paw from "../../assets/images/w_pawprint.png";
// import loadingimg from "../../assets/images/preloader.gif";
import AllDonator from "./Payment/AllDonator";
import useAllDonation from "../../Hook/useAllDonation";
import CardSkeleton from "../../Custom/Skeleton/CardSkeleton";

const DonationCampaign = () => {
  const [allDonation, isLoading] = useAllDonation();
  const newDate = new Date().toISOString();

  const filterDonation = allDonation.filter((d) => d.date >= newDate);
  console.log(filterDonation);

  console.log(newDate);

  if (isLoading) {
    return (
      <div className="mt-14 grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <CardSkeleton></CardSkeleton>
        <CardSkeleton></CardSkeleton>
        <CardSkeleton></CardSkeleton>
      </div>
    );
  }

  return (
    <div className="mt-28">
      <div>
        <div>
          <SectionTitle
            headingTitle="Donation Campaign"
            subHeading="Pet Donation"
          ></SectionTitle>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {filterDonation.map((donationCard) => (
            <div key={donationCard._id}>
              <div>
                <Card className="max-w-[24rem] border border-red-600">
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 rounded-none"
                  >
                    <img
                      src={donationCard.image}
                      alt="ui/ux review check"
                      className="w-full h-[300px]"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h3" color="blue-gray">
                      {donationCard.petName}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="gray"
                      className="mt-3 font-normal"
                    >
                      <span>Maximum Donation</span> :{" "}
                      <span>{donationCard.maximumDonation}</span> BDT
                    </Typography>
                    <Typography
                      variant="h5"
                      color="gray"
                      className="mt-3 font-normal"
                    >
                      <span> Donated Amount </span> :{" "}
                      <span>{donationCard?.donatedAmount}</span> BDT
                    </Typography>
                  </CardBody>
                  <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center -space-x-3">
                      <Tooltip content={donationCard?.name}>
                        <Avatar
                          size="sm"
                          variant="circular"
                          alt="tania andrew"
                          src={donationCard?.user_image}
                          className="border-2 border-white hover:z-10"
                        />
                      </Tooltip>
                    </div>
                    <div>
                      <Link to={`/petDonation/${donationCard._id}`}>
                        <Button
                          ripple={false}
                          fullWidth={true}
                          className="bg-[#F04336] text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 flex items-center justify-center gap-3"
                        >
                          <span>View </span>{" "}
                          <img src={paw} className="w-5 rotate-90" alt="" />
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20">
        <AllDonator></AllDonator>
      </div>
    </div>
  );
};

export default DonationCampaign;
