import { useEffect, useState } from 'react'
import './App.css'
import type { ShippingDataModel } from './ShippingDataModel'
import axios, { AxiosError } from 'axios'
import StatusTimeLine from './StatusTimeLine'

function App() {
  const [shippingNumber, setShippingNumber] = useState('')
  const [allShippingData, setAllShippingData] = useState<ShippingDataModel[]>([])
  const [foundShippment, setFoundShippment] = useState<ShippingDataModel>()

  useEffect(() => {
    axios.get("https://e08d6.wiremockapi.cloud/shipments").then((resp) => {
      setAllShippingData(resp.data)
    }).catch((e: AxiosError) => {
      alert(e.response?.data)
    })
  }, [])

  function handleSubmit(event: any) {
    event.preventDefault()
    const data = allShippingData.find((sd) => sd.trackingNumber === shippingNumber)

    if (data) {
      setFoundShippment(data)
    }
  }

  function handleTextChange(event: any) {
    setShippingNumber(event.target.value)
  }
  
  function handleReturnToSender() {
    if (foundShippment) {
      const newData = {...foundShippment}
      if (newData?.estimatedDeliveryTime) {
        const todayplus = new Date(newData?.estimatedDeliveryTime)
        todayplus.setDate(todayplus.getDate() + 2)
        newData.estimatedDeliveryTime = todayplus
      }
      setFoundShippment(newData)
    }
  }

  return (
    <>
      <h1>Find my package</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input type='text' value={shippingNumber} onChange={handleTextChange}/>
          <input type='submit' value={'Search'}/>
        </form>
      </div>
       {
        foundShippment &&
        <div className="read-the-docs">
          <p>Tracking Number: {foundShippment?.trackingNumber}</p>
          <p>Estimated Shipping Date: {new Date(foundShippment?.estimatedDeliveryTime).toISOString()}</p>
          <p>Carrier: {foundShippment.carrier}</p>
          <StatusTimeLine statuses={foundShippment.statuses[foundShippment.statuses.length -1]}/>
          {foundShippment.statuses[foundShippment.statuses.length -1].state === "Delivered" && <button onClick={handleReturnToSender}>Return To Sender</button>}
        </div>
       }
    </>
  )
}

export default App
