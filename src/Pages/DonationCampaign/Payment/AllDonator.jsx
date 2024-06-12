import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { useState } from "react";
import Table from "../../../Custom/Table/Table";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";

const AllDonator = () => {
  const columnHelper = createColumnHelper();
  const axiosPublic = useAxiosPublic();

  const { data: allPay = [] } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await axiosPublic.get("/payment");
      return res.data;
    },
  });

  const allPayment = allPay.filter(p => p.remove !== "remove")

  console.log(allPayment);

  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "S.No",
    }),
    columnHelper.accessor("donator_image", {
      cell: (info) => (
        <img
          src={info?.getValue()}
          alt="..."
          className="rounded-full w-10 h-10 object-cover"
        />
      ),
      header: "Pet image",
    }),
    columnHelper.accessor("donator_name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Donator Name",
    }),
    columnHelper.accessor("donator_email", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Donator Email",
    }),
    columnHelper.accessor("date", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Donate Date",
    }),
    columnHelper.accessor("price", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Donate Amount",
    }),
  ];

  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <div>
      <div className="mt-10 mb-5">
        <SectionTitle
          headingTitle={"All Donator"}
          subHeading={"Pets donator"}
        ></SectionTitle>
      </div>

      {allPayment && (
        <Table
          data={allPayment}
          columns={columns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        ></Table>
      )}
    </div>
  );
};

export default AllDonator;
