"use client"

import React , { useState } from "react";
import { AuthModal } from "./AuthModal";
import { LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/app/context/AuthContext";

const LoginButton = ({ user }) => {
  const { Logout } = useAuth();
      const [showAuthModal, setShowAuthModal] = useState(false);

      if(user) {
        return(
            
        <Button
          className="gap-2 bg-red-200 hover:bg-red-400"
          variant="ghost"
          size="lg"
          type="submit"
          onClick={() => Logout()}
        >
          Sign Out
        </Button>
     

        )
      }

    return (
        <>
        <Button
        onClick={() => setShowAuthModal(true)}
        variant="outline"
        size="sm"
        className="bg-violet-200 gap-2 "
      >
        <LogIn className="w-4 h-4" />
        Sign in
      </Button>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

        </>
    )







}


export default LoginButton  ;