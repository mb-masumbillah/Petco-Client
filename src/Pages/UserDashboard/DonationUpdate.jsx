import { useLoaderData, useNavigate } from "react-router-dom";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { TbFidgetSpinner } from "react-icons/tb";
import { imageUpload } from "./utils";

const DonationUpdate = () => {
  const donationData = useLoaderData();

  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("upload pet image");
  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: async (PetData) => {
      const { data } = await axiosPublic.put(`/petDonation/${donationData._id}`, PetData);
      return data;
    },
    onSuccess: () => {
      navigate('/dashboard/myDonationCampign')
      console.log("Data Update Successfully");
      toast.success("Pet donation campaign Update Successfully!");
      setLoading(false);
    },
  });

  //   Form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let form = e.target;
    const maximumDonation = form.maximumDonation.value;
    const petName = form.petName.value;
    const date = form.date?.value;
    const shortDescription = form.shortDescription.value;
    const longDescription = form.longDescription.value;
    const image = form.image.files[0];
    console.log(date);

    try {
      const image_url = await imageUpload(image);
      const petDonateData = {
        maximumDonation,
        petName,
        date,
        longDescription,
        shortDescription,
        image: image_url,
      };
      console.table(petDonateData);

      //   Post request to server
      await mutateAsync(petDonateData);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  //   handle image change
  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };
  return (
    <div className="mb-10 px-5">
      <div className="my-6">
        <SectionTitle
          headingTitle="Pet Donation Compaign Upadet"
          subHeading="Pet Donation"
        ></SectionTitle>
      </div>
      <div className="w-full py-10 flex flex-col justify-center items-center text-gray-800 rounded-xl border border-[#F04335] px-5 shadow-xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="space-y-1 text-sm">
                  <label htmlFor="petName" className="block text-gray-600">
                    Pet name
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md outline-[#F04335]"
                    name="petName"
                    id="petName"
                    type="text"
                    defaultValue={donationData.petName}
                    placeholder="Pet name"
                    required
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label
                    htmlFor="maximumDonation"
                    className="block text-gray-600"
                  >
                    Maximum donation amount
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md outline-[#F04335]"
                    name="maximumDonation"
                    id="maximumDonation"
                    type="number"
                    defaultValue={donationData.maximumDonation}
                    placeholder="maximum Donation"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="date" className="block text-gray-600">
                  Last Date of Donation
                </label>
                {/* Calender */}
                <input
                  type="datetime-local"
                  name="date"
                  id="date"
                  defaultValue={donationData.date}
                
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md outline-[#F04335]"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className=" p-4 bg-white w-full  m-auto rounded-lg flex justify-between items-center">
                <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                  <div className="flex flex-col w-max mx-auto text-center">
                    <label>
                      <input
                        className="text-sm cursor-pointer w-36 hidden"
                        type="file"
                        onChange={(e) => handleImage(e.target.files[0])}
                        name="image"
                        id="image"
                        accept="image/*"
                        hidden
                      />
                      <div className="bg-rose-500text-white border rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
                        {/* {imageText} */}
                        {imageText.length > 20
                          ? imageText.split(".")[0].slice(0, 15) +
                            "...." +
                            imageText.split(".")[1]
                          : imageText}
                      </div>
                    </label>
                  </div>
                </div>
                <div className="h-16 w-16 object-cover overflow-hidden flex items-center">
                  {imagePreview && <img src={imagePreview} />}
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <label
                  htmlFor="shortDescription"
                  className="block text-gray-600"
                >
                  Short Description
                </label>

                <textarea
                  id="shortDescription"
                  className="block rounded-md focus:rose-300 w-full h-20 px-4 py-3 text-gray-800  border border-rose-300 outline-[#F04335] focus:outline-rose-500 "
                  name="shortDescription"
                  placeholder="Short description"
                  defaultValue={donationData.shortDescription}
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="longDescription" className="block text-gray-600">
              Long Description
            </label>

            <textarea
              id="longDescription"
              className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 outline-[#F04335] focus:outline-rose-500 "
              name="longDescription"
              defaultValue={donationData.longDescription}
              placeholder="Long description"
              required
            ></textarea>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full p-3 mt-5 text-center bg-[#F04335] text-white text-xl font-bold border border-red-400 transition duration-200 rounded shadow-md bg-rose-500"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationUpdate;
