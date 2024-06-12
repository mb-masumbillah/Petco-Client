import { Avatar, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const MyDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: allPets, refetch } = useQuery({
    queryKey: [user?.email, "allPets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/pet/${user?.email}`);
      return res.data;
    },
    initialData: [],
  });

  const handleRemove = (id) => {
    axiosSecure.patch(`/payment/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: ``,
          text: "Your file has been remove donate page.",
          icon: "success",
        });
      }
    });
  };

  console.log(allPets);

  const TABLE_HEAD = [
    "Si No.",
    "Donator image",
    "Donator name",
    "Donate Amount",
    "",
  ];
  const TABLE_ROWS = allPets;
  return (
    <div className="w-full">
      <div className="py-10">
        <SectionTitle
          subHeading="Pet Donation"
          headingTitle="My Donation"
        ></SectionTitle>
      </div>
      <div className="bg-blue-gray-200 lg:p-6 p-3 w-full">
        <table className="w-full text-center">
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
              ({ _id, donator_image, donator_name, price, remove }, index) => {
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
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {remove == "remove" ? (
                          <p className="text-red-600">Remove</p>
                        ) : (
                          <button
                            onClick={() => handleRemove(_id)}
                            className="bg-red-600 text-white block px-2 py-1"
                          >
                            Remove
                          </button>
                        )}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonations;
