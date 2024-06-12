import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import { useForm } from "react-hook-form";
import signUpImg from "../../assets/images/login.svg";
import SocialLogin from "../../Component/SocialLogin/SocialLogin";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { Input, Spinner } from "@material-tailwind/react";

const Signup = () => {
  const { createUser, updateUserProfile, setLoading, loading } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            image: data.photoURL
          };

          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your register has been Successfull",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        });
      })
      .catch((error) => {
        if (error) {
          reset();
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.message}`,
          });
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>PET | Sign Up</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div>
        <div className="min-h-screen flex justify-center items-center bg-slate-200">
          <div className=" flex flex-col lg:flex-row">
            <div className="shadow-2xl bg-base-100 flex gap-10 p-5 items-center justify-between">
              <div className="lg:block hidden">
                <img src={signUpImg} alt="" className="h-[450px]" />
              </div>
              <div className="shadow-xl border p-5 bg-slate-200">
                <div className="">
                  <h1 className="text-5xl text-center font-extrabold text-[#F04335]">
                    Sign Up
                  </h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                      <label className="">
                        <span className="">Name</span>
                      </label>
                      <Input
                        size="lg"
                        label="Name"
                        type="text"
                        placeholder="name"
                        className="input input-bordered"
                        {...register("name", { required: true })}
                      />
                      {errors.name && (
                        <span className="text-red-600">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="">
                      <label className="">
                        <span className="">Photo URL</span>
                      </label>
                      <Input
                        size="lg"
                        label="PhotoUrl"
                        type="text"
                        {...register("photoURL", { required: true })}
                        placeholder="Photo URL"
                        className="input input-bordered"
                      />
                      {errors.photoURL && (
                        <span className="text-red-600">
                          Photo URL is required
                        </span>
                      )}
                    </div>
                    <div className="">
                      <label className="">
                        <span className="">Email</span>
                      </label>
                      <Input
                        size="lg"
                        label="Email"
                        type="email"
                        placeholder="email"
                        className="input input-bordered"
                        {...register("email", { required: true })}
                      />
                      {errors.email && (
                        <span className="text-red-600">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="">
                      <label className="">
                        <span className="">Password</span>
                      </label>
                      <Input
                        size="lg"
                        label="Password"
                        type="password"
                        placeholder="password"
                        className="input input-bordered"
                        {...register("password", {
                          required: true,
                          minLength: 6,
                          maxLength: 20,
                          pattern:
                            /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                        })}
                      />
                      {errors.password?.type === "required" && (
                        <p className="text-red-600">Password is required</p>
                      )}
                      {errors.password?.type === "minLength" && (
                        <p className="text-red-600">
                          Password must be 6 characters
                        </p>
                      )}
                      {errors.password?.type === "maxLength" && (
                        <p className="text-red-600">
                          Password must be less than 20 characters
                        </p>
                      )}
                      {errors.password?.type === "pattern" && (
                        <p className="text-red-600">
                          Password must have one Uppercase one lower case, one
                          number and one special character.
                        </p>
                      )}
                    </div>
                    <div className="mt-6">
                      <button className="w-full py-3 rounded-md active:scale-95 duration-300 bg-[#F04335] hover:bg-[#F04335] text-white font-bold">
                        {loading ? (
                          <Spinner className="w-full flex justify-center items-center" />
                        ) : (
                          <span>Sign up</span>
                        )}
                      </button>
                    </div>
                  </form>
                  <p className=" text-center mt-4">
                    Already Have an Account?{" "}
                    <Link className="text-orange-600 font-bold" to="/login">
                      Login
                    </Link>{" "}
                  </p>
                </div>
                <div className="text-center mb-5">
                  <SocialLogin></SocialLogin>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
