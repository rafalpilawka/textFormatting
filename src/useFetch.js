import React, { useState, useEffect } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const dataArray = await res.json()
      setData(dataArray)
    }
    fetchData()
  }, [])
  //IM CONFUSED ABOUT DEPENDENCY ARRAY IN COMPONENT DID MOUNT SCENARIO WE USE EMPTY DEPENDENCY ARRAY
  //but if we not pass dependancy array  => its run eafter each received value
  return data
}
