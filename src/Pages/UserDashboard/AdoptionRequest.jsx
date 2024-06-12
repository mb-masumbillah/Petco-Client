import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import { Avatar, Typography } from "@material-tailwind/react";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";

const AdoptionRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: allRequest, refetch } = useQuery({
    queryKey: ["adoptInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/adoptInfo/pet/${user?.email}`);
      return res.data;
    },
    initialData: [],
  });

  console.log(allRequest);

  const { data: allPets = [], refetch: refetching } = useQuery({
    queryKey: ["petListing"],
    queryFn: async () => {
      const res = await axiosSecure.get("/petListing");
      return res.data;
    },
  });
  console.log(allPets);

  const handleAccepted = (petid) => {
    const adopted = { request: "Accepted" };
    axiosSecure.put(`/petListing/${petid}`, adopted).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetching();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Accepted has been successfull",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Rejected it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/adoptInfo/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Rejected!",
              text: "file has been Rejected.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const TABLE_HEAD = ["Pets image", "Email", "Number", "Address", "Action"];
  const TABLE_ROWS = allRequest;
  return (
    <div className="w-full">
      <div className="py-10">
        <SectionTitle
          subHeading="Pet"
          headingTitle="Adoption request"
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
              (
                {
                  petImage,
                  petName,
                  adoptEmail,
                  adoptNumber,
                  adoptAddress,
                  petid,
                  _id,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={petImage}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={petImage}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {petName}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {adoptEmail}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {adoptNumber}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {adoptAddress}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {allPets
                          .filter((p) => p._id == petid)
                          .map((f) =>
                            f.request == "Accepted" ? (
                              <div key={f._id} className="text-red-600 text-lg">Accepted</div>
                            ) : (
                              <div key={f._id} className="flex gap-3">
                                <button
                                  onClick={() => handleAccepted(petid)}
                                  className="bg-green-800 text-white block px-2 py-1"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleReject(_id)}
                                  className="bg-red-600 text-white block px-2 py-1"
                                >
                                  Reject
                                </button>
                              </div>
                            )
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

export default AdoptionRequest;
