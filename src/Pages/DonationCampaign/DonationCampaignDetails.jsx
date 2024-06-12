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
import { Link, useNavigate, useParams } from "react-router-dom";
import paw from "../../assets/images/pawprint (1).png";
import { useState } from "react";
import { Box, Modal } from "@mui/material";
import Payment from "./Payment/Payment";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import paws from "../../assets/images/w_pawprint.png";
import useAuth from "../../Hook/useAuth";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DonationCampaignDetails = () => {
  // const donationData = useLoaderData();

  const axiosPublic = useAxiosPublic();

  const {
    data: allDonations = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["petDonation"],
    queryFn: async () => {
      const res = await axiosPublic.get("/petDonation");
      return res.data;
    },
  });

  const { id } = useParams();

  const AlldonationData = allDonations.filter((f) => f._id === id);

  console.log(AlldonationData);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (user) {
      return setOpen(true);
    } else {
      navigate("/login");
    }
  };
  const handleClose = () => setOpen(false);

  const allDonation = allDonations.slice(0, 3);

  if (isLoading) {
    return (
      <div className="mt-40 lg: flex justify-center items-center gap-2 border border-gray-200 rounded-lg">
        <div className="w-full">
          <Skeleton count={1} height={500} width={400}/>
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton count={1} height={40} width={700}/>
          <Skeleton count={1} height={100} width={700}/>
          <Skeleton count={1} height={140} width={700}/>
          <Skeleton count={1} height={40} width={700}/>
          <Skeleton count={1} height={40} width={700}/>
          <Skeleton count={1} height={40} width={700}/>
          <Skeleton count={1} height={40} width={700}/>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-28">
      <div>
        <SectionTitle
          headingTitle="Pet Donation Campaign Details"
          subHeading="Pet Donation Details"
        ></SectionTitle>
      </div>
      <div className="mt-12">
        <div>
          {AlldonationData.map((donationData) => (
            <Card
              key={donationData._id}
              className="w-full lg:flex-row flex-col border border-[#f0423681]"
            >
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 lg:w-2/5 shrink-0 rounded-r-none"
              >
                <img
                  src={donationData.image}
                  alt="card-image"
                  className="h-full w-full object-cover rounded-xl lg:rounded-none"
                />
              </CardHeader>
              <CardBody className="w-full pt-2">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  <span className="font-bold">Pet Name</span> :{" "}
                  {donationData.petName}
                </Typography>

                <Typography
                  color="gray"
                  className=" font-normal text-xl py-2 border-t border-[#F04336]"
                >
                  <span className="font-bold underline">Short Description</span>{" "}
                  : {donationData.shortDescription}
                </Typography>
                <Typography
                  color="gray"
                  className=" font-normal text-xl py-2 border-t border-[#F04336]"
                >
                  <span className="font-bold underline">Long Description</span>{" "}
                  : {donationData.longDescription}
                </Typography>
                <Typography
                  color="gray"
                  className=" font-normal text-xl py-2 border-t border-[#F04336]"
                >
                  <span className="font-bold">Maximum Donation </span> :{" "}
                  {donationData.maximumDonation} BDT
                </Typography>
                <Typography
                  color="gray"
                  className=" font-normal text-xl py-2 border-t border-[#F04336]"
                >
                  <span className="font-bold">Donated Amount </span> :{" "}
                  {donationData.donatedAmount} BDT
                </Typography>

                <Typography
                  color="gray"
                  className=" font-normal text-xl py-2 border-t border-[#F04336]"
                >
                  <span className="font-bold">Donation Last Date</span> :{" "}
                  {donationData.date}
                </Typography>

                <div className="mt-4 flex justify-between items-center">
                  {donationData.pause == "pause" ? (
                    <p className="border border-[#F04336] font-extrabold text-[#F04336] px-3 py-2 text-xl">
                      Pause Donate
                    </p>
                  ) : (
                    <Button
                      onClick={handleOpen}
                      variant="text"
                      className="flex items-center bg-transparent hover:bg-transparent border border-[#F04336] font-extrabold text-[#F04336] gap-3 text-xl"
                    >
                      <span>Donate</span>
                      <img
                        src={paw}
                        alt=""
                        className="w-5 rotate-90 animate-pulse"
                      />
                    </Button>
                  )}
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-xl font-bold">Host</span>
                    <Tooltip content={donationData.name}>
                      <Avatar
                        size="sm"
                        variant="circular"
                        alt="tania andrew"
                        src={donationData.user_image}
                        className="border-2 border-white hover:z-10"
                      />
                    </Tooltip>
                  </div>
                </div>
              </CardBody>
              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className="absolute w-[500px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <div className="bg-white lg:p-6 p-3">
                      <Payment
                        setOpen={setOpen}
                        refetch={refetch}
                        campaign_id={donationData._id}
                        handleClose={handleClose}
                        newmount={donationData.donatedAmount}
                      ></Payment>
                    </div>
                  </Box>
                </Modal>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <div>
            <SectionTitle
              headingTitle="More Donation Campaign"
              subHeading="Pet Donation"
            ></SectionTitle>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {allDonation.map((donationCard) => (
              <div key={donationCard._id}>
                <div>
                  <Card className="max-w-[24rem] border border-red-600 hover:scale-105 duration-500">
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="m-0 rounded-none"
                    >
                      <img
                        src={donationCard.image}
                        alt="ui/ux review check"
                        className="h-[350px] w-full"
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
                            <img src={paws} className="w-5 rotate-90" alt="" />
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
      </div>
    </div>
  );
};

export default DonationCampaignDetails;
