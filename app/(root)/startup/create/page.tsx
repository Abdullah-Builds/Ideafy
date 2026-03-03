"use server";

import React from "react";
import Banner from "../../../components/banner";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Startup_Form } from "@/app/components/Startup_Form";

const Page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Banner text1="Submit Your Submit" text2="" text3="" />
      <div className="mt-8 mx-auto w-3xl">
        <Startup_Form />
      </div>
    </>
  );
};

export default Page;
