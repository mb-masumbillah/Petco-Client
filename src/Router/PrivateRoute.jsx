import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useRef, useState } from "react";
import loadingpet from "../assets/images/preloader.gif";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (loading) {
    return (
      <>
        <Box sx={{ width: "1280px", position: "absolute", zIndex: "100" }}>
          <LinearProgress
            variant="buffer"
            value={progress}
            valueBuffer={buffer}
          />
        </Box>
        <div className="h-screen flex justify-center items-center">
          <img src={loadingpet} alt="" className="w-64" />
        </div>
      </>
    );
  }

  if (user) {
    return children;
  }

  console.log(location);

  return (
    <Navigate state={location.pathname} to="/login">
      {children}
    </Navigate>
  );
};

export default PrivateRoute;
