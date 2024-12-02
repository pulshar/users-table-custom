import Loader from "./components/Loader";
import Table from "./components/table/Table";
import { useUsers } from "./hooks/useUsers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastClass = {
  success: "bg-success font-white-300",
  error: "bg-red-500",
};

function App() {
  const { data, loading, error } = useUsers(
    "https://jsonplaceholder.typicode.com/users",
  );
  return (
    <main className="container mx-auto mt-20 px-4 md:px-6">
      {error && <p className="mt-20">{error}</p>}
      {loading && <Loader />}
      {data && (
        <div className="users-table">
          <Table data={data} />
        </div>
      )}
      <ToastContainer
        toastClassName={(context) =>
          toastClass[context?.type || "default"] +
          "relative flex p-2 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        }
        icon={false}
        hideProgressBar={true}
        bodyClassName={() => "text-sm font-white p-3"}
      />
    </main>
  );
}

export default App;
