import React from 'react'
import type { Status } from './ShippingDataModel'
import './App.css'

type Props = {
    statuses: Status
}

const width = {
    "Picked Up": 25,
    "In Transit": 50,
    "Out for Delivery": 75,
    "Delivered": 100

}

export default function StatusTimeLine(props: Props) {
  return (
    <div>
        <div className='timelineHeader'>
            <p>Picked Up</p>
            <p>In Transit</p>
            <p>Out for Delivery</p>
            <p>Delivered</p>
        </div>
        <div className={'timelineparent'} >
            <div className={'timelinecolor'} style={{width: width[props.statuses.state] + "%"}}></div>
        </div>
    </div>
  )
}
