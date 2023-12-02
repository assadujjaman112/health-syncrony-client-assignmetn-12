import { Link, useLoaderData } from "react-router-dom";

const Banner = () => {
  const banners = useLoaderData();
  console.log(banners);
  const activeBanner = banners.find((banner) => banner.isActive === true);
  console.log(activeBanner);
  return (
    <div className="h-[600px] bg-blue-200 py-10">
      {activeBanner ? (
        <div className="w-4/5 mx-auto h-full bg-white  shadow-lg rounded-lg px-10 relative flex justify-around items-center">
          <div className="flex items-center h-full relative">
            <img
              src={activeBanner.image}
              className="rounded-full w-[410px] h-96 border-blue-500 border-[12px] shadow-lg"
              alt=""
            />
            <p className="bg-blue-400 rounded-full px-5 py-3 text-xl text-center text-white font-bold -ml-20 -mb-36 border-blue-700 border-8">
              Use{" "}
              <span className="text-blue-900">{activeBanner.couponName}</span>{" "}
              to Get <br />{" "}
              <span className="text-blue-800">{activeBanner.couponRate}</span> %
              Off
            </p>
          </div>
          <div className="text-right space-y-2">
            <h1 className="text-4xl font-bold text-blue-800">
              {activeBanner.title}{" "}
            </h1>
            <h1 className="text-4xl font-bold text-blue-600">
              {activeBanner.name}{" "}
            </h1>
            <p className="w-2/3 ml-auto text-blue-400 font-bold">
              {activeBanner.description}{" "}
            </p>
            <Link
              to="/allTests"
              className="btn bg-gradient-to-r from-[#0e1a38] to-[#6b84bd] text-white"
            >
              All Tests
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-center  justify-center h-full">
          <div>
            <div className="flex justify-center">
            <img
              src="https://i.ibb.co/QpPh00N/1000-F-193908219-ak4a-B1-Pzlhiz-UVGLOVowz-HICc3tl6-We-X-removebg-preview.png"
              alt=""
            />
            </div>
            <h1 className="text-5xl font-bold text-center mt-5">
              No Banner is Active
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
