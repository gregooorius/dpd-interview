export interface ShippingDataModel {
  "trackingNumber": string,
  "carrier": string, 
  "estimatedDeliveryTime": string | Date | number, 
  "statuses": Status[]
}

export interface Status {
      "state": "Picked Up" | "In Transit" | "Out for Delivery" | "Delivered",
      "location": string,
      "timestamp": string | Date | number
    }