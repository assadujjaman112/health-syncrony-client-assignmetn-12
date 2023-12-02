import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const TestDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { _id } = useLoaderData();
  const { data: test = [], refetch } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tests/${_id}`);
      return res.data;
    },
  });

  const handleBook = (test) => {
    if (test.slots < 1) {
      Swal.fire({
        title: "Error !",
        text: "No Slot Left",
        icon: "error",
      });
      return;
    }
    const booking = {
      name: test.name,
      email: user.email,
      image: test.image,
      details: test.details,
      price: parseInt(test.price),
      date: test.date,
      status: "pending",
    };
    axiosPublic.post("/bookings", booking).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success !",
          text: `${test.name} has been added booking`,
          icon: "success",
        });
        const updatedTest = {
          slots: parseInt(test.slots) - 1,
          reservations: test.reservations ? parseInt(test.reservations) + 1 : 1,
        };
        axiosPublic.patch(`/tests/bookings/${_id}`, updatedTest).then((res) => {
          console.log(res.data);
          refetch();
        });
      }
    });
  };

  return (
    <div className="py-5 md:py-8 lg:py-12 bg-blue-200">
      <div className=" card w-11/12 md:w-4/5 lg:w-3/5 mx-auto bg-base-100 shadow-xl">
        <figure>
          <img src={test.image} className="w-full" alt="Shoes" />
        </figure>
        <div className="card-body gap-0">
          <h2 className="card-title font-semibold">
            <span className="font-bold">Name : </span> {test.name}{" "}
          </h2>
          <p>
            <span className="font-bold">Date :</span> {test.date}
          </p>
          <p>
            <span className="font-bold">Price :</span> ${test.price}
          </p>
          <p>
            <span className="font-bold">Slots :</span> {test.slots}
          </p>
          <p>
            <span className="font-bold">Details :</span> {test.details}
          </p>
          <div>
            <Link to="/dashboard/payment">
              <button
                onClick={() => handleBook(test)}
                className="btn btn-block mt-5 bg-gradient-to-r from-[#214086] to-[#6b84bd] text-white"
              >
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
