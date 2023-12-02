import { useContext } from "react";
import Banner from "../Banner/Banner";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: features = [] } = useQuery({
    queryKey: ["features"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bookings`);
      return res.data;
    },
  });

  const myFeatures = features.filter(
    (feature) => feature?.email === user?.email
  );

  return (
    <div>
      <Helmet>
        <title>HealthSynchrony | Home</title>
      </Helmet>
      <Banner></Banner>
      <section className="my-5 md:my-8 lg:my-12 w-11/12 md:w-4/5 mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-bold lg:text-5xl mb-5 md:mb-8">
          Featured <span className="text-blue-500">Tests</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myFeatures?.map((feature) => (
            <div key={feature._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={feature.image} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title"> <span className="text-xl font-bold">Name :</span> {feature.name}</h2>
                <p><span className="text-xl font-bold">Price :</span> ${feature.price}</p>
                <p><span className="text-xl font-bold">Date :</span> {feature.date}</p>
                <p><span className="text-xl font-bold">Description :</span> {feature.details}</p>
               
              </div>
            </div>
          ))}
        </div>
      </section>
      <section  className="my-5 md:my-8 lg:my-12 w-11/12 md:w-4/5 mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-bold lg:text-5xl mb-5 md:mb-8">Our Partners</h1>
        <div className="md:flex justify-evenly bg-blue-400 px-8 py-14 rounded-lg">
          <h1 className="text-3xl font-extrabold">Square Ltd.</h1>
          <h1 className="text-3xl font-extrabold">Bashundhara Group</h1>
          <h1 className="text-3xl font-extrabold">Acme Group</h1>


        </div>
      </section>
    </div>
  );
};

export default Home;
