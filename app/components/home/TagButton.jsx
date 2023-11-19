import React from 'react'
import Link from 'next/link'

const TagButton = ({title}) => {
  return (
    <Link href={`/explore?tag=${title}`}><button className="btn btn-outline btn-sm">{title}</button></Link>
  )
}

export default TagButton