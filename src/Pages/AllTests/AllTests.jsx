import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const AllTests = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allTests = [] } = useQuery({
    queryKey: ["allTests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tests");
      return res.data;
    },
  });

  return (
    <div className="mt-5 md:mt-8 lg:mt-12">
      <h1 className="text-center text-3xl font-bold my-5">
        All <span className="text-blue-600">Tests</span>
      </h1>
      <div className="overflow-x-auto rounded-t-lg shadow-lg pb-10">
        <table className="table rounded-t-lg">
          {/* head */}
          <thead className="bg-blue-300 rounded-t-lg text-black text-base">
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Reservations</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allTests?.map((test) => (
              <tr key={test._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={test.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{test.name}</td>
                <td>{test?.reservation || 0}</td>
                <td>
                  <button className="btn bg-gradient-to-r from-[#0e1a38] to-[#6b84bd] text-white mr-3">
                    <FaEdit className="text-lg"></FaEdit>
                  </button>

                  <button className="btn bg-gradient-to-r from-[#0e1a38] to-[#6b84bd] text-white">
                    <FaTrashAlt className="text-lg"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTests;
