import { useContext } from "react";
import Banner from "../Banner/Banner";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

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

  const myFeatures = features.filter(feature =>feature.email === user.email);

  return (
    <div>
      <Banner></Banner>
      <section className="my-5 md:my-8 lg:my-12 w-11/12 md:w-4/5 mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-bold lg:text-5xl mb-5 md:mb-8">
          Featured <span className="text-blue-500">Tests</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myFeatures?.map((feature) => (
            <div key={feature._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src= {feature.image}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-bold"> {feature.name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>

      </section>
    </div>
  );
};

export default Home;
