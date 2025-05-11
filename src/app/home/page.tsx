"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ExpenseTable } from "./expense-table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DialogBox } from "./expense-form";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import MainWrapper from "../ui/main-wrapper";

export default function Page() {
  const [expenseData, setExpenseData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { data, loading, error, fetchApi } = useApi();

  if (error) {
    router.push("/");
  }

  useEffect(() => {
    fetchApi("/expense/getExpenses", {}, "GET");
  }, [refresh]);

  const refreshPage = () => setRefresh(!refresh);

  return (
    <MainWrapper>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <DialogBox text="Add Expense" setRefresh={refreshPage} />
      </header>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ExpenseTable data={data} refreshPage={refreshPage} />
      )}
    </MainWrapper>
  );
}
