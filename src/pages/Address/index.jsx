import { useEffect, useState } from 'react';
import ArrowLeft from '../../assets/images/arrowLeft.svg';
import Plus from '../../assets/images/SimplePlus.svg';
import Styles from './Address.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/common/Modal';
import AddAddress from '../../components/common/Modal/AddAddress';
import UpdateAddress from '../../components/common/Modal/UpdateAddress';
import toast from 'react-hot-toast';
import {
    fetchAllAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} from '../../services/operations/addressApi';

export default function Address() {
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.auth);

    const [addresses, setAddresses] = useState([]);
    const [editingCard, setEditingCard] = useState(null);
    const [defaultAddressId, setDefaultAddressId] = useState(null);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    useEffect(() => {
        if (!user || !token) {
            navigate('/login');
        } else {
            fetchAddresses();
        }
    }, [navigate, user, token]);

    const fetchAddresses = async () => {
        try {
            const allAddresses = await fetchAllAddresses();
            setAddresses(allAddresses);

            const defaultAddress = allAddresses.find((addr) => addr.isDefault);
            if (defaultAddress) {
                setDefaultAddressId(defaultAddress._id);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    const handleAddAddress = async (newAddress) => {
        try {
            await addAddress(newAddress); 
            const updatedAddresses = await fetchAllAddresses(); 
            setAddresses(updatedAddresses); 
            setAddModal(false);
            toast.success('Address added');
        } catch (error) {
            toast.error(error);
        }
    };

    const handleUpdateAddress = async (updatedAddress) => {
        try {
            const updated = await updateAddress(updatedAddress);
            setAddresses((prev) =>
                prev.map((addr) => (addr._id === updated._id ? updated : addr))
            );
            setEditModal(false);
            setEditingCard(null);
            toast.success('Address updated');
        } catch (error) {
            toast.error(error);
        }
    };

    const handleRemoveAddress = async (addressId) => {
        try {
            await deleteAddress(addressId);
            setAddresses((prev) => prev.filter((addr) => addr._id !== addressId));
            if (addressId === defaultAddressId) {
                setDefaultAddressId(null); 
            }
            toast.success('Address removed');
        } catch (error) {
            toast.error(error);
        }
    };

    const handleSetDefault = async (addressId) => {
        try {
            await setDefaultAddress(addressId); 
            setDefaultAddressId(addressId); 
            toast.success('Default address set');
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className={`${Styles.address} container`}>
            <h3 className={Styles.header}>
                <img src={ArrowLeft} alt="Back" onClick={() => navigate(-1)} />Your Addresses
            </h3>
            <main className={Styles.main}>
                <button onClick={() => setAddModal(true)} className={Styles.add_button}>
                    <div className={Styles.add_address}>
                        <img src={Plus} alt="Add Address" />
                    </div>
                    Add Address
                </button>
                <section className={Styles.addresses}>
                    {addresses.length > 0 ? (
                        addresses.map((address) => (
                            <div
                                className={`${Styles.address_item} ${
                                    defaultAddressId === address._id ? Styles.active : ''
                                }`}
                                key={address._id}
                                onClick={() => handleSetDefault(address._id)}
                            >
                                <h5>
                                    {user?.name || 'User'}
                                    <span className={Styles.default_address}>
                                        {defaultAddressId === address._id && 'Default'}
                                    </span>
                                </h5>
                                <p className={Styles.address1}>
                                    {address?.cityOrDistrict}, {address?.state}, {address?.zip}
                                </p>
                                <p className={Styles.address2}>{address?.fullAddress}</p>
                                <p>{address?.phone}</p>
                                <footer>
                                    <span
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingCard(address);
                                            setEditModal(true);
                                        }}
                                    >
                                        Edit
                                    </span>
                                    <span
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveAddress(address._id);
                                        }}
                                    >
                                        Remove
                                    </span>
                                </footer>
                            </div>
                        ))
                    ) : (
                        <p>No addresses found</p>
                    )}
                </section>
            </main>
            {addModal && (
                <Modal onClose={setAddModal}>
                    <AddAddress onAdd={handleAddAddress} onClose={setAddModal} />
                </Modal>
            )}
            {editModal && (
                <Modal onClose={setEditModal}>
                    <UpdateAddress
                        address={editingCard}
                        onUpdate={handleUpdateAddress}
                        onClose={setEditModal}
                    />
                </Modal>
            )}
        </div>
    );
}
