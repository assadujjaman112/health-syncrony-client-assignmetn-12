import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import usePerson from "../../Hooks/usePerson";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProfile = () => {
  const [district, setDistrict] = useState();
  const [upazilla, setUpazilla] = useState();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {user} = useContext(AuthContext)
  // const { data: person = [] } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get(`/users/${user.email}`);
  //     return res.data;
  //   },
  // });
  const [person] = usePerson();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  useEffect(() => {
    fetch("/public/district.json")
      .then((res) =>res.json())
      .then((data) => {
        setDistrict(data);
      });
  }, []);

  useEffect(() => {
    fetch("/public/upazilla.json")
      .then((res) => res.json())
      .then((data) => {
        setUpazilla(data);
      });
  }, []);

  const onSubmit = async (data) => {
    const imageFile = { image: data.photo[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const updatedUser = {
        name: data.name,
        bloodGroup : data.blood,
        district : data.district,
        upazilla : data.upazilla,
        image : res.data.data.display_url
      };

      const userRes = await axiosPublic.patch(`/users/${user.email}`, updatedUser)
      if(userRes.data.modifiedCount > 0){
        Swal.fire({
            title: "Good job!",
            text: "Successfully Updated your profile!",
            icon: "success"
          });
          reset();
          navigate("/dashboard")
      }
    }
  };

  return (
    <div className="hero min-h-screen bg-black login bg-opacity-80 lg:ml-40">
      <div className="card shrink-0 w-11/12 md:w-4/5 lg:w-3/5  shadow-2xl bg-base-100 my-10">
        <h1 className="text-center text-3xl font-bold mt-5">Sign Up Now!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="flex gap-5">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                defaultValue={person.name}
                {...register("name", { required: true })}
                placeholder="Name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <select
                defaultValue= {person.bloodGroup}
                {...register("blood", { required: true })}
                className="select select-bordered w-full "
              >
                <option disabled value="default">
                  Select your blood group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {errors.upazilla && (
                <span className="text-red-600">Upazilla is required</span>
              )}
            </div>
          </div>

          <div className="flex gap-5 w-full">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <select
                defaultValue= {person.district}
                {...register("district", { required: true })}
                className="select select-bordered w-full "
              >
                <option disabled value="default">
                  Select a District
                </option>
                {district?.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <span className="text-red-600">District is required</span>
              )}
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Upazilla</span>
              </label>
              <select
                defaultValue= {person.upazilla}
                {...register("upazilla", { required: true })}
                className="select select-bordered w-full "
              >
                <option disabled value="default">
                  Select a Upazilla
                </option>
                {upazilla?.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.upazilla && (
                <span className="text-red-600">Upazilla is required</span>
              )}
            </div>
          </div>

          <div className=" w-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                {...register("photo", { required: true })}
                type="file"
                className="file-input file-input-bordered  w-full "
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <input
              className="btn btn-block bg-gradient-to-r from-[#0e1a38] to-[#6b84bd] text-white"
              type="submit"
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
