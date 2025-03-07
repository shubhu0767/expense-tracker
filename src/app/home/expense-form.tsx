import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useApi from "@/hooks/useApi";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";

const initialValues = {
  title: "",
  description: "",
  amount: "",
  category: "",
  date: new Date(),
};

const reducer = (state, action) => ({ ...state, ...action });

export function DialogBox({setRefresh, text, expenseObj}) {
  const [state, setState] = useReducer(reducer, initialValues);
  const [isError, setError] = useState({ msg: "" });
  const {data, error, loading, fetchApi} = useApi();


  const { title, description, amount, category, date } = state;

  useEffect(() => {
    if(expenseObj?._id) {
      console.log(expenseObj);
      
      setState({
        title: expenseObj.title,
        description: expenseObj.description,
        amount: expenseObj.amount.toString(),
        category: expenseObj.category,
        date: new Date(expenseObj.date)
      })
    }else setState(initialValues)
  }, [expenseObj?._id]);

  const handleInputChange = (e) => {
    setState({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (!title || !amount || !category || !date) {
      e.preventDefault();
      setError({ msg: "* field must be required" });
      return
    }

    const obj = { ...state, amount: Number(amount),}

    if (expenseObj?._id) {
      obj._id = expenseObj?._id
    }

    await fetchApi('/expense/saveOrUpdateExpense', obj, "POST")
    if(error){
      setError({ msg: error })
      return
    }
    setRefresh()
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size={text === "" ? "icon" : "default"}>{text}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense Details</DialogTitle>
          {isError.msg && <DialogDescription>{error}</DialogDescription>}
          
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              name="title"
              type="text"
              placeholder="Title*"
              className="col-span-3"
              value={title}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              name="description"
              type="text"
              placeholder="Description"
              className="col-span-3"
              value={description}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              name="amount"
              type="number"
              placeholder="Amount*"
              className="col-span-3"
              value={amount}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              name="category"
              type="text"
              placeholder="Category*"
              className="col-span-3"
              value={category}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              name="date"
              type="date"
              placeholder="Date*"
              className="col-span-3"
              value={new Date(date)}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <DialogFooter>
        <DialogClose>
            <Button onClick={handleSubmit} type="submit">
              Save
            </Button>
        </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
