"use client";

import { GoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/app/context/AuthContext";
export function AuthModal({ isOpen, onClose }) {
  const { getCurrentUser } = useAuth();
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
        throw new Error(data.message);
      }

      // const meResponse = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
      //   {
      //     credentials: "include",
      //   }
      // );

      // const meData = await meResponse.json();
      await getCurrentUser();
      console.log("Google login successful:", data);

      onClose();
    } catch (error) {
      console.error("Google login failed:", error);
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
        throw new Error(data.message);
      }

      console.log("Email login successful:", data);
      onClose();
    } catch (error) {
      console.error("Email login failed:", error);
    }
  };
  return (
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
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border rounded-md px-3 py-2"
            />

            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
            >
              Sign in with Email
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
