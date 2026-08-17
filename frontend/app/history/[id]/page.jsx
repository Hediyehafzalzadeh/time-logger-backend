"use client";

import React from "react";
import { format, set } from "date-fns";
import { ChevronDownIcon, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getHistoryByDate } from "@/app/actions";
import { convertToRealFormat } from "@/components/Logger";
import TaskHistoryList from "@/components/TaskHistoryList";
import TaskHistoryChart from "@/components/TaskHistoryChart";

const page = () => {
  const [date, setDate] = React.useState(new Date());
  const [isSelected, setIsSelected] = React.useState(false);
  const [taskHistory, setTaskHistory] = React.useState([])
  const [chartSelected, setChartSlected] = React.useState(false);

  const showHistory = async (day) => {
    setIsSelected(true);
    setDate(day);
    const formattedDate = format(day, "yyyy-MM-dd");
    const res = await getHistoryByDate(formattedDate);
    setTaskHistory(res);
    console.log("selected date :", formattedDate);
    console.log("history data :", res);

  };



  return (
    <>
      <header className="flex flex-row justify-end mt-5">
        <Button
          variant="ghost"
          size="lg"
          className="bg-violet-200 hover:bg-violet-300 mr-5 "
          onClick={() => window.history.back()}
        >
          Back to Logger{" "}
        </Button>
      </header>

      <div className=" m-10 ">
        <div className="mx-auto text-lg bg-red-100 p-8 rounded-full flex ">
          pick a day :
          <div className="ml-5 ">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!date}
                  className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => showHistory(selectedDate)}
                  defaultMonth={date}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button
          onClick={() => setChartSlected(!chartSelected)}
            size="lg"
            className="bg-violet-200 hover:bg-violet-400 text-black  mx-auto "
          >
            Show History Chart
          </Button>
        </div>
        <div className="flex flex-row mt-10 gap-5">
          {isSelected ?  taskHistory.length > 0 ? <TaskHistoryList taskHistory={taskHistory} /> : <p>No tasks found for the selected date.</p> : null}
        {isSelected && taskHistory.length > 0 && chartSelected && <TaskHistoryChart taskHistory={taskHistory} />}</div>
      </div>
    </>
  );
};

export default page;
