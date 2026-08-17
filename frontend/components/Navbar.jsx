'use client';

import React from 'react'
import { useAuth } from "@/app/context/AuthContext";
import { TaskHistoryButton } from "@/components/TaskHistoryButton";
import ShowProgressButton from "@/components/ShowProgressButton";
import LoginButton from "@/components/LoginButton";
import SignUpButton from './SignUpButton';

export const Navbar = () => {
    const { user , isLoading } = useAuth();


  return (
    <div className='flex flex-row gap-2'>
       {!isLoading && user && (
    <>
      <TaskHistoryButton />
      <ShowProgressButton user={user} />
    </>
  )}

  {!isLoading && (
    <>
      <SignUpButton/>
      <LoginButton user={user} />
    </>
  )}


        
    </div>
  )
}
