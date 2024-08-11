
import React from 'react'

import Homepage from '../components/home/Homepage';
import Groups from '../components/home/Groups';
import Activity from '../components/home/Activity';
import Occupancy from '../components/home/Occupancy';


export default function Home() {
  return (
    <div>
        <Homepage/>
        <Groups/>
        <Activity/>
        <Occupancy />
    </div>
  )
}
