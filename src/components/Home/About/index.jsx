import Styles from './About.module.css'
import TaskImage1 from '../../../assets/images/order.svg';
import TaskImage2 from '../../../assets/images/food.svg';
import TaskImage3 from '../../../assets/images/orderDelivered.svg';
import AboutCard from './AboutCard';
import AboutNav from './AboutNav';

export default function About() {
    const taskData = [
        {
            id: 1,
            task: 'Place an Order!',
            taskImage: TaskImage1,
            taskDesc: 'Place order through our website or Mobile app',
        },
        {
            id: 2,
            task: 'Track Progress',
            taskImage: TaskImage2,
            taskDesc: 'Your can track your order status with delivery time',
        },
        {
            id: 3,
            task: "Get your Order!",
            taskImage: TaskImage3,
            taskDesc: "Receive your order at a lighting fast speed!",
        },
    ]
    return (
        <div className={Styles.about_page}>
            <main className="">
                <section>
                    <AboutNav />
                </section>
                <section className={Styles.about_content}>
                    <aside>
                        <ul>
                            <li>How does Order.UK work?</li>
                            <li>What payment methods are accepted?</li>
                            <li>Can I track my order in real-time?</li>
                            <li>Are there any special discounts or promotions available?</li>
                            <li>Is Order.UK available in my area?</li>
                        </ul>
                    </aside>
                    <div className={Styles.tasks}>
                        <div className="">
                            {
                                taskData.map((task) => (
                                    <AboutCard key={task.id} data={task} />
                                ))
                            }
                        </div>
                        <p className={Styles.tasks_desc}>Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favorite dishes, and proceed to checkout. Your delicious meal will be on its way to your doorstep in no time!</p>
                    </div>
                </section>
            </main>
        </div>
    );
} 