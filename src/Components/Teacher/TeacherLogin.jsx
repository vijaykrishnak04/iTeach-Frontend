import LoginForm from "../Student/Auth/Login";

const TeacherLogin = () => {
  const handleTeacherLogin = (loginData) => {
    // Add teacher login logic here (e.g., API call)
    console.log('Teacher Login Data:', loginData);
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
      <LoginForm role="teacher" onSubmit={handleTeacherLogin} />
    </div>
  );
};

export default TeacherLogin;
