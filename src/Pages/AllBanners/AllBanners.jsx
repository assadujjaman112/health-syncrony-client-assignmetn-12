import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const AllBanners = () => {
  const [bannerCount, setBannerCount] = useState(0);
  const axiosPublic = useAxiosPublic();
  const { data: allBanners = [], refetch } = useQuery({
    queryKey: ["allBanners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banners");
      return res.data;
    },
  });

  const handleActive = (banner) => {
    if (bannerCount !== 0) {
      Swal.fire({
        title: "Error!",
        text: `Can't active more than one banner!`,
        icon: "error",
      });
      return;
    }
    axiosPublic.patch(`/banners/${banner._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        setBannerCount(1);
        Swal.fire({
          title: "Success!",
          text: `Banner successfully activated!`,
          icon: "success",
        });
        refetch();
      }
    });
  };

  const handleBlock = (banner) => {
    axiosPublic.patch(`/banners/block/${banner._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        setBannerCount(0);
        refetch();
        Swal.fire({
          title: "Success!",
          text: `Banner successfully blocked!`,
          icon: "success",
        });
      }
    });
  };

  const handleDelete = (banner) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/banners/${banner._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${banner.name} has been deleted!`,
              icon: "success",
            });
          }
        });
      }
    });
  };

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
                  {banner?.isActive ? (
                    <button onClick={() => handleBlock(banner)}>true</button>
                  ) : (
                    <button onClick={() => handleActive(banner)}>false</button>
                  )}
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
