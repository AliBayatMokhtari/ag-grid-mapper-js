import { useEffect, useState } from "react";
import { Grid } from "./components";
import { api } from "./api";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  const getAllSchemes = () => {
    const localStorageRdt = localStorage.getItem("staffRdt");

    if (localStorageRdt) {
      setLoading(false);
      return;
    }

    api.getSchemes().then(data => {
      const staffRdt = data[0];
      localStorage.setItem("staffRdt", JSON.stringify(staffRdt));
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllSchemes();
  }, []);

  return <div style={{ height: "100%", width: "100%" }}>{!loading && <Grid />}</div>;
}

export default App;
