import AdminLogin from "../../Components/Admin/Login/AdminLogin";


function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className='p-8 h-80 w-96 flex justify-center'>
        <div>
          <div className='flex justify-center'>
            <p>Hey! Welcome</p>
          </div>
          
          <div>
            <img src="/pngwing.com.png" alt="childrens in class" />
          </div>
        </div>
      </div>
      <AdminLogin />
    </div>
  );
}

export default Login