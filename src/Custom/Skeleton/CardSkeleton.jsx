import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <div className="mt-40 flex justify-center items-center gap-2 border border-gray-200 rounded-lg flex-col py-2">
      <div className="w-full flex justify-center items-center">
        <Skeleton count={1} height={200} width={325} />
      </div>
      <div className="flex flex-col gap-1 justify-center items-center">
        <Skeleton count={4} height={40} width={314} />
      </div>
    </div>
  );
};

export default CardSkeleton;
