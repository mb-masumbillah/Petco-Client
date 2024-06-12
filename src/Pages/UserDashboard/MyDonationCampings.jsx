import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import ProgressBar from "@ramonak/react-progress-bar";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Box, Modal } from "@mui/material";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const MyDonationCampings = () => {
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState([]);

  const handleClose = () => setOpen(false);

  const { user } = useAuth();

  const { data: allDonation , refetch} = useQuery({
    queryKey: [user?.email, "allDonation"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/petDonation/pet/${user?.email}`);
      return res.data;
    },
    initialData: [],
  });

  const { data: allPayment = [] } = useQuery({
    queryKey: [user?.email, "allPayment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/pet/${user?.email}`);
      return res.data;
    },
  });

  const handleOpen = (id) => {
    const x = allPayment.filter((p) => p.campaign_id == id);
    setPayment(x);
    setOpen(true);
  };

  const handlePause = (id) => {
    const pause = { pause: "pause" };
    axiosSecure.put(`/petDonation/${id}`, pause).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };
  const handleUnPause = (id) => {
    const pause = { pause: "Unpause" };
    axiosSecure.put(`/petDonation/${id}`, pause).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  const TABLE_HEAD = [
    "Pet image",
    "Pet name",
    "Maximum donation",
    "Donation Progress",
    " ",
    "Action",
    " ",
  ];
  const TABLE_HEADModal = ["Donator image", "Donator name", "Donate Amount"];

  const TABLE_ROWS = allDonation;
  const TABLE_ROWSModal = payment;
  return (
    <div>
      <div className="mt-10">
        <SectionTitle
          subHeading="Pet Donation"
          headingTitle="My Donation Camping"
        ></SectionTitle>
      </div>
      <div className="mt-10">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72">
                  <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody className=" px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(
                  (
                    {
                      _id,
                      image,
                      petName,
                      maximumDonation,
                      donatedAmount,
                      pause
                    },
                    index
                  ) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={name}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={image}
                              alt={name}
                              size="md"
                              className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                            />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {petName}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {maximumDonation}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            <ProgressBar
                              completed={donatedAmount}
                              maxCompleted={maximumDonation}
                              customLabel={`${parseInt(
                                (donatedAmount / maximumDonation) * 100
                              )} %`}
                            />
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Tooltip content="Edit">
                            <Link
                              to={`/dashboard/donationEdit/${_id}`}
                              className="bg-red-600 text-white block px-2 py-1"
                            >
                              Edit
                            </Link>
                          </Tooltip>
                        </td>
                        <td className={classes}>
                          <Tooltip content="">
                          
                            {pause == "pause" ? (
                              <button
                                onClick={() => handleUnPause(_id)}
                                className="bg-red-600 text-white block px-2 py-1"
                              >
                                Unpause
                              </button>
                            ) : (
                              pause == "Unpause" && (
                                <button
                                  onClick={() => handlePause(_id)}
                                  className="bg-red-600 text-white block px-2 py-1"
                                >
                                  Pause
                                </button>
                              )
                            )}
                          </Tooltip>
                        </td>
                        <td className={classes}>
                          <Tooltip content="View Donators">
                            <button
                              onClick={() => handleOpen(_id)}
                              className="bg-red-600 text-white block px-2 py-1"
                            >
                              View
                            </button>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <IconButton variant="outlined" size="sm">
                1
              </IconButton>
              <IconButton variant="text" size="sm">
                2
              </IconButton>
              <IconButton variant="text" size="sm">
                3
              </IconButton>
              <IconButton variant="text" size="sm">
                ...
              </IconButton>
              <IconButton variant="text" size="sm">
                8
              </IconButton>
              <IconButton variant="text" size="sm">
                9
              </IconButton>
              <IconButton variant="text" size="sm">
                10
              </IconButton>
            </div>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute w-[400px] overflow-scroll h-[400px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <button
              onClick={handleClose}
              className="bg-red-500 absolute top-0 px-4 py-2 font-bold text-white  text-2xl rounded-full"
            >
              X
            </button>

            <div className="bg-white lg:p-6 p-3">
              <table>
                <thead>
                  <tr>
                    {TABLE_HEADModal.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWSModal.map(
                    ({ donator_image, donator_name, price }, index) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={name}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Avatar
                                src={donator_image}
                                alt={name}
                                size="md"
                                className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                              />
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {name}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {donator_name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {price}
                            </Typography>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default MyDonationCampings;
