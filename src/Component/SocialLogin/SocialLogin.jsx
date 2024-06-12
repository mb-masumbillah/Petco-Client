import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
// import googleImg from "../../assets/images/google (2).png";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { Button } from "@material-tailwind/react";

const SocialLogin = () => {
  const { google } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  console.log(location)

  // const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    google().then((result) => {
      if (result) {
        const googleInfo = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL
        };

        axiosPublic.post("/users", googleInfo)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your login has been successfull",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(location?.state ? location.state : "/");
          }
          else {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your login has been successfull",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(location?.state ? location.state : "/");
          }
        });
      } 
    });
  };
  return (
    <div className="px-10">
      <Button
      onClick={handleGoogleLogin}
        size="lg"
        variant="outlined"
        color="blue-gray"
        className="flex items-center gap-3 w-full mt-3"
      >
        <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
        Continue with Google
      </Button>
    </div>
  );
};

export default SocialLogin;
