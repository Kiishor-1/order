import { useEffect, useState } from 'react';
import Styles from './UpdateAddress.module.css';
import Location from '../../../../assets/images/location2.svg'
import Plus from '../../../../assets/images/PlusCircle.svg'

export default function UpdateAddress({address, onUpdate,onClose }) {
    const [formData, setFormData] = useState({
        state: '',
        cityOrDistrict: '',
        zip: '',
        fullAddress: '',
        phone: '',
    });

    useEffect(() => {
        if (address) {
            setFormData(address);
        }
    }, [address]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(formData).some((field) => field === '')) {
            alert('Please fill in all fields');
            return;
        }
        onUpdate(formData);
    };

    return (
        <form onSubmit={handleSubmit} className={Styles.update_address}>
            <h3>
                <img src={Location} alt="" />
                Update Address
                <img onClick={()=>onClose(false)} className={Styles.close_btn} src={Plus} alt="" />
            </h3>
            <section className={Styles.address}>
                <div className={Styles.address_inputs}>
                    <input
                        type='text'
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder='State'
                    />
                    <input
                        type='text'
                        name="cityOrDistrict"
                        value={formData.cityOrDistrict}
                        onChange={handleChange}
                        placeholder='City/District'
                    />
                    <input
                        type='text'
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        placeholder='Pin Code'
                    />
                    <input
                        type='text'
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder='Phone Number'
                    />
                </div>
                <textarea
                    name='fullAddress'
                    value={formData.fullAddress}
                    onChange={handleChange}
                    placeholder='Enter Full Address'
                    rows={8}
                >
                </textarea>
            </section>
            <button type="submit">Save changes</button>
        </form>
    );
}

