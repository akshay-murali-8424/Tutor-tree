import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dispatch} from "react";
import {  FieldErrors, UseFormRegister } from "react-hook-form";

function WorkAssignBar({
  datetime12h,
  setDateTime12h,
  register,
  errors
}: {
  datetime12h:string | Date | undefined | Date[],
  setDateTime12h: Dispatch<string |Date | Date[]>,
  register: UseFormRegister<{
    title: string;
    totalMark: number;
  }>,
  errors:FieldErrors<{
    title: string;
    totalMark: number;
}>
}) {
  return (
    <div>
      <div className="flex flex-column gap-2 mb-4">
        <label htmlFor="points" className="accent text-sm">
          Points
        </label>
        <InputText
          id="points"
          type={"number"}
          placeholder="Unmarked"
          aria-describedby="points-help"
          className="my-input"
          {...register("totalMark")}
        />
      </div>
      <div className="flex flex-column gap-2 mb-4">
        <label htmlFor="due-date" className="accent text-sm">
          Due date
        </label>
        <Calendar
          id="calendar-12h"
          placeholder="No due date"
          value={datetime12h}
          inputClassName="my-input"
          minDate={new Date()}
          onChange={(e: CalendarChangeEvent) =>{
            if(e.value){
             setDateTime12h(e?.value)
            }
          } }
          showTime
          hourFormat="12"
        />
      </div>
    </div>
  );
}

export default WorkAssignBar;
