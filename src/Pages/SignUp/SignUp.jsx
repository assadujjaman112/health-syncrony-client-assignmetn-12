import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="hero min-h-screen bg-black login bg-opacity-80 ">
      <div className="card shrink-0 w-4/5 md:w-1/2 lg:w-1/3  shadow-2xl bg-base-100">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input input-bordered"
              required
            />
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
