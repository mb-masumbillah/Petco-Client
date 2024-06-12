import Select from "react-select";
import { useState } from "react";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const image_hoisting_key = import.meta.env.VITE_IMAGE_HOISTING_KEY;
const image_hoisting_api = `https://api.imgbb.com/1/upload?key=${image_hoisting_key}`;
const AddAPet = () => {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const axiosPublic = useAxiosPublic();
  const [value, setValue] = useState("");

  const options = [
    { value: "cat", label: "Cat" },
    { value: "dog", label: "Dog" },
    { value: "fish", label: "Fish" },
    { value: "rabbit", label: "Rabbit" },
  ];

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const date = new Date();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const resimg = await axiosPublic.post(image_hoisting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (resimg.data.success) {
      const petInfo = {
        category: selectedOption.value,
        date: date.toString(),
        adopted: "Not Adopted",
        petImage: resimg.data.data.display_url,
        petname: data.petname,
        location: data.location,
        shortdescription: data.shortdescription,
        longdescription: value,
        age: data.age,
        email: user?.email,
      };

      console.log(petInfo);

      const res = await axiosPublic.post("/petListing", petInfo);
      if (res.data.insertedId) {
        reset();
        // show success popup
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Pet is added successfull`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="flex justify-center px-10 items-center pb-10">
      <div className="bg-[#f0413518] px-5 shadow-lg shadow-[red] pb-7 mt-10 rounded-xl">
        <div className="mt-5">
          <SectionTitle
            headingTitle="Add a Pet"
            subHeading="Pet"
          ></SectionTitle>
        </div>
        <div className="w-full mt-5 border-[#0A303A] rounded-xl bg-gray-5 px-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-1 text-sm">
                  <label htmlFor="petname" className="block text-gray-600">
                    Pet Name
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border-[#0A303A] border border-rose-300 focus:outline-[#F04335] rounded-md "
                    name="petname"
                    id="petname"
                    type="text"
                    placeholder="Pet name"
                    {...register("petname", { required: true })}
                  />
                  {errors.petname && (
                    <span className="text-[red]">This field is required</span>
                  )}
                </div>

                <div className="space-y-1 text-sm">
                  <label htmlFor="category" className="block text-gray-600">
                    Category
                  </label>
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    required
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between gap-2">
                  <div className="space-y-1 text-sm">
                    <label htmlFor="age" className="block text-gray-600">
                      Age
                    </label>
                    <input
                      className="w-full px-4 py-3 text-gray-800  border border-[#0A303A] focus:outline-[#F04335] rounded-md "
                      name="age"
                      id="age"
                      type="text"
                      placeholder="age"
                      {...register("age", { required: true })}
                    />
                    {errors.age && (
                      <span className="text-[red]">This field is required</span>
                    )}
                  </div>
                  <div className="space-y-1 text-sm">
                    <label htmlFor="location" className="block text-gray-600">
                      Location
                    </label>
                    <input
                      className="w-full px-4 py-3 text-gray-800 border-[#0A303A] border border-rose-300 focus:outline-[#F04335] rounded-md "
                      name="location"
                      id="location"
                      type="text"
                      placeholder="location"
                      {...register("location", { required: true })}
                    />
                    {errors.location && (
                      <span className="text-[red]">This field is required</span>
                    )}
                  </div>
                </div>
                <div className="form-control">
                  <span className="block text-gray-600">Images</span>
                  <label className="form-control w-full">
                    <input
                      {...register("image", { required: true })}
                      type="file"
                      className="w-full px-4 py-2 text-gray-800 border-[#0A303A] border border-rose-300 rounded-md"
                    />
                    {errors.image && (
                      <span className="text-[red]">This field is required</span>
                    )}
                  </label>
                </div>
                <div className="space-y-1 text-sm">
                  <label
                    htmlFor="shortdescription"
                    className="block text-gray-600"
                  >
                    Short description
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border-[#0A303A] border border-rose-300 focus:outline-[#F04335] rounded-md "
                    name="shortdescription"
                    id="shortdescription"
                    type="text"
                    placeholder="short description"
                    {...register("shortdescription", { required: true })}
                  />
                  {errors.shortdescription && (
                    <span className="text-[red]">This field is required</span>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-1 text-sm w-full">
              <label htmlFor="longdescription" className="block text-gray-600">
                Long Description
              </label>
              {/* <textarea
                id="longdescription"
                placeholder="long description"
                className="block rounded-md focus:outline-[#F04335] w-full h-32 px-4 py-3 text-gray-800 border-[#0A303A]  border border-rose-300 focus:outline-rose-0 "
                name="longdescription"
                {...register("longdescription", { required: true })}
              ></textarea>{" "}
              {errors.longdescription && (
                <span className="text-[red]">This field is required</span>
              )} */}
              <ReactQuill
                theme="snow"
                className="w-[650px] mx-auto"
                value={value}
                onChange={setValue}
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center border bg-[#F04335] text-white hover:border-[#F04335] hover:text-[#F04335] hover:bg-white active:scale-95 text-xl font-bold transition duration-200 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAPet;
