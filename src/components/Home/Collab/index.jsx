import Styles from './Collab.module.css'
import CollabImage1 from '../../../assets/images/partner.png'
import CollabImage2 from '../../../assets/images/ride.png'
import Card from './Card'

export default function Collab() {
    const collaboration = [
        {
            id:1,
            title:'Partner with us',
            desc:'Signup as a business',
            thumbnail:CollabImage1,
            offerText:'Earn more with lower fees',
        },
        {
            id:2,
            title:'Ride with us',
            desc:'Signup as a rider',
            thumbnail:CollabImage2,
            offerText:'Avail exclusive perks'
        }
    ]
  return (
    <div className={Styles.collab_container}>
      {
        collaboration.length > 0 &&
        collaboration.map((data)=>(
            <Card key={data.id} data={data}/>
        ))
      }
    </div>
  )
}
