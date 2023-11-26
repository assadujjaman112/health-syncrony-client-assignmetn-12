import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { data: person = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });
  console.log(person);
  return (
    <div className="w-full">
      <div className=" flex min-h-screen flex-col justify-center lg:ml-32">
        <div className="md:w-4/5 lg:w-1/2 mx-auto flex flex-col justify-center h-[600px] rounded-lg bg-blue-300 shadow-lg  px-5">
          <h1 className="text-center text-3xl my-7 font-bold">My Profile</h1>
          <div className="flex justify-center ">
            <img className="w-52 h-52 rounded-full" src={person.image} alt="" />
          </div>
          <div className="pl-5 mt-5">
            <h1 className="font-semibold">
              <span className="font-bold">Name :</span> {person.name}
            </h1>
            <p>
              <span className="font-bold">Email :</span> {person.email}
            </p>
            <p>
              <span className="font-bold">Blood Group :</span>{" "}
              {person.bloodGroup}
            </p>
            <p>
              <span className="font-bold">Address :</span> {person.upazilla},{" "}
              {person.district}
            </p>
            <p>
              <span className="font-bold">Status :</span> {person.status}
            </p>
          </div>
          <div>
            <Link to={`/dashboard/updateProfile/${user.email}`}>
              <button className="flex justify-center gap-3 btn btn-block bg-gradient-to-r from-[#122349] to-[#6b84bd] text-white mt-5">
                <FaEdit className="text-xl"></FaEdit> Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
