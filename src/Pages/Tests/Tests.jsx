import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Test from "../../Components/Test/Test";

const Tests = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allTests = [] } = useQuery({
    queryKey: ["allTests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tests");
      return res.data;
    },
  });
  console.log(allTests);
  return (
    <div className="py-8 md:py-10 lg:py-14 bg-blue-200">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-5 md:mb-8 lg:mb-12">
        All <span className="text-blue-500">Tests</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-4/5 mx-auto">
        {allTests.map((test) => (
          <Test key={test._id} test={test}></Test>
        ))}
      </div>
    </div>
  );
};

export default Tests;
