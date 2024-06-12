import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Table from "../../Custom/Table/Table";
import { useQuery } from "@tanstack/react-query";
// import loadingImg from "../../assets/images/preloader.gif";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
// import DATA from "./Data";

const MyAddedPets = () => {
  const columnHelper = createColumnHelper();
  const axiosSecure = useAxiosSecure();

  // const [allPets, setPets] = useState([]);
  // useEffect(() => {
  //   async function myfunction() {
  //     const res = await axiosSecure.get("/petListing");
  //     const allPets = res.data;
  //     console.log(allPets);
  //     setPets(allPets);
  //   }
  //   myfunction();
  // }, [axiosSecure]);

  const { user } = useAuth();

  const { data: allPets, refetch } = useQuery({
    queryKey: [user?.email, "allPets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/petListing/pet/${user?.email}`);
      return res.data;
    },
    initialData: []
  });

  console.log(allPets);

  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "S.No",
    }),
    columnHelper.accessor("petImage", {
      cell: (info) => (
        <img
          src={info?.getValue()}
          alt="..."
          className="rounded-full w-10 h-10 object-cover"
        />
      ),
      header: "Pet image",
    }),
    columnHelper.accessor("petname", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Pet name",
    }),
    columnHelper.accessor("category", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Pet Category",
    }),
    columnHelper.accessor("adopted", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Adoption Status",
    }),
    columnHelper.accessor("_id", {
      cell: (info) => (
        <Link
          to={`/dashboard/petUpdate/${info.getValue()}`}
          className="bg-[#229810] px-2 py-1 rounded-md active:scale-95 duration-300"
        >
          Update
        </Link>
      ),
      header: "Update Status",
    }),
    columnHelper.accessor("_id", {
      cell: (info) => (
        <div>
          {allPets
            .filter((p) => p._id == info.getValue())
            .map((p) =>
              p.adopted == "Not Adopted" ? (
                <button
                  key={p._id}
                  className="bg-[#80a111] px-2 py-1 rounded-md"
                  onClick={() => handleAdopted(info.getValue())}
                >
                  Adopted
                </button>
              ) : (
                "Adopted"
              )
            )}
        </div>
      ),
      header: "Adopted Status",
    }),
    columnHelper.accessor("_id", {
      cell: (info) => (
        <button
          className="bg-[#F04335] px-2 py-1 rounded-md active:scale-95 duration-300"
          onClick={() => handleDelete(info.getValue())}
        >
          Delete
        </button>
      ),
      header: "Delete Status",
    }),
  ];

  const handleAdopted = (id) => {
    axiosSecure.patch(`/petListing/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: `it has been adopted`,
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const handleDelete = (id) => {
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
        axiosSecure.delete(`/petListing/${id}`).then((res) => {
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

  const [globalFilter, setGlobalFilter] = useState("");

  // if (allPets.length > 1) {
  //   return (
  //     <>
  //       <div className="h-screen flex justify-center items-center">
  //         <img src={loadingImg} alt="" className="w-64" />
  //       </div>
  //     </>
  //   );
  // }

  // {data, columns, globalFilter, setGlobalFilter}
  return (
    <>
      <div className="mt-10 mb-5">
        <SectionTitle
          headingTitle={"My Added Pets"}
          subHeading={"Pets"}
        ></SectionTitle>
      </div>

      {allPets && (
        <Table
          data={allPets}
          columns={columns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        ></Table>
      )}
    </>
  );
};

export default MyAddedPets;
