import Loader from "./components/Loader";
import Table from "./components/table/Table";
import useUsersStore from "./store/store";
import { useEffect } from "react";

function App() {
  const { getUsers, loading, error } = useUsersStore();

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container mx-auto mt-20 px-4 md:px-6">
      {error && <p className="mt-20">{error}</p>}
      {loading && <Loader />}

      <div className="users-table">
        <Table />
      </div>
    </main>
  );
}

export default App;
