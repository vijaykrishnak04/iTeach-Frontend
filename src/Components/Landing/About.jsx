import { useEffect, useState } from "react";
import Banner from "./Banner";
import { getTutorsApi } from "../../Services/LandingService";

const About = () => {
  const [tutors, setTutors] = useState([]);
  useEffect(() => {
    getTutorsApi().then((response) => setTutors(response.data));
  }, []);
  return (
    <div className="container mx-auto mb-12 mt-16 p-6">
      <div className="p-0 flex flex-row justify-between">
        <div className="mb-2">
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
        <div className="w-1/2">
          <div className="p-6 mt-7 rounded-md text-center">
            <p className="text-lg font-thin mb-4">
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
          <p className="text-lg font-thin mb-4">
            Students from financially stable families have a lot of options to
            get high quality coaching, where as the students from financially
            struggling families are left without a chance to compete. Eduport
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
            <div
              key={tutor._id}
              className="p-4 bg-white rounded-md shadow-md text-center"
            >
              <img
                src={tutor?.teacherImage?.url}
                alt="Teacher name"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl mb-2">{tutor.fullName}</h3>
              <p>{tutor.subject}</p>
            </div>
          ))}

          {/* Add more tutor cards here */}
        </div>
      </section>
    </div>
  );
};

export default About;
