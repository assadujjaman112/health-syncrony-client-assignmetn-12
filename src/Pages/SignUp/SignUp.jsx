import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const [passError, setPassError] = useState("");
  const [district, setDistrict] = useState();
  const [upazilla, setUpazilla] = useState();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetch("/public/district.json")
      .then((res) => res.json())
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
    setPassError("");
    if (data.password !== data.confirm) {
      return setPassError("Confirm password is wrong.");
    }
    const imageFile = { image: data.photo[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, res.data.data.display_url)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              status: "active",
              image : res.data.data.display_url,
              district : data.district,
              upazilla : data.upazilla,
              bloodGroup : data.blood,

            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  title: "Success!",
                  text: "You have successfully created an account!",
                  icon: "success",
                });
                console.log("User added to the database")
                reset();
                navigate(location?.state ? location?.state : "/");
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="hero min-h-screen bg-black login bg-opacity-80 ">
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
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div className="flex gap-5 w-full">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true, minLength: 6 })}
                className="input input-bordered w-full"
                required
              />
              {errors.password && (
                <span className="text-red-600">
                  Password must have at least 6 characters
                </span>
              )}
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirm", { required: true })}
                className="input input-bordered w-full"
                required
              />
              {passError && <p className="text-red-600">{passError}</p>}
            </div>
          </div>

          <div className="flex gap-5 w-full">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <select
                defaultValue="default"
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
                defaultValue="default"
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

          <div className="flex gap-5 w-full">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <select
                defaultValue="default"
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
            <div className="form-control w-1/2">
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
              value="Sign Up"
            />
          </div>
        </form>
        <p className="text-center my-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-900 font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
