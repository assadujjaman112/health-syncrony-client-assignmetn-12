import { useForm } from "react-hook-form";
import "./AddATest.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddATest = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    await axiosPublic.post("/tests", data).then((res) => {
      if (res.data.insertedId) {
        reset()
        Swal.fire({
          title: "Success !",
          text: `${data.name} has been added !`,
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="mt-5 md:mt-16 lg:mt-24 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body shadow-lg lg:w-4/5 mx-auto bg-blue-200 rounded-lg"
      >
        <h1 className="text-center text-3xl font-semibold mb-5">Add A Test</h1>
        <div className="flex gap-5">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Test Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Test Name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Photo Url</span>
            </label>
            <input
              type="text"
              placeholder="Photo Url"
              {...register("image", { required: true })}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Details</span>
            </label>
            <input
              type="text"
              {...register("details", { required: true })}
              placeholder="Test Details"
              className="input input-bordered w-full"
            />
            {errors.details && (
              <span className="text-red-600">Details is required</span>
            )}
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="text"
              placeholder="Price"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Slots</span>
            </label>
            <input
              type="text"
              {...register("slots", { required: true })}
              placeholder="Slots"
              className="input input-bordered w-full"
            />
            {errors.slots && (
              <span className="text-red-600">Slots is required</span>
            )}
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="date"
              {...register("date", { required: true })}
              placeholder="Date"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="form-control mt-6">
          <input
            className="btn btn-block bg-gradient-to-r from-[#0e1a38] to-[#6b84bd] text-white"
            type="submit"
            value="Add A Test"
          />
        </div>
      </form>
    </div>
  );
};

export default AddATest;
