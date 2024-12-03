import Styles from './PaymentMethod.module.css';
import ArrowLeft from '../../assets/images/arrowLeft.svg';
import Stripe from '../../assets/images/S.svg';
import Paypal from '../../assets/images/P.svg';
import MaestorKard from '../../assets/images/M.svg';
import Wallet from '../../assets/images/Wallet.svg';
import ArrowRight from '../../assets/images/ArrowRight.svg';
import Plus from '.././../assets/images/Add.svg';
import Credit from '.././../assets/images/Credit.svg';
import PaymentCard from './PaymentCard';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../slices/cartSlice';
import { useState } from 'react';
import Modal from '../../components/common/Modal';
import AddPayment from '../../components/common/Modal/AddPayment';

export default function PaymentMethod() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items, totalPrice , orderDetail} = useSelector((state) => state.cart);

    const wallet = {
        id: 0,
        card: 'Wallet',
        icon1: Wallet,
        icon2: ArrowRight,
        balance: 'Available balance:₹300',
    };

    const cards = [
        { id: 1, card: 'MaestroKard', icon1: MaestorKard },
        { id: 2, card: 'Paypal', icon1: Paypal },
        { id: 3, card: 'Stripe', icon1: Stripe },
    ];

    const [customCards, setCustomCards] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const handlePayment =async () => {
        if (!selectedCard) {
            toast.error('Please select a payment method');
            return;
        }

        const toastId = toast.loading('Making Payment');
        setTimeout(async() => {
            toast.dismiss(toastId);

            if (selectedCard.custom) {
                const maskedNumber = `xxxx xxxx xxxx ${selectedCard.card.slice(-4)}`;
                toast.success(`Payment done with: ${maskedNumber}`);
            } else {
                toast.success(`Payment done with: ${selectedCard.card}`);
            }
            console.log(orderDetail)
            await dispatch(clearCart()).unwrap();
            navigate('/order-placed');
        }, 3000);
    };    

    return (
        <div className={`${Styles.payment_method} container`}>
            <h3>
                <img src={ArrowLeft} alt="" />
                Choose and Pay
            </h3>
            <main className={Styles.main}>
                <section className={Styles.payment_cards_section}>
                    <PaymentCard
                        data={wallet}
                        cardFlag={true}
                        isSelected={selectedCard?.id === wallet.id}
                        onSelect={() => setSelectedCard(wallet)}
                    />
                    <hr className={Styles.separator} />
                    <div className={Styles.payment_cards}>
                        {cards.map((card) => (
                            <PaymentCard
                                data={card}
                                key={card.id}
                                isSelected={selectedCard?.id === card.id}
                                onSelect={() => setSelectedCard(card)}
                            />
                        ))}
                    </div>
                    <div className={Styles.custom_cards}>
                        {customCards.map((card, id) => {
                            const data = { card: card?.number, icon1: Credit, custom: true };
                            return (
                                <PaymentCard
                                    key={id}
                                    data={data}
                                    custom={true}
                                    isSelected={selectedCard?.card === card?.number}
                                    onSelect={() => setSelectedCard(data)}
                                />
                            );
                        })}
                    </div>
                    <button className={Styles.add_card} onClick={() => setAddModal(true)}>
                        <img src={Plus} alt="" />
                        Add New Card
                    </button>
                </section>
                <aside className={Styles.proceed_payment}>
                    <section>
                        <h5>Amount to be paid</h5>
                        <p>₹{totalPrice + 10 + 3 - items.length}</p>
                    </section>
                    <hr className={Styles.separator} />
                    <button className={Styles.make_payment} onClick={handlePayment}>
                        Proceed Payment
                    </button>
                </aside>
            </main>
            {addModal && (
                <Modal>
                    <AddPayment setPayment={setCustomCards} onClose={setAddModal} />
                </Modal>
            )}
        </div>
    );
}
