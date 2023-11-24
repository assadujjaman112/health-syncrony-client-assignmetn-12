import { Link } from "react-router-dom";
import "../Login/Login.css";
import { FcGoogle } from "react-icons/fc";
const Login = () => {

    const handleLogin = (event)=> {
        event.preventDefault();

        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)

    }
    

  return (
    <div className="hero min-h-screen bg-black login bg-opacity-80 ">
      <div className="card shrink-0 w-4/5 md:w-1/2 lg:w-1/3  shadow-2xl bg-base-100">
        <form onSubmit={handleLogin} className="card-body">
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
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <input
              className="btn btn-block bg-gradient-to-r from-[#122349] to-[#6b84bd] text-white"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        <div className="flex justify-center">
          <button className="btn ">
            <FcGoogle className="text-3xl"></FcGoogle>
          </button>
        </div>
        <p className="text-center my-5">
          Do not have an account?{" "}
          <Link to="/signUp" className="text-blue-900 font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
