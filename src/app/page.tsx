"use client";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import { Input } from "@/components/ui/input";
import MainWrapper from "./ui/login-wrapper";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import LogIn from "./login/page";

export default function Home() {


  

  return (
    <main className={lusitana.className + "bg-[#d8e2dc]"}>
      <Toaster />
      <LogIn />
    </main>
  );
}
