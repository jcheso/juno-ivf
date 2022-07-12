import React from 'react'

export default function FollicleDisplay({ follicleCounts }) {
  console.log(follicleCounts)
  return (
    <>
      {follicleCounts.map((follicleCount) => (
        <div key={follicleCount.id}>
          <div>Day: {follicleCount.day}</div>
          <div>Left: {follicleCount.left}</div>
          <div>Right: {follicleCount.right}</div>
        </div>
      ))}
    </>
  )
}
