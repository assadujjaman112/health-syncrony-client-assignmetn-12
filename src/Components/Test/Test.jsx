import { Link } from "react-router-dom";

const Test = ({ test }) => {
  const {_id, name, image, date, price, slots, details} = test;
  return (
    <div className="card  bg-base-100 shadow-xl">
      <figure>
        <img
          src= {image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body gap-0">
        <h2 className="card-title font-semibold"><span className="font-bold">Name : </span> {name} </h2>
        <p><span className="font-bold">Date :</span> {date}</p>
        <p><span className="font-bold">Price :</span> ${price}</p>
        <p><span className="font-bold">Slots :</span> {slots}</p>
        <p><span className="font-bold">Details :</span> {details}</p>
        <div >
            <Link className="btn btn-block mt-5 bg-gradient-to-r from-[#214086] to-[#6b84bd] text-white" to={`/tests/${test._id}`}>View Details</Link>
          
        </div>
      </div>
    </div>
  );
};

export default Test;
