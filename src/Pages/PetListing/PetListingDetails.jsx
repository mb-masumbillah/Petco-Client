// import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useLoaderData, useParams } from "react-router-dom";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import paw from "../../assets/images/pawprint (1).png";
import { useState } from "react";
import { Box, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "@tanstack/react-query";

const PetListingDetails = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const loaderData = useLoaderData();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: allPets = [], isLoading } = useQuery({
    queryKey: ["petDonation"],
    queryFn: async () => {
      const res = await axiosPublic.get("/petListing");
      return res.data;
    },
  });

  const { id } = useParams();

  const petData = allPets.filter((f) => f._id === id);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    reset();
    const adoptInfo = {
      petid: loaderData._id,
      petName: loaderData.name,
      petImage: loaderData.petImage,
      pet_owner: loaderData.email,
      adoptName: data.name,
      adoptEmail: data.email,
      adoptNumber: data.number,
      adoptAddress: data.address,
      request: "",
    };
    axiosPublic.post("/adoptInfo", adoptInfo).then((res) => {
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your register has been Successfull",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="mt-40 lg: flex justify-center items-center gap-2 border border-gray-200 rounded-lg">
        <div className="w-full">
          <Skeleton count={1} height={500} width={400} />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton count={1} height={40} width={700} />
          <Skeleton count={1} height={100} width={700} />
          <Skeleton count={1} height={140} width={700} />
          <Skeleton count={1} height={40} width={700} />
          <Skeleton count={1} height={40} width={700} />
          <Skeleton count={1} height={40} width={700} />
          <Skeleton count={1} height={40} width={700} />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:mt-28 mt-16">
      <div>
        <SectionTitle
          headingTitle="Pet Details"
          subHeading="Details"
        ></SectionTitle>
      </div>
      <div className="lg:mt-10 mt-5">
        {petData.map((loaderData) => (
          <Card key={loaderData._id} className="w-full border border-light-blue-900 lg:flex-row flex-col">
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 lg:w-2/5 shrink-0 rounded-r-none"
            >
              <img
                src={loaderData.petImage}
                alt="card-image"
                className="h-full w-full object-cover rounded-xl lg:rounded-none"
              />
            </CardHeader>
            <CardBody className="w-full pt-2">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                Name : {loaderData.petname}
              </Typography>
              <Typography
                color="gray"
                className=" font-normal text-xl py-2 border-t border-[#F04336]"
              >
                Category : {loaderData.category}
              </Typography>
              <Typography
                color="gray"
                className=" font-normal text-xl py-2 border-t border-[#F04336]"
              >
                Age : {loaderData.age}
              </Typography>
              <Typography
                color="gray"
                className=" font-normal text-xl py-2 border-t border-[#F04336]"
              >
                Short Description : {loaderData.shortdescription}
              </Typography>
              <Typography
                color="gray"
                className=" font-normal text-xl py-2  flex justify-start items-center gap-1 border-t border-[#F04336]"
              >
                <span> Long Description : </span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: loaderData.longdescription,
                  }}
                ></div>
              </Typography>
              <Typography
                color="gray"
                className=" font-normal text-xl py-2 border-t border-[#F04336]"
              >
                Location : {loaderData.location}
              </Typography>
              <Typography
                color="gray"
                className=" font-normal text-xl py-2 border-t border-b border-[#F04336]"
              >
                Date : {loaderData.date}
              </Typography>

              <div className="mt-4">
                <Button
                  onClick={handleOpen}
                  variant="text"
                  className="flex items-center bg-transparent hover:bg-transparent border border-[#F04336] font-extrabold text-[#F04336] gap-3 text-xl"
                >
                  <span>Adopt</span>
                  <img src={paw} alt="" className="w-5 rotate-90" />
                </Button>

                {/* modal */}
                <div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                      <div className="bg-white lg:p-6 p-3">
                        <Card color="transparent" shadow={false}>
                          <p className="text-xl font-bold mb-2">
                            Name : {loaderData.petname}
                          </p>
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="lg:w-[300px] w-[200px]"
                          >
                            <div className="mb-1 flex flex-col gap-6">
                              <Input
                                label="Username"
                                value={user.displayName}
                                {...register("name", { required: true })}
                              />
                              <Input
                                label="Email"
                                value={user.email}
                                {...register("email", { required: true })}
                              />
                              <Input
                                label="Number"
                                {...register("number", { required: true })}
                              />
                              <Textarea
                                label="Address"
                                {...register("address", { required: true })}
                              />
                            </div>

                            <button className="text-white py-2 font-bold rounded-lg active:scale-95 duration-300 bg-[#F04336] w-full">
                              Submit
                            </button>
                          </form>
                        </Card>
                      </div>
                    </Box>
                  </Modal>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PetListingDetails;
