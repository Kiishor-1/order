import { Link, useNavigate } from 'react-router-dom';
import Styles from './Register.module.css';
import AuthImage from '../../assets/images/authImage.png';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../slices/authSlice';
import { isStrongPassword } from '../../helpers/isStrongPassword';
import Logo from '../../assets/images/logo.png'

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && token) {
      navigate('/');
    }
  }, [user, token, navigate]);

  const initialValue = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  };
  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    else if(formData.phoneNumber.length != 10)newErrors.phoneNumber = "Provide a valid phone number"

    if (formData.password && !isStrongPassword(formData.password)) {
      newErrors.password = "Password does not meet the strength requirements";
    }

    setErrors(newErrors);

    const errorMessages = Object.values(newErrors);
    if (errorMessages.length > 0) {
      toast.error(errorMessages[0]);
    }

    if (Object.keys(newErrors).length === 0) {
      dispatch(registerUser(formData))
        .then((result) => {
          if (result.type === 'auth/registerUser/fulfilled') {
            setFormData(initialValue);
            navigate('/');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  return (
    <div className={Styles.register}>
      <div className={Styles.auth_form_container}>
        <div className={Styles.logo}>
          <img src={Logo} alt="" />
        </div>
        <form onSubmit={handleSubmit} className={Styles.register__form}>
          <h5 className={Styles.heading}>Welcome 👋</h5>
          <p className={Styles.desc}>{`Today is a new day. It's your day. You shape it. Sign up to start ordering.`}</p>
          <div className={Styles.inputs}>
            <div>
              <label htmlFor="eg. John A">Name</label>
              <input
                id='name'
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id='phoneNumber'
                type="text"
                name="phoneNumber"
                placeholder="Enter your 10 digit mobile number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id='email'
                type="email"
                name="email"
                placeholder="Example@gmail.com"
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
                placeholder="Atleast 8 characters"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={Styles.button_groups}>
            <button className={Styles.auth_register}>Register</button>
            <p className={Styles.account_check} to={"/login"}>
              Have an account? <Link to={"/"} className={Styles.auth_login}>
                Log in
              </Link>
            </p>

          </div>
        </form>
      </div>
      <div className={Styles.authBannerSection}>
        <div className={Styles.auth_image_container}>
          <div className={Styles.banner_container}>
            <img className={Styles.banner} src={AuthImage} alt="auth Image" />
          </div>
        </div>
      </div>
    </div>
  );
}
