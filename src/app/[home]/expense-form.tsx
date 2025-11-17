import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useApi from "@/hooks/useApi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useReducer, useState } from "react";
import { categoryType } from "@/constant/expense-category";
    import toast from "react-hot-toast";


const initialValues = {
  title: "",
  description: "",
  amount: "",
  category: "",
  date: new Date(),
};

const reducer = (state, action) => ({ ...state, ...action });

export function DialogBox({ setRefresh, text, expenseObj }) {
  const [state, setState] = useReducer(reducer, initialValues);
  const [isError, setError] = useState({ msg: "" });
  const [userPhoto, setUserPhoto] = useState();
  const { data, error, loading, fetchApi } = useApi();

  const { title, description, amount, category, date } = state;

  useEffect(() => {
    if (expenseObj?._id) {
      const date = new Date(expenseObj.date);

      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");

      const formattedDate = `${yyyy}-${mm}-${dd}`;

      setState({
        title: expenseObj.title,
        description: expenseObj.description,
        amount: expenseObj.amount.toString(),
        category: expenseObj.category,
        date: formattedDate,
      });
    } else setState(initialValues);
  }, [expenseObj?._id]);

  const handleInputChange = (e) => {
    console.log(e.target.value);

    setState({ [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   console.log("invoked submit", state);
  //   if (!title || !amount || !category || !date) {
  //     e.preventDefault();
  //     setError({ msg: "* field must be required" });
  //     return;
  //   }

  //   const obj = { ...state, amount: Number(amount) };

  //   if (expenseObj?._id) {
  //     obj._id = expenseObj?._id;
  //   }

  //   await fetchApi("/expense/saveOrUpdateExpense", obj, "POST");
  //   if (error) {
  //     setError({ msg: error });
  //     return;
  //   }
  //   setRefresh();
  // };

const handleSubmit = async (e) => {
  
  if (!title || !amount || !category || !date) {
    e.preventDefault();
    setError({ msg: "* field must be required" });
    return;
  }

  // Create form-data
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("amount", amount); 
  formData.append("category", category);
  formData.append("date", date);

  if (expenseObj?._id) {
    formData.append("_id", expenseObj._id);
  }

  if (userPhoto) {
    formData.append("userPhoto", userPhoto);  // key must match backend
  }

  const userStr = localStorage.getItem("user");
      const data = userStr ? JSON.parse(userStr) : null;
      const token = data?.accessToken;

  try {
    const res = await fetch(
      "https://expense-tracker-backend-5bqt.onrender.com/expense/saveOrUpdateExpense",
      {
        method: "POST",
        body: formData, // DO NOT SET content-type manually
        headers: {
          Authorization: `Bearer ${token}`,
          // leave empty → browser sets multipart boundary itself
        },
      }
    );

    const data = await res.json();
    console.log("Response:", data);

    if (!res.ok) {
      setError({ msg: data.message || "Something went wrong" });
      return;
    }

    toast.success("User Added Successfully")
    
    setRefresh();
  } catch (err) {
    toast.error("Something went wrong")
    console.log("Upload error:", err);
    setError({ msg: "Network error" });
  }
};



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size={text === "" ? "icon" : "default"}>
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User Details</DialogTitle>
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
            <Select onValueChange={(value) => setState({ category: value })}>
              <SelectTrigger className="w-[18rem]">
                <SelectValue
                  placeholder="Select a Category*"
                  defaultValue={category}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categoryType.map((item) => (
                    <SelectItem value={item.name} key={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              name="date"
              type="date"
              placeholder="Date*"
              className="col-span-3"
              value={date}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              name="userPhoto"
              type="file"
              placeholder="Photo*"
              className="col-span-3"
              // value={userPhoto}
              onChange={(e) => setUserPhoto(e.target.files[0])}
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
