import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Styles from '../AddPayment/AddPayment.module.css'
import Cross from '../../../../assets/images/PlusCircle.svg';

export default function UpdatePayment({ payment, setPayment, editingCard, setEditingCard, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        cardNumber: '',
        cvv:'',
        expiration:'',
    });

    useEffect(() => {
        if (payment && editingCard !== null) {
            setFormData({
                name: payment[editingCard]?.holder || '',
                cardNumber: payment[editingCard]?.number || '',
                cvv:payment[editingCard]?.cvv || '',
                expiration:payment[editingCard]?.expiration || '',
            });
        }
    }, [editingCard, payment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!formData.name.length || !formData.cardNumber.length || !formData?.expiration.length || !formData?.cvv.length) {
            toast.error('Fill required fields');
            return;
        }

        setPayment((prev) =>
            prev.map((item, index) =>
                index === editingCard
                    ? { number: formData.cardNumber, holder: formData.name, cvv:formData?.cvv, expiration:formData?.expiration }
                    : item
            )
        );

        setEditingCard(null);
        onClose(false);
    };

    const handleRemove = () => {
        setPayment((prev) => prev.filter((_, index) => index !== editingCard));
        toast.success('Payment method removed successfully!');
        setEditingCard(null);
        onClose(false);
    };

    return (
        <form onSubmit={handleUpdate} className={Styles.add_payment}>
            <h2>
                <span>Edit Payment Method</span>
                <span onClick={() => onClose(false)}>
                    <img src={Cross} alt="Close" />
                </span>
            </h2>
            <div className={Styles.payment_data}>
                <label htmlFor="cardNumber">
                    <p>Card Number</p>
                    <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="name">
                    <p>Expiration</p>
                    <input
                        id="expiration"
                        name="expiration"
                        type="text"
                        placeholder="11/26"
                        value={formData.expiration}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="name">
                    <p>CVV</p>
                    <input
                        id="cvv"
                        name="cvv"
                        type="password"
                        placeholder="XXX"
                        value={formData.cvv}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="name">
                    <p>Name on Card</p>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Card Holder"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className={Styles.actions}>
                <button className={Styles.reset} onClick={handleRemove}>Remove</button>
                <div className={Styles.impact}>
                    <button type='button' className={Styles.cancel} onClick={() => onClose(false)}>Cancel</button>
                    <button className={Styles.add_button}>Save changes</button>
                </div>
            </div>
        </form>
    );
}
