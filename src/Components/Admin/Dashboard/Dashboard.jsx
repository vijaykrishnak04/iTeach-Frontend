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
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  LabelList,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faRupeeSign,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import BannerManage from "./BannerManage";

const Dashboard = () => {
  const [data, setData] = useState({
    totalStudents: "",
    studentsAddedToday: "",
    todaysRevenue: "",
    totalRevenue: "",
    monthlyRevenue: [],
  });

  const [courseData, setCourseData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [entityData, setEntityData] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem("adminToken"),
    };

    getDashboardDataApi(headers).then((response) => {
      setData({
        totalStudents: response.data?.totalStudents,
        studentsAddedToday: response.data?.studentsAddedToday,
        todaysRevenue: response.data?.todaysRevenue,
        totalRevenue: response.data?.totalRevenue,
        monthlyRevenue: response.data?.monthlyRevenue,
      });
      setCourseData(response.data?.totalCourses);
      setClassData(response.data?.totalClasses);
      setEntityData(response.data?.entities);
    });
  }, []);

  const DataCard = ({ title, value, icon, color }) => (
    <div
      className={`flex items-center p-5 rounded-md shadow-lg hover:bg-${color}-200 transition duration-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-gradient-to-r from-${color}-300 via-${color}-400 to-${color}-500`}
    >
      <div className="flex-none">
        <FontAwesomeIcon
          icon={icon}
          size="lg"
          className={`text-${color}-700`}
        />
      </div>
      <div className="flex-grow ml-3">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-right">
          {title}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-right">{value}</p>
      </div>
    </div>
  );
  const CustomTooltipForEntity = ({ active, payload }) => {
    console.log(payload);
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow">
          <p>{`Title: ${payload[0].payload.title}`}</p>
          <p>{`Revenue: ${payload[0].value}₹`}</p>
          <p>{`price: ${payload[0].payload.price}₹`}</p>
        </div>
      );
    }
    return null;
  };

  const RevenueChart = ({ data }) => (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="title" />
      <YAxis />
      <Tooltip content={<CustomTooltipForEntity />} />
      <Bar dataKey="totalRevenue" fill="#82ca9d">
        <LabelList dataKey="title" position="top" />
      </Bar>
    </BarChart>
  );

  const StudentPieChart = ({ data }) => {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
      <PieChart width={660} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="numberOfStudents"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow">
          <p>{`Course: ${payload[0].payload.courseTitle}`}</p>
          <p>{`Purchases: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const Chart = ({ data }) => (
    <BarChart
      width={660}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="courseTitle" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="count" fill="#8884d8">
        <LabelList dataKey="courseTitle" position="top" />
      </Bar>
    </BarChart>
  );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666">
          {monthNames[payload.value - 1]}
        </text>
      </g>
    );
  };

  const CustomTooltipMonth = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Total Revenue for ${monthNames[label - 1]} : ${
            payload[0].value
          }`}</p>
        </div>
      );
    }
    return null;
  };

  const Graph = ({ data }) => {
    return (
      <LineChart width={660} height={400} data={data}>
        <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="month" tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip content={<CustomTooltipMonth />} />
      </LineChart>
    );
  };

  return (
    <div className="mt-14 p-8">
      <div className="flex w-full justify-around">
        <DataCard
          icon={faUsers}
          title="Total Students"
          color="red"
          value={data.totalStudents}
          className="w-full lg:w-auto"
        />
        <DataCard
          icon={faRupeeSign}
          title="Today's Revenue"
          color="blue"
          value={`${data.todaysRevenue}₹`}
          className="w-full lg:w-auto mt-4 lg:mt-0"
        />
        <DataCard
          icon={faWallet}
          title="Total Revenue"
          color="green"
          value={`${data.totalRevenue}₹`}
          className="w-full lg:w-auto mt-4 lg:mt-0"
        />
      </div>

      <div className="flex flex-wrap lg:grid lg:grid-cols-2 gap-4 mt-6">
        <div className="w-full lg:w-auto">
          <h2 className="text-xl lg:text-2xl font-bold mb-3">
            Monthly Revenue
          </h2>
          <Graph data={data.monthlyRevenue} />
        </div>

        <div className="w-full lg:w-auto">
          <h2 className="text-xl lg:text-2xl font-bold mb-3">
            Student Distribution in Classes
          </h2>
          <StudentPieChart data={classData} />
        </div>

        <div className="w-full lg:w-auto">
          <h2 className="text-xl lg:text-2xl font-bold mb-3">
            Course Analysis
          </h2>
          <Chart data={courseData} />
        </div>

        <div className="w-full lg:w-auto">
          <h2 className="text-xl lg:text-2xl font-bold mb-3">
            Entities By Revenue
          </h2>
          <RevenueChart data={entityData} />
        </div>
      </div>

      <div className=" flex justify-center mt-28">
        <BannerManage />
      </div>
    </div>
  );
};

export default Dashboard;
