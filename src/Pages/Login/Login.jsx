import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import usePerson from "../../Hooks/usePerson";
const Login = () => {
  const { signIn, googleSignIn, logOut } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [person] = usePerson();

  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        if (person.status === "blocked") {
          logOut();
          navigate("/");
        }
        console.log(user);
        Swal.fire({
          title: "Success!",
          text: "You have successfully logged in!",
          icon: "success",
        });

        navigate(location?.state ? location?.state : "/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        if (person.status === "blocked") {
          logOut();
          navigate("/");
        }

        const userInfo = {
          name: result.user.name || result.user.displayName,
          email: result.user.email,
          status: "active",
          image: result.user.photoURL,
        };

        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate("/");
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="hero min-h-screen bg-black login bg-opacity-80 ">
      <div className="card shrink-0 w-4/5 md:w-1/2 lg:w-1/3  shadow-2xl bg-base-100">
        <h1 className="text-center text-3xl font-bold mt-5">Login Now!</h1>
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
          <button onClick={handleGoogleLogin} className="btn ">
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
