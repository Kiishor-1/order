import { useState } from 'react'
import toast from 'react-hot-toast';
import Styles from './AddPayment.module.css'
import Cross from '../../../../assets/images/PlusCircle.svg';

export default function AddPayment({ setPayment, onClose }) {
    const initialData = {
        name: '',
        cardNumber: '',
        cvv: '',
        expiration: '',
    }
    const [formData, setFormData] = useState(initialData)

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData?.name.length || !formData?.cardNumber.length || !formData?.cvv.length || !formData?.expiration.length) {
            toast.error('Fill required fields');
            return;
        }
        setPayment((prev) => [
            ...prev,
            {
                number: formData?.cardNumber,
                holder: formData?.name,
                cvv: formData?.cvv,
                expiration: formData?.expiration
            },
        ]);
        setFormData(initialData)
        onClose(false);
    };

    const clear = () => {
        setFormData(initialData);
    }

    return (
        <form onSubmit={handleSubmit} className={Styles.add_payment}>
            <h2>
                <span>Add Payment Method</span>
                <span onClick={() => onClose()}>
                    <img src={Cross} alt="" />
                </span>
            </h2>
            <div className={Styles.payment_data}>
                <label htmlFor="number">
                    <p>Card Number</p>
                    <input
                        id='number'
                        value={formData.cardNumber}
                        onChange={handleChange}
                        name='cardNumber'
                        type="text"
                        placeholder="Card Number"
                    />
                </label>
                <label htmlFor="expiration">
                    <p>Expiration</p>
                    <input
                        id='expiration'
                        value={formData.expiration}
                        onChange={handleChange}
                        name='expiration'
                        type="text"
                        placeholder="11/26"
                    />
                </label>
                <label htmlFor="cvv">
                    <p>CVV</p>
                    <input
                        id='cvv'
                        value={formData.cvv}
                        onChange={handleChange}
                        name='cvv'
                        type="password"
                        placeholder="XXX"
                    />
                </label>
                <label htmlFor="name">
                    <p>Name on Card</p>
                    <input
                        id='name'
                        value={formData.name}
                        onChange={handleChange}
                        name='name'
                        type="text"
                        placeholder="Card Holder"
                    />
                </label>
            </div>
            <div className={Styles.actions}>
                <button className={Styles.reset} type='reset' onClick={clear}>Reset</button>
                <div className={Styles.impact}>
                    <button type='button' className={Styles.cancel} onClick={() => onClose(false)}>Cancel</button>
                    <button className={Styles.add_button}>Add</button>
                </div>
            </div>
        </form>
    )
}
