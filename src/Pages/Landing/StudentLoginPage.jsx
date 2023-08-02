import LoginForm from "../../Components/Student/Auth/Login";

const StudentLoginPage = () => {
  const handleStudentLogin = (loginData) => {
    // Add student login logic here (e.g., API call)
    console.log('Student Login Data:', loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-evenly bg-gray-100">
      <div className='bg-orange-300 p-8 h-80 w-96 flex justify-center'>
        <div>
          <div className='flex justify-center'>
            <p>Hey! Welcome</p>
          </div>
          
          <div>
            <img src="/pngwing.com.png" alt="childrens in class" />
          </div>
        </div>
      </div>
      <LoginForm role="student" onSubmit={handleStudentLogin} />
    </div>
  );
};

export default StudentLoginPage;

