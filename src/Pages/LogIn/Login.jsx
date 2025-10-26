import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import auth from "../../Firebase/firebase.config";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import loginImg from "../../assets/images/login.svg";
import SocialLogin from "../../Component/SocialLogin/SocialLogin";
import { Input, Spinner } from "@material-tailwind/react";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const Login = () => {
  const { signIn, loading } = useAuth(auth);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  // const from = location.state?.from?.pathname || "/";

  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
    .then((result) => {
      const userdata = result.user;
      console.log(userdata);

      const userInfo = {
        name: userdata.displayName,
        email: userdata.email,
        image: userdata.photoURL,
        role: "user",
      };

      axiosPublic.post("/users", userInfo).then((res) => {
        if (res.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your login has been Successfull",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(location?.state ? location.state : "/");
        } else {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Login has been Successfull",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(location?.state ? location.state : "/");
        }
      });
    });
  };

  return (
    <div>
      <Helmet>
        <title> Petco | Log in</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="min-h-screen flex justify-center items-center bg-slate-200">
        <div className="flex flex-col lg:flex-row">
          <div className="shadow-2xl bg-base-100 flex gap-10 p-5 items-center justify-between">
            <div className="hidden lg:block">
              <img src={loginImg} alt="" className="h-[450px]" />
            </div>
            <div className="shadow-xl border p-5 bg-slate-200">
              <div className="w-full">
                <h1 className="text-5xl text-center font-extrabold text-[#F04335]">
                  Login
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control">
                    <label className="">
                      <span className="">Email</span>
                    </label>
                    <Input
                      size="lg"
                      label="Email"
                      type="email"
                      placeholder="email"
                      className=""
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-red-600">
                        Email field is required
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <label className="">
                      <span className="">Password</span>
                    </label> 
                    <Input 
                      size="lg"
                      label="Password"
                      type="password"
                      placeholder="password"
                      className=""
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-red-600">
                        Password field is required
                      </span>
                    )}
                    <label className="">
                      <a href="#" className="">
                        Forgot password?
                      </a>
                    </label>
                  </div>
                  <div className=" mt-6">
                    <button className="w-full py-3 rounded-md active:scale-95 duration-300 bg-[#F04335] hover:bg-[#F04335] text-white font-bold">
                      {loading ? (
                        <Spinner className="w-full flex justify-center items-center" />
                      ) : (
                        <span>Login</span>
                      )}
                    </button>
                  </div>
                </form>
                <p className="text-center mt-4">
                  New to Car Doctors{" "}
                  <Link className="text-orange-600 font-bold" to="/signup">
                    Sign Up
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center mb-5 w-full">
                <SocialLogin></SocialLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
