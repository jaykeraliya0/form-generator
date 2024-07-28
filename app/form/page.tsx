"use client";

import FieldInfo from "@/components/FieldInfo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { validateForm } from "@/lib/validate";
import { Form, FormField } from "@/types/form";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [json] = useState<Form>(JSON.parse(localStorage.getItem("form")!));

  const [data, setData] = useState<{ [key: string]: string | string[] }>(
    JSON.parse(localStorage.getItem("draft")!)
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>();

  const sections = json.fields.reduce(
    (
      acc: { [key: number]: { section_name: string; fields: FormField[] } },
      field
    ) => {
      if (!acc[field.section]) {
        acc[field.section] = {
          section_name: field.section_name,
          fields: [],
        };
      }
      acc[field.section].fields.push(field);
      return acc;
    },
    {}
  );

  const renderField = (field: FormField) => {
    switch (field.field_type) {
      case "checkbox":
        return (
          <>
            <Label htmlFor={field.field_id} className="col-span-3">
              {field.field_label}
            </Label>
            <div className="flex col-span-4 space-x-5">
              {field.field_options.map((option) => (
                <div className="flex items-center space-x-2" key={option.value}>
                  <Checkbox
                    name={field.field_id}
                    id={option.value}
                    value={option.value}
                    checked={data?.[field.field_id]?.includes(option.value)}
                    onClick={() => {
                      let items = data?.[field.field_id];

                      if (Array.isArray(items)) {
                        items.includes(option.value)
                          ? (items = items.filter(
                              (item) => item !== option.value
                            ))
                          : items.push(option.value);
                      } else {
                        items = [option.value];
                      }
                      setData({
                        ...data,
                        [field.field_id]: items,
                      });
                    }}
                  />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </div>
            <FieldInfo info={field.info} />
            {errors && errors.hasOwnProperty(field.field_id) && (
              <span className="text-xs text-end mt-1 col-span-full text-destructive">
                {errors.hasOwnProperty(field.field_id) &&
                  errors[field.field_id]}
              </span>
            )}
          </>
        );

      case "radio":
        return (
          <>
            <Label htmlFor={field.field_id} className="col-span-3">
              {field.field_label}
            </Label>
            <RadioGroup
              name={field.field_id}
              className="flex col-span-4 space-x-5"
            >
              {field.field_options.map((option) => (
                <div className="flex items-center space-x-2" key={option.value}>
                  <RadioGroupItem
                    onClick={() => {
                      setData({
                        ...data,
                        [field.field_id]: option.value,
                      });
                    }}
                    checked={data?.[field.field_id] === option.value}
                    value={option.value}
                    id={option.value}
                  />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
            <FieldInfo info={field.info} />
            {errors && errors.hasOwnProperty(field.field_id) && (
              <span className="text-xs text-end mt-1 col-span-full text-destructive">
                {errors.hasOwnProperty(field.field_id) &&
                  errors[field.field_id]}
              </span>
            )}
          </>
        );

      case "select":
        return (
          <>
            <Label htmlFor={field.field_id} className="col-span-3">
              {field.field_label}
            </Label>
            <div className="flex col-span-4 space-x-5">
              <Select
                value={data?.[field.field_id] as string}
                onValueChange={(e) => {
                  setData({
                    ...data,
                    [field.field_id]: e,
                  });
                }}
                name={field.field_id}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Option" />
                </SelectTrigger>
                <SelectContent>
                  {field.field_options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FieldInfo info={field.info} />
            {errors && errors.hasOwnProperty(field.field_id) && (
              <span className="text-xs text-end mt-1 col-span-full text-destructive">
                {errors.hasOwnProperty(field.field_id) &&
                  errors[field.field_id]}
              </span>
            )}
          </>
        );

      case "textarea":
        return (
          <>
            <Label htmlFor={field.field_id} className="col-span-3">
              {field.field_label}
            </Label>
            <Textarea
              className="flex-1 col-span-4"
              name={field.field_id}
              value={data?.[field.field_id] || ""}
              onChange={(e) => {
                setData({
                  ...data,
                  [field.field_id]: e.target.value,
                });
              }}
              id={field.field_id}
              placeholder={field.field_label}
            />
            <FieldInfo info={field.info} />
            {errors && errors.hasOwnProperty(field.field_id) && (
              <span className="text-xs text-end mt-1 col-span-full text-destructive">
                {errors.hasOwnProperty(field.field_id) &&
                  errors[field.field_id]}
              </span>
            )}
          </>
        );

      default:
        return (
          <>
            <Label htmlFor={field.field_id} className="col-span-3">
              {field.field_label}
            </Label>
            <Input
              className="flex-1 col-span-4"
              type={field.field_type}
              name={field.field_id}
              value={data?.[field.field_id] || ""}
              onChange={(e) => {
                setData({
                  ...data,
                  [field.field_id]: e.target.value,
                });
              }}
              id={field.field_id}
              placeholder={field.field_label}
            />
            <FieldInfo info={field.info} />
            {errors && errors.hasOwnProperty(field.field_id) && (
              <span className="text-xs text-end mt-1 col-span-full text-destructive">
                {errors.hasOwnProperty(field.field_id) &&
                  errors[field.field_id]}
              </span>
            )}
          </>
        );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Submitting form...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      const errors = validateForm(data, json);
      setErrors(errors);
      console.log(errors);
      if (Object.keys(errors || {}).length > 0)
        throw new Error("Form validation failed");

      console.log(data);

      localStorage.removeItem("draft");
      setData({});
      toast.dismiss();
      toast.success("Form submitted successfully");
    } catch (error: any) {
      saveDraft();
      toast.dismiss();
      toast.error(error.message);
    }
  };

  const saveDraft = () => {
    localStorage.setItem("draft", JSON.stringify(data));
    toast.success("Draft saved successfully");
  };

  // useEffect(() => {
  //   const errors = validateForm(data, json);
  //   setErrors(errors);
  // }, [data, json]);

  if (!json) return redirect("/create-form");

  return (
    <div className="py-16 w-full flex justify-center items-center">
      <Card className="max-w-2xl w-full">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              {json.form_header}
            </CardTitle>
          </CardHeader>
          <hr />
          <CardContent>
            {Object.values(sections).map((section) => (
              <div
                className="grid w-full items-center gap-4 px-7 my-5"
                key={section.section_name}
              >
                <h1 className="text-lg font-bold">{section.section_name}</h1>
                {section.fields.map((field) => (
                  <div
                    className="grid grid-cols-8 items-center"
                    key={field.field_id}
                  >
                    {renderField(field)}
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
          <hr className="mb-5" />
          <CardFooter className="flex justify-between">
            <Button onClick={saveDraft} type="button" variant="outline">
              Save Draft
            </Button>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
