import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Reservations = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allBookings = [], refetch } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await axiosPublic.get("/bookings");
      return res.data;
    },
  });

  const handleDelete = (booking) => {
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
        axiosPublic.delete(`/tests/${booking._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${booking.name} has been deleted!`,
              icon: "success"
            });
          }
        });
      }
    });
  };


  return (
    <div className="my-5 my:mt-8 lg:my-12">
      <Helmet>
        <title>HealthSynchrony | Reservations</title>
      </Helmet>
      <h1 className="text-3xl text-center md:text-4xl lg:text-5xl font-bold">
        Reservations{" "}
      </h1>
      <p className="text-2xl font-bold my-5 ml-5">Total Reservations : {allBookings.length}</p>
      <div>
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
              {allBookings?.map((booking) => (
                <tr key={booking._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={booking.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{booking.name}</td>
                  <td>{booking?.reservations || 0}</td>
                  <td>

                    <button
                      onClick={() => handleDelete(booking)}
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
    </div>
  );
};

export default Reservations;
