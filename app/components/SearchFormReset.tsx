'use client'

import React from 'react'
import Link from 'next/link'

const SearchFormReset = () => {
    
  const reset =()=>{
    const input = document.querySelector('.InputContainer') as HTMLFormElement
    console.log("hello")
    if(input) input.reset()
  }

  return (
      <Link href="/" onClick={reset}>
      <button type="button" className="p-2">
        X
      </button>
    </Link>
   
  )
}

export default SearchFormReset
