"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ExpenseTable } from "./expense-table";
import { useEffect, useState } from "react";
import { DialogBox } from "./expense-form";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import MainWrapper from "../ui/main-wrapper";
import Reports from "../ui/report";

export default function Page({ params }) {
  const { home } = params;
  const router = useRouter();
  const { data, loading, error, fetchApi } = useApi();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchApi("/expense/getExpenses", {}, "GET");
  }, [refresh]);

  const refreshPage = () => setRefresh(!refresh);

  if (error) {
    router.push("/");
  }

  return (
    <MainWrapper>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">{home}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      {home === "home" && (
        <>
          <div className="">
            <DialogBox text="Add User" setRefresh={refreshPage} />
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ExpenseTable data={data} refreshPage={refreshPage} />
          )}
        </>
      )}

      {home === 'reports' && (
        <>
          <Reports />
        </>
      )}
    </MainWrapper>
  );
}
