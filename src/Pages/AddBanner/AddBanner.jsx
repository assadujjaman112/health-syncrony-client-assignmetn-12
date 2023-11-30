import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddBanner = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const banner = {
        name : data.name,
        image : data.image,
        title : data.title,
        description : data.description,
        couponName : data.couponName,
        couponRate : parseInt(data.couponRate),
        isActive : false
    }
    axiosPublic.post("/banners", banner)
    .then((res) => {
      if (res.data.insertedId) {
        reset();
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
        <h1 className="text-center text-3xl font-semibold mb-5">
          Add A Banner
        </h1>
        <div className="flex gap-5">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Banner Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Banner Name"
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
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Title"
              className="input input-bordered w-full"
            />
            {errors.title && (
              <span className="text-red-600">Title is required</span>
            )}
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              placeholder="Description"
              {...register("description", { required: true })}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Coupon Code Name</span>
            </label>
            <input
              type="text"
              {...register("couponName", { required: true })}
              placeholder="Coupon Code Name"
              className="input input-bordered w-full"
            />
            {errors.CouponName && (
              <span className="text-red-600">Coupon Code Name is required</span>
            )}
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Coupon Rate</span>
            </label>
            <input
              type="text"
              {...register("couponRate", { required: true })}
              placeholder="Coupon Code Rate"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="form-control mt-6">
          <input
            className="btn btn-block bg-gradient-to-r from-[#0e1a38] to-[#6b84bd] text-white"
            type="submit"
            value="Add Banner"
          />
        </div>
      </form>
    </div>
  );
};

export default AddBanner;
