import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import usePerson from "../../Hooks/usePerson";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosPublic = useAxiosPublic();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  const [person] = usePerson();
  const handleBlock = (user) => {
    if (person.status !== "active") {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You can't change Status",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    axiosPublic.patch(`users/block/${user._id}`).then((res) => {
      refetch();
      console.log(res.data);
    });
  };

  const handleActive = (user) => {
    if (person.status !== "active") {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You can't change Status",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    axiosPublic.patch(`users/active/${user._id}`).then((res) => {
      refetch();
      console.log(res.data);
    });
  };

  const handleAdmin = (user) => {
    if (person.status !== "active") {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You can't change Role",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    axiosPublic.patch(`users/admin/${user._id}`).then((res) => {
      refetch();
      console.log(res.data);
    });
  };
  return (
    <div className="mt-5 md:mt-8 lg:mt-12">
      <h1 className="my-5 text-3xl font-bold ml-4 text-center"><span className="text-blue-600">Total</span> Users : {users.length}</h1>
      <div className="overflow-x-auto rounded-lg">
        <table className="table">
          {/* head */}
          <thead className="bg-blue-300 text-black text-base">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Status</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>
                  {user.status === "blocked" ? (
                    <button
                      onClick={() => handleActive(user)}
                      className="text-red-600"
                    >
                      Blocked
                    </button>
                  ) : (
                    <button
                      className="text-green-900"
                      onClick={() => handleBlock(user)}
                    >
                      Active
                    </button>
                  )}
                </td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button onClick={() => handleAdmin(user)}>
                      Make Admin
                    </button>
                  )}
                </td>
                <th>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="px-3 py-2 rounded-lg bg-gradient-to-r from-[#122349] to-[#6b84bd] text-white"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    See Info
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <div className="flex justify-center">
                        <img
                          src={user.image}
                          className="w-52 h-52 rounded-full"
                          alt=""
                        />
                      </div>
                      <div>
                        <p>Name : {user.name}</p>
                        <p>Email : {user.email}</p>
                      </div>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn bg-gradient-to-r from-[#122349] to-[#6b84bd] text-white">
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
