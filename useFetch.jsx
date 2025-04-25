import React from 'react'
import { useState, useEffect } from 'react'

const useFetch = (api) => {
  const [info, setInfo] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [errors, setErrors] = useState('')

  const getData = async()=>{
    try {
      const response = await fetch(api)
      const data = await response.json()
      setInfo(data)
      setIsPending(false)
      
    } catch (error) {
      setErrors(error.message)
      setIsPending(false)
    }
  }

  useEffect(()=>{
    getData()
  },[api])
  return{info, isPending, errors}
}

export default useFetch