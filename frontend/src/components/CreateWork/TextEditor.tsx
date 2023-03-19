import { InputText } from "primereact/inputtext";
import { Dispatch, useState } from "react";
import {  FieldErrors, UseFormRegister } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TextEditor({
  register,
  errors,
  value,
  setValue
}: {
  register: UseFormRegister<{
    title: string;
    totalMark: number;
  }>,
  errors:FieldErrors <{
    title: string;
    totalMark: number;
}>,
value:string | undefined,
setValue:Dispatch<string>
}) {
  
  return (
    <>
      <div className="p-4">
        <div className="flex flex-column gap-2">
          <label htmlFor="title" className="accent text-sm">
            Title
          </label>
          <InputText
            id="title"
            placeholder="Title"
            aria-describedby="title-help"
            className="my-input"
            {...register("title")}
          />
          {
           <span className="authErrors">{errors.title?.message}</span>  
          }
        </div>
        <div className="flex flex-column gap-2 mt-2">
          <label htmlFor="description" className="accent text-sm">
            Description
          </label>

          <ReactQuill
            theme="snow"
            placeholder="Description (optional) "
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
    </>
  );
}
export default TextEditor;
