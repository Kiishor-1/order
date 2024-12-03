import Styles from './PaymentCard.module.css';

export default function PaymentCard({ data, cardFlag, custom, isSelected, onSelect, utilFlag }) {
    return (
        <div className={`${Styles.payment_card} ${isSelected ? Styles.selected : ''}`}>
            {
                !utilFlag &&
                <input
                    type="radio"
                    name="payment-method"
                    checked={isSelected}
                    onChange={onSelect}
                    className={Styles.radio}
                />
            }
            <section className={cardFlag ? Styles.card_icon : Styles.card_icon2}>
                <img src={data?.icon1} alt="" />
            </section>
            <section className={Styles.payment_category}>
                <h4 className={cardFlag ? Styles.wallet : Styles.standardCards}>
                    {custom ? `xxxx xxxx xxxx ${data?.card.slice(-4)}` : data?.card}
                </h4>
                {data?.balance && <p>{data?.balance}</p>}
            </section>
            {data?.icon2 && (
                <section className={Styles.navigation}>
                    <img src={data?.icon2} alt="" />
                </section>
            )}
        </div>
    );
}
