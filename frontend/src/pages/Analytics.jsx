import { useEffect, useState } from "react";
import API from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function Analytics() {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("7");

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    try {
      const res = await API.get(`/analytics?days=${period}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Analytics</h1>

      {/* Period Selector */}
      <select onChange={(e) => setPeriod(e.target.value)}>
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
      </select>

      {/* Chart */}
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" />
      </LineChart>
    </div>
  );
}

export default Analytics;