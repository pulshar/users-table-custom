import Loader from "./components/Loader";
import Table from "./components/table/Table";
import { useUsers } from "./hooks/useUsers";

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
    </main>
  );
}

export default App;
