import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const ClassesSection = ({ classes = [] }) => {
  const randomColors = {
    red: "#f56565",
    yellow: "#ecc94b",
    blue: "#4299e1",
    green: "#48bb78",
    purple: "#9f7aea",
    pink: "#ed64a6",
  };

  const getRandomColor = () => {
    const colors = Object.values(randomColors);
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div className="bg-gray-100 rounded-lg md:mx-5 lg:mx-5 xl:mx-5 w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mt-5 overflow-hidden">
      <h2 className="text-3xl m-6 font-semibold text-gray-800">Classes</h2>
      <div className="flex flex-wrap justify-start p-4 md:p-0 lg:p-0 xl:p-0">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className="w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2 sm:p-4"
          >
            <Link to={`/teacher/class/${classItem._id}`}>
              <div
                style={{ backgroundColor: getRandomColor() }}
                className="p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 overflow-hidden"
              >
                <h3 className="text-xl text-white">{classItem.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesSection;
