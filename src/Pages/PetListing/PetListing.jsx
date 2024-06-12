import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../Hook/useAxiosPublic";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import loading from "../../assets/images/preloader.gif";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "@docsearch/css";

import { FaChevronDown } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useInView } from "react-intersection-observer";

const PetListing = () => {
  const axiosPublic = useAxiosPublic();
  const [spinner, setspinner] = useState(false);
  const [petLists, setPetLists] = useState([]);

  const { ref } = useInView({
    trackVisibility: true,
    delay: 100,
  });

  const { data: petList = [], isLoading } = useQuery({
    queryKey: ["petListing"],
    queryFn: async () => {
      const res = await axiosPublic.get("/petListing");
      return res.data;
    },
    // initialData: [],
  });

  useEffect(() => {
    const filter = petList.filter((p) => p.request !== "Accepted");
    setPetLists(filter);
  }, [petList]);

  const [allpets, setdata] = useState([]);

  useEffect(() => {
    setdata(petLists);
  }, [petLists]);

  const onchange = (event) => {
    console.log(event.target.value);
    setdata(
      petLists.filter((f) =>
        f.petname.toLowerCase().includes(event.target.value)
      )
    );
    if (event.target.value) {
      setspinner(true);
    } else {
      setspinner(false);
    }
  };
  const handledropdown = (catagory) => {
    const x = petLists.filter((c) => c.category === catagory);
    setdata(x);
    if (catagory === "all") {
      setdata(petLists);
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <img src={loading} alt="" className="w-64" />
        </div>
      </>
    );
  }

  return (
    <div className="lg:mt-28 mt-16" ref={ref}>
      <div>
        <SectionTitle headingTitle="Pet List" subHeading="Pets"></SectionTitle>
      </div>
      <div className="flex justify-evenly mt-10">
        <div>
          <Menu>
            <MenuHandler>
              <Button className="flex items-center gap-3">
                <span>Pets</span> <FaChevronDown />
              </Button>
            </MenuHandler>
            <MenuList className="bg-[#212121] text-white">
              <MenuItem onClick={() => handledropdown("all")}>All</MenuItem>
              <MenuItem onClick={() => handledropdown("cat")}>Cats</MenuItem>
              <MenuItem onClick={() => handledropdown("dog")}>Docs</MenuItem>
              <MenuItem onClick={() => handledropdown("rabbit")}>
                Rabbit
              </MenuItem>
              <MenuItem onClick={() => handledropdown("fish")}>Fish</MenuItem>
            </MenuList>
          </Menu>
        </div>

        <div className="relative flex w-full max-w-[19rem]">
          <input
            type="search"
            onChange={onchange}
            placeholder="search"
            className="w-full h-10 border-2 border-[#212121] px-5 pr-12 rounded-md outline-none"
          />
          <button className="!absolute right-[1px] top-[2px] rounded">
            {spinner ? (
              <div className="">
                <img
                  src={loading}
                  alt=""
                  className="w-12 border rounded-md border-[#212121]"
                />
              </div>
            ) : (
              <BiSearch className="text-3xl absolute rounded-md border p-1 border-[#212121] right-1 top-[3px]"></BiSearch>
            )}
          </button>
        </div>
      </div>
      <div className="lg:mt-10 mt-5 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {allpets.map((pet) => (
          <div key={pet._id}>
            <Card className="lg:w-[350px]">
              <CardHeader shadow={false} floated={false} className="lg:h-64">
                <img
                  src={pet.petImage}
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <div className="border-t border-b border-[#F04336]">
                  <h2 className="font-bold text-lg">Name : {pet.petname}</h2>
                  <h2>
                    <span className="font-bold">Age</span> : {pet.age}
                  </h2>
                  <h2>
                    <span className="font-bold">location</span> : {pet.location}
                  </h2>
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Link to={`/petListing/${pet._id}`}>
                  <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-[#F04336] text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  >
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetListing;
