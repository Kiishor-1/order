import Styles from './Collab.module.css'
import Card from './Card'
import { collaboration } from '../../../helpers/mockData'

export default function Collab() {
    
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
