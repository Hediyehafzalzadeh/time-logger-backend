"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/app/context/AuthContext";
export function AuthModal({ isOpen, onClose }) {
  const { getCurrentUser, signUp } = useAuth();
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            credential: credentialResponse.credential,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google login failed");
      }

      await getCurrentUser();
      console.log("Google login successful:", data);

      onClose();
    } catch (error) {
      console.error("Google login failed:", error);
      toast(error instanceof Error ? error.message : "Google login failed");
    }
  };

  const handleEmailLogin = async (email, password) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Email login failed");
      }

      console.log("Email login successful:", data);
      onClose();
    } catch (error) {
      console.error("Email login failed:", error);
      toast(error instanceof Error ? error.message : "Email login failed");
    }
  };

  const handleEmailSignUp = async (name, email, password) => {
    try {
      await signUp(name, email, password);
      await getCurrentUser();
      console.log("Email sign up successful");
      setIsSignUpDialogOpen(false);
      onClose();
    } catch (error) {
      console.error("Email sign up failed:", error);
      toast(error instanceof Error ? error.message : "Email sign up failed");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in to continue</DialogTitle>

            <DialogDescription>
              Sign in to access your Time Tracker account.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            {/* Google */}
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                console.log("Google Login Failed");
                toast("Google Login Failed");
              }}
              width="100%"
            />

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm text-muted-foreground">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Email / Password */}
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const email = formData.get("email");
                const password = formData.get("password");
                handleEmailLogin(email, password);
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border rounded-md px-3 py-2"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border rounded-md px-3 py-2"
                required
              />

              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
              >
                Sign in with Email
              </button>
              <span className="text-sm text-muted-foreground">
                Don't have an account?
              </span>

              <button
                type="button"
                className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                onClick={() => {
                  setIsSignUpDialogOpen(true);
                }}
              >
                Sign up with Email
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSignUpDialogOpen} onOpenChange={setIsSignUpDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create your account</DialogTitle>
            <DialogDescription>
              Enter your name, email, and password to sign up.
            </DialogDescription>
          </DialogHeader>

          <form
            className="flex flex-col gap-3 py-4"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const name = formData.get("name");
              const email = formData.get("email");
              const password = formData.get("password");
              handleEmailSignUp(name, email, password);
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border rounded-md px-3 py-2"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border rounded-md px-3 py-2"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border rounded-md px-3 py-2"
              required
            />

            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
            >
              Create account
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
