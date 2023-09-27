/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getDashboardDataApi } from "../../../Services/Admin";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import BannerManage from "./BannerManage";

const Dashboard = () => {
  const [data, setData] = useState({
    totalStudents: "",
    studentsAddedToday: "",
    totalTeachers: "",
    totalCourses: "",
    totalClasses: "",
  });

  // Mock data for the graph. Replace this with your actual data.
  const graphData = [
    { name: "yesterday", students: data?.totalStudents },
    { name: "today", students: data?.studentsAddedToday },
    // ... add more data points
  ];

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };

    getDashboardDataApi(headers).then((response) => {
      setData({
        totalStudents: response.data?.totalStudents,
        studentsAddedToday: response.data?.studentsAddedToday,
        totalTeachers: response.data?.totalTeachers,
        totalCourses: response.data?.totalCourses,
        totalClasses: response.data?.totalClasses,
      });
    });
  }, []);

  const DataCard = ({ title, value }) => {
    return (
      <div className="bg-blue-100 shadow-md rounded-lg p-4 hover:bg-blue-200 transition duration-300 m-2 lg:m-4 w-full sm:w-1/2 lg:w-1/5">
        <h2 className="text-lg lg:text-xl font-bold mb-1">{title}</h2>
        <p className="text-lg lg:text-xl">{value}</p>
      </div>
    );
  };

  const Graph = ({ data }) => {
    return (
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="students" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    );
  };

  return (
    <div className="animate-fadeIn p-4 lg:p-6 flex flex-wrap justify-between items-start mt-14">
      <DataCard title="Total Students" value={data.totalStudents} />
      <DataCard title="Total Teachers" value={data.totalTeachers} />
      <DataCard title="Total Courses" value={data.totalCourses} />
      <DataCard title="Total Classes" value={data.totalClasses} />

      <div className="w-full mt-4 lg:mt-6">
        <h2 className="text-xl lg:text-2xl font-bold mb-3">
          Student Registration Trend
        </h2>
        <Graph data={graphData} />
      </div>

      {/* You can add more Graphs in a similar fashion */}

      <div className="w-full flex justify-center mt-28">
        <BannerManage/>
      </div>
    </div>
  );
};

export default Dashboard;
