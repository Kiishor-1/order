import Styles from './Stats.module.css';
import { useEffect, useState } from "react";

const Stats = () => {
  const data = [
    { id: 1, label: "Registered Riders", value: 546 },
    { id: 2, label: "Orders Delivered", value: 789900 },
    { id: 3, label: "Restaurant Partners", value: 690 },
    { id: 4, label: "Food Items", value: 17457 },
  ];

  const [animatedValues, setAnimatedValues] = useState(data.map(() => 0));

  useEffect(() => {
    const duration = 2000;
    const frameRate = 60;
    const totalFrames = Math.round((duration / 1000) * frameRate);

    const animate = (index, targetValue) => {
      const increment = targetValue / totalFrames;
      let frame = 0;

      const interval = setInterval(() => {
        frame++;
        setAnimatedValues((prev) =>
          prev.map((value, i) =>
            i === index ? Math.min(value + increment, targetValue) : value
          )
        );

        if (frame === totalFrames) clearInterval(interval);
      }, 1000 / frameRate);
    };

    data.forEach((stat, index) => animate(index, stat.value));
  }, []);

  return (
    <div className={Styles.statistics}>
      <div className={Styles.statistics_container}>
        {data.map((stat, index) => (
          <div key={stat.id} className={`${Styles.stat_card}`}>
            <h3 className={Styles.stat_number}>
              {Math.floor(animatedValues[index]).toLocaleString('hi-IN')}+
            </h3>
            <p className={Styles.stat_label}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
