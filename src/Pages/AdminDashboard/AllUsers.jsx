import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Avatar, CardBody, Typography } from "@material-tailwind/react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  console.log(users);

  const handleMakeAdmin = (id, name) => {
    axiosSecure.patch(`/users/admin/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: `${name} is a admin now`,
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleDeleteUser = (id) => {
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
        axiosSecure.delete(`/users/${id}`).then((res) => {
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
  };

  const TABLE_HEAD = ["Member", "Role", "Status", "Action", ""];

  return (
    <div>
      <div className="flex justify-evenly mt-4">
        <h2 className="text-3xl font-bold">All Users</h2>
        <h2 className="text-3xl font-bold">Total Users: {users.length}</h2>
      </div>

      <CardBody className="">
        <table className="mt-4 w-full min-w-max table-auto text-left">
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
            {users.map(({ _id, image, name, email, role }, index) => {
              const isLast = index === users.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={image} alt={name} size="sm" />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {role === "admin" ? "Admin" : "User"}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    {role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(_id, name)}
                        className="bg-[#F04335] px-3 py-2 rounded-md active:scale-95 duration-300 "
                      >
                        <FaUsers
                          className="text-white 
                                text-2xl"
                        ></FaUsers>
                      </button>
                    )}
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      <button
                        onClick={() => handleDeleteUser(_id)}
                        className="px-3 py-2 rounded-md active:scale-75 duration-300 "
                      >
                        <FaTrashAlt className="text-red-600 text-2xl"></FaTrashAlt>
                      </button>
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </div>
  );
};

export default AllUsers;
