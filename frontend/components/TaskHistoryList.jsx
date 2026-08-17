import { getHistoryByDate } from "@/app/actions";
import { Timer } from "lucide-react";
import React, { use, useEffect } from "react";
import { convertToRealFormat } from "./Logger";
const TaskHistoryList = ({ taskHistory }) => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [historyData, setHistoryData] = React.useState([]);

  useEffect(() => {
    if (taskHistory && taskHistory.length > 0) {
      setHistoryData(taskHistory);
    }
  }, [taskHistory]);

  return (
    <div className="flex flex-col basis-1/2 mx-auto ">
      <div className="">
        {historyData.length > 0 && 
          <div className=" bg-mauve-100 p-5 rounded-lg mx-auto w-full">
            <div className="flex flex-row  text-xl font-bold text-violet-500 mb-5">
              <p className="basis-1/2 ml-5"> name </p>
              <p className="  basis-1/2 text-end mr-5 "> duration </p>
            </div>
            <p className="text-lg text-center bg-rose-100 font-bold text-red-500 ">
                      {historyData.length > 0
                        ? "total time : " +
                          convertToRealFormat(
                            historyData
                              .map((task) => task.duration)
                              .reduce((acc, duration) => acc + duration),
                          )
                        : ""}
                    </p>

            {historyData.map((task) => (
              <div key={task.id} className=" flex p-2">
                <div className="flex flex-row basis-1/2 items-center flex flex-col ">
                  <Timer className="mx-3 text-gray-500" />
                  <p className="text-2xl mr-5">{task.name} </p>
                  {task.tag && (
                    <span className="text-sm text-gray-700 bg-red-200 rounded-full px-2 py-1">
                      {task.tag}
                    </span>
                  )}
                </div>
                <div className="text-xl flex flex-col items-end mr-10 basis-1/2">
                  <p>{convertToRealFormat(task.duration)}</p>
                </div>
              </div>
            ))}
          </div>
         }
      </div>
    </div>
  );
};

export default TaskHistoryList;
