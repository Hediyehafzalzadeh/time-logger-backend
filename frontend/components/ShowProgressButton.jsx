"use client"

import React from 'react'
import { Button } from './ui/button'
import { useRouter } from "next/navigation";

const ShowProgressButton = ({ user }) => {
  const router = useRouter();

  return (
    <div>
        <Button
              variant="ghost"
              onClick = {() => {router.push(`/progress/${user.id}`)}}
              size="lg"
              className=" bg-pink-200 hover:bg-pink-400 mx-2"
            >
               Show Progress
            </Button></div>
  )
}

export default ShowProgressButton