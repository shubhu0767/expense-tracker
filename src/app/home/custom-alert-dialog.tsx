import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdDelete } from "react-icons/md";

import React from "react";
import { Button } from "@/components/ui/button";
import useApi from "@/hooks/useApi";

const CustomAlertDialog = ({expenseObj, refreshPage}) => {
  const { fetchApi} = useApi();

  const handleDeleteExpense = async () => {
    await fetchApi(`/expense/deleteExpense/${expenseObj._id}`,{}, 'DELETE' )
    refreshPage();
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline" size="icon">
          <MdDelete />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Expense and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteExpense}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
