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
import { MdOutlinePhotoLibrary } from "react-icons/md";

import React from "react";
import { Button } from "@/components/ui/button";
import useApi from "@/hooks/useApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ViewPhoto = ({ expenseObj, refreshPage }) => {
  const { fetchApi } = useApi();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Avatar>
          <AvatarImage src={expenseObj.userPhoto} />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>User Profile Photo</AlertDialogTitle>
          <AlertDialogDescription>
            <img
              src={expenseObj?.userPhoto}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md border mt-2"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ViewPhoto;
