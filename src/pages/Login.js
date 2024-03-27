import loginImg from '../assets/Images/login.webp';
import Template from '../components/core/Auth/Template'

function Login() {
  return (
    <Template
    title='Welcome Back'
    desc1='Build skills for today, tomorrow and beyond.'
    desc2='Education to future-proof your career.'
    img={loginImg}
    fromType='login'/>
  )
}

export default Login