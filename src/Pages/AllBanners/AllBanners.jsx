import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaTrashAlt } from "react-icons/fa";

const AllBanners = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allBanners = [] } = useQuery({
    queryKey: ["allBanners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banners");
      return res.data;
    },
  });

  const handleDelete = banner => {
    console.log(banner)
  }


  return (
    <div className="mt-5 md:mt-8 lg:mt-12">
      <h1 className="text-center text-3xl font-bold my-5">
        All <span className="text-blue-600">Tests</span>
      </h1>
      <p className="text-xl font-semibold ml-6 mb-3">
        Total Banner : {allBanners.length}
      </p>
      <div className="overflow-x-auto rounded-t-lg shadow-lg pb-10">
        <table className="table rounded-t-lg">
          {/* head */}
          <thead className="bg-blue-300 rounded-t-lg text-black text-base">
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>isActive</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allBanners.map((banner) => (
              <tr key={banner._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={banner.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{banner.name}</td>
                <td>
                  <button>{banner?.isActive ? "true" : "false"}</button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(banner)}
                    className="btn bg-gradient-to-r from-[#0e1a38] to-[#6b84bd] text-white"
                  >
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

export default AllBanners;
