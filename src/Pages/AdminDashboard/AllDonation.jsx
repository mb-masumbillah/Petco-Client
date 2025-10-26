import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllDonation = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allDonation = [], refetch } = useQuery({
    queryKey: ["petDonation"],
    queryFn: async () => {
      const res = await axiosSecure.get("/petDonation");
      return res.data;
    },
  });

  const handleDonationDelete = (id) =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true, 
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/petDonation/${id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
        }
      });
  }

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
  const TABLE_ROWS = allDonation;
  return (
    <div>
      <div className="mt-10">
        <SectionTitle
          subHeading="Pet Donation"
          headingTitle="All Donation"
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
          <CardBody className="px-0">
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
                    { _id, image, petName, maximumDonation, donatedAmount,pause },
                    index
                  ) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={name}>
                         <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {index + 1}
                          </Typography>
                        </td>
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
                            {donatedAmount}
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
                          <Tooltip content="Pause">
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
                          <Tooltip content="Delete">
                            <button onClick={() => handleDonationDelete(_id)} className="bg-red-600 text-white block px-2 py-1">
                              Delete
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
      <div></div>
    </div>
  );
};

export default AllDonation;
