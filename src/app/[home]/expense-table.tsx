"use client";

import * as React from "react";
import { ArrowUpDown } from "lucide-react";
import { FaEdit } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogBox } from "./expense-form";
import CustomAlertDialog from "./custom-alert-dialog";
import {CustomTable} from "../../components/Table/table";

export function ExpenseTable({ data, refreshPage }) {

  
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: 'Category',
    },
    {
      accessorKey: "amount",
      header: () => <div>Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(amount);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      // enableHiding: false,
      header: () => <div className="">Actions</div>,
      cell: ({ row }) => {
        const expenseObj = row.original;
        return (
          <div className="flex gap-3">
            <DialogBox
              setRefresh={refreshPage}
              expenseObj={expenseObj}
              text={<FaEdit />}
            />
            <CustomAlertDialog
              expenseObj={expenseObj}
              refreshPage={refreshPage}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <CustomTable columns={columns} data={data} />
    </>
  );
}
