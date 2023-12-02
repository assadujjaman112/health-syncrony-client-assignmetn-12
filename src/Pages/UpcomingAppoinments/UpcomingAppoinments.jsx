import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const UpcomingAppointments = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: UpcomingAppointments = [], refetch } = useQuery({
    queryKey: ["upcomingAppointments"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bookings`);
      return res.data;
    },
  });

  const myUpcoming = UpcomingAppointments.filter(
    (feature) => feature?.email === user?.email
  );

  const handleDelete = (appointment) => {
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
        axiosPublic.delete(`/bookings/${appointment._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${appointment.name} has been deleted!`,
              icon: "success"
            });
          }
        });
      }
    });
  };
  return (
    <div className="my-5 my:mt-8 lg:my-12">
      <h1 className="text-3xl text-center md:text-4xl lg:text-5xl font-bold">
        My Upcoming Appointments{" "}
      </h1>
      <p className="text-2xl font-bold my-5 ml-5">
        Total Appointments : {myUpcoming.length}
      </p>
      <div>
        <div className="overflow-x-auto rounded-t-lg shadow-lg pb-10">
          <table className="table rounded-t-lg">
            {/* head */}
            <thead className="bg-blue-300 rounded-t-lg text-black text-base">
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myUpcoming?.map((appointment) => (
                <tr key={appointment._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={appointment.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{appointment.name}</td>
                  <td>{appointment.date}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(appointment)}
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

export default UpcomingAppointments;
