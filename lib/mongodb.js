import React from 'react'
import mongoose from 'mongoose'

const connection = {}

export default async function mongodb() {
    if (connection.isConnected) {
        return 
      }
      const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
      
      const db = await mongoose.connect('mongodb://localhost:27017/qrCodeScanner' , options)
      connection.isConnected = db.connections[0].readyState
    }
