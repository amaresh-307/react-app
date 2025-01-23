import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
function AddNewItem({ open, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setDueDate("");
    setErrors({});
    setTitle("");
    onClose();
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else {
      const existngTodos = JSON.parse(localStorage.getItem("todoItems"));
      const isDupFound = existngTodos.some((x) => x.title.toLowerCase() == title.toLowerCase());
      if (isDupFound) {
        newErrors.duplicateFound = "To do already exist.";
      }
    }
    if (!dueDate) {
      newErrors.dueDate = "Due date is required";
    } else if (new Date(dueDate) < new Date()) {
      newErrors.dueDate = "Due date must be in the future";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log(moment(dueDate).format("MMM DD, YYYY"));
      console.log(moment(new Date()).format("MMM DD, YYYY"));
      onAdd({
        title,
        dueDate: moment(dueDate).format("MMM DD, YYYY"),
        isCompleted: false,
        createdOn: moment(new Date()).format("MMM DD, YYYY"),
        createdBy: "User",
      });
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="add-todo-dialog">
      <DialogTitle id="add-todo-dialog">Add New To-Do</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="dense"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={Boolean(errors.title)}
          helperText={errors.title}
        />
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          error={Boolean(errors.dueDate)}
          helperText={errors.dueDate}
        />
        {errors && errors.duplicateFound && (
          <div style={{ color: "#ba7474", width: "300px" }}>{errors.duplicateFound}</div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddNewItem;
