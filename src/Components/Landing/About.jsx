import { useEffect, useState } from "react";
import Banner from "./Banner";
import { getTutorsApi } from "../../Services/LandingService";

const About = () => {
  const [tutors, setTutors] = useState([]);
  useEffect(() => {
    getTutorsApi().then((response) => setTutors(response.data));
  }, []);
  return (
    <div className="container mx-auto mb-12 mt-3 p-6">
      <div className="flex flex-col md:flex-row justify-between p-0">
        <div className="mb-2 md:mb-0 md:w-1/2">
          <div>
            <h4 className="text-primary text-orange-700 font-bold text-2xl pb-1 mb-2">
              <span>About</span>
            </h4>
          </div>
          <div>
            <h1 className="text-6xl font-bold">
              <span>I-Teach.</span>
            </h1>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="p-6 mt-7 md:mt-0 rounded-md text-center">
            <p className="md:text-lg text-base font-thin mb-4">
              I-Teach Academic Research Centre is the result of the collective
              efforts of several NIT/IIT Alumni, as an attempt to make quality
              education accessible and affordable to all.We are on a mission to
              provide world-class education through online, in Vernacular
              Language at an affordable cost to all.
            </p>
          </div>
        </div>
      </div>

      <Banner />
      <section className="mb-12 flex justify-center">
        <div className="bg-orange-100 p-6 rounded-md">
          <h2 className="text-2xl mb-4 text-black font-bold text-center">
            Our Vision
          </h2>
          <p className="md:text-lg text-base font-thin mb-4">
            Students from financially stable families have a lot of options to
            get high quality coaching, where as the students from financially
            struggling families are left without a chance to compete.{" "}
            <span className="font-semibold">I-Teach </span>
            founders who themselves had to go through this struggle and was
            fortunate to clear the IIT/JEE entrance examinations felt obligated
            to give back to society by providing quality coaching at affordable
            cost to every student.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-4xl text-center font-bold mb-6">Meet Our Tutors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Map over your tutors array to display them here */}
          {tutors.map((tutor) => (
            <div key={tutor._id} className="w-full bg-white rounded-lg shadow">
              <div className="h-80 relative">
                <img
                  className="object-cover w-full h-full rounded-t-lg"
                  src={tutor?.teacherImage?.url}
                  alt="profile-picture"
                />
              </div>
              <div className="text-center p-4">
                <h4 className="text-2xl text-blue-gray-900 mb-2">
                  {tutor.fullName}
                </h4>
                <p className="text-blue-gray-600 font-medium">
                  {tutor.subject}
                </p>
              </div>
            </div>
          ))}
          {/* Add more tutor cards here */}
        </div>
      </section>
    </div>
  );
};

export default About;
