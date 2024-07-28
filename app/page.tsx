"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { isForm } from "@/lib/validate";
import { Form } from "@/types/form";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Creating form...");
    try {
      const formData = new FormData(e.currentTarget);
      const json = formData.get("json") as File;
      if (!json) throw new Error("Please select a JSON file");
      const form: Form = JSON.parse(await json.text());

      if (!isForm(form)) throw new Error("Invalid JSON");

      localStorage.setItem("form", JSON.stringify(form));

      toast.dismiss();
      toast.success("Form created successfully");
      router.push("/form");
    } catch (error: any) {
      toast.dismiss();
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="max-w-xl w-full">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create Form</CardTitle>
            <CardDescription>Create a new form with JSON.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  accept=".json"
                  name="json"
                  type="file"
                  id="json"
                  placeholder="Select JSON file"
                />
                <span className="text-xs ml-1">
                  Select JSON file with correct data.
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit">Create</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
