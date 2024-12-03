import { Link, useNavigate } from 'react-router-dom';
import Styles from './Login.module.css';
import AuthImage from '../../assets/images/authImage.png';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { login, setIsLoading } from '../../slices/authSlice';
import { isStrongPassword } from '../../helpers/isStrongPassword';
import Logo from '../../assets/images/logo.png'

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && token) {
      navigate('/');
    }
  }, [user, token, navigate]);

  const initialValue = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialValue);

  const handleChange = (e) => {
    setFormData((prev) => {
      const { value, name } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    else if (!isStrongPassword(formData.password)) {
      return;
    }

    const firstError = Object.values(newErrors)[0];
    if (firstError) {
      toast.error(firstError);
    }
    if (Object.keys(newErrors).length === 0) {
      console.log(formData);

      setIsLoading(true);
      try {
        const result = dispatch(login(formData));
        if (result.type === 'auth/login/fulfilled') {
          setFormData(initialValue);
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={Styles.login}>
      <div className={Styles.auth_form_container}>
        <div className={Styles.logo}>
          <img src={Logo} alt="" />
        </div>
        <form onSubmit={handleSubmit} className={Styles.login__form}>
          <h2 className={Styles.heading}>Welcome Back 👋</h2>
          <p className={Styles.desc}>{`Today is a new day. It's your day. You shape it. 
          Sign in to start ordering.`}</p>
          <div className={Styles.inputs}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id='email'
                type="email"
                name="email"
                placeholder="Example@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id='password'
                type="password"
                name="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={Styles.button_groups}>
            <button
              className={Styles.auth_login}
              disabled={isLoading} // Disable button if loading
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
            <p className={Styles.account_check} to={"/register"}>
              {`Don't you have an account?`}
              <Link to={"/register"} className={Styles.auth_register}>Sign up</Link>
            </p>
          </div>
        </form>
      </div>
      <div className={Styles.authBannerSection}>
        <div>
          <img src={AuthImage} alt="auth Image" />
        </div>
      </div>

    </div>
  );
}
