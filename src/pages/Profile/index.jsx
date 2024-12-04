import { useEffect, useState } from 'react';
import ArrowLeft from '../../assets/images/arrowLeft.svg';
import EditIcon from '../../assets/images/EditIcon.svg';
import CreditCard from '../../assets/images/Credit.svg';
import Plus from '../../assets/images/SimplePlus.svg';
import Male from '../../assets/images/Male.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Styles from './Profile.module.css';
import toast from 'react-hot-toast';
import Modal from '../../components/common/Modal';
import UpdatePayment from '../../components/common/Modal/UpdatePayment';
import AddPayment from '../../components/common/Modal/AddPayment';
import { logoutUser } from '../../slices/authSlice';
import Logout from '../../components/common/Modal/Logout';
import { getUserDetails, editUserDetails } from '../../services/operations/userApi';

export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        country: "",
    });

    const [edit, setEdit] = useState(false);
    const [payment, setPayment] = useState([]);
    const [editingCard, setEditingCard] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!user && !token) {
            navigate('/login');
        } else {
            // Fetch user details
            const fetchUserDetails = async () => {
                try {
                    const data = await getUserDetails(user.id, token);
                    setFormData({
                        name: data.user.name,
                        email: data.user.email,
                        gender: data.user.gender,
                        country: data.user.country,
                    });
                } catch (error) {
                    toast.error("Failed to fetch user details.");
                }
            };
            fetchUserDetails();
        }
    }, [navigate, user, token]);

    const handleEdit = () => setEdit(!edit);

    const handlChange = (e) => {
        const { value, name } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await editUserDetails(user.id, formData, token);
            setFormData(updatedUser.user);
            toast.success("Profile updated successfully.");
            setEdit(false);
        } catch (error) {
            toast.error("Failed to update profile.");
        }
    };

    const handleEditCard = (index) => {
        setEditingCard(index);
        setEditModal(true);
    };

    const handleLogoutConfirm = () => {
        dispatch(logoutUser());
        setIsModalOpen(false);
    };

    const handleLogoutCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`${Styles.profile} container`}>
            <h3 className={Styles.header}>
                <section>
                    <div className=""><img src={ArrowLeft} alt="" />My Profile</div>
                    <button onClick={() => setIsModalOpen(true)} className={Styles.logout_user}>Log out</button>
                </section>
            </h3>
            <main className={Styles.main}>
                {edit ? (
                    <form onSubmit={handleSubmit} className={Styles.update_user}>
                        <section className={Styles.user}>
                            <aside>
                                <img src={Male} alt="" />
                                <div className={Styles.username}>User</div>
                            </aside>
                            <button type="submit">Save</button>
                        </section>
                        <section className={Styles.update_user_details}>
                            <label htmlFor="name">
                                <p>Name</p>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={handlChange}
                                    value={formData.name}
                                />
                            </label>
                            <label htmlFor="email">
                                <p>Email</p>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handlChange}
                                    value={formData.email}
                                />
                            </label>
                            <label htmlFor="gender">
                                <p>Gender</p>
                                <input
                                    type="text"
                                    name="gender"
                                    id="gender"
                                    onChange={handlChange}
                                    value={formData.gender}
                                />
                            </label>
                            <label htmlFor="country">
                                <p>Country</p>
                                <input
                                    type="text"
                                    name="country"
                                    id="country"
                                    onChange={handlChange}
                                    value={formData.country}
                                />
                            </label>
                        </section>
                    </form>
                ) : (
                    <div className={Styles.show_user}>
                        <section className={Styles.user}>
                            <aside>
                                <img src={Male} alt="" />
                                <div className={Styles.username}>User</div>
                            </aside>
                            <button onClick={handleEdit}>Edit</button>
                        </section>
                        <section className={Styles.show_user_details}>
                            <div>
                                <p className={Styles.key}>Name</p>
                                <p className={Styles.value}>{formData.name}</p>
                            </div>
                            <div>
                                <p className={Styles.key}>Email</p>
                                <p className={Styles.value}>{formData.email}</p>
                            </div>
                            <div>
                                <p className={Styles.key}>Gender</p>
                                <p className={Styles.value}>{formData.gender}</p>
                            </div>
                            <div>
                                <p className={Styles.key}>Country</p>
                                <p className={Styles.value}>{formData.country}</p>
                            </div>
                        </section>
                    </div>
                )}
            </main>
            <hr />
            <section className={Styles.payment_methods}>
                <p>Saved Payment Methods</p>
                <div className={Styles.payment_options}>
                    {payment.length > 0 &&
                        payment.map((item, id) => (
                            <section key={id}>
                                <div className={Styles.credit_card}>
                                    <img src={CreditCard} alt="" />
                                </div>
                                <div className={Styles.saved_card}>
                                    <span>{`xxxx xxxx xxxx ${item.number.slice(-4, item.number.length)}`}</span>
                                    <span>{item.holder}</span>
                                </div>
                                <button className={Styles.editCardButton} onClick={() => handleEditCard(id)}>
                                    <img src={EditIcon} alt="" />
                                </button>
                            </section>
                        ))}
                    <button className={Styles.add_card} onClick={() => setAddModal(true)}>
                        <div className={Styles.add_card_icon}>
                            <img src={Plus} alt="" />
                        </div>
                        Add New Card
                    </button>
                </div>
            </section>
            {editModal && (
                <Modal onClose={setEditModal}>
                    <UpdatePayment
                        payment={payment}
                        setPayment={setPayment}
                        editingCard={editingCard}
                        setEditingCard={setEditingCard}
                        onClose={setEditModal}
                    />
                </Modal>
            )}
            {addModal && (
                <Modal onClose={setAddModal}>
                    <AddPayment
                        setPayment={setPayment}
                        onClose={setAddModal}
                    />
                </Modal>
            )}
            {isModalOpen && (
                <Modal>
                    <Logout
                        handleLogoutCancel={handleLogoutCancel}
                        handleLogoutConfirm={handleLogoutConfirm}
                    />
                </Modal>
            )}
        </div>
    );
}
