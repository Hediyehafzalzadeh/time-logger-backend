"use client"


import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export const TaskHistoryButton = () => {
    const router = useRouter();
    const [date, setDate] = React.useState  ( new Date() );
  return (
    <Button
              variant="ghost"
              onClick = {() => router.push("/history/" + date.toISOString())}
              size="lg"
              className=" bg-violet-200 hover:bg-violet-400"
            >
               Task History
            </Button>
    
  );
};

