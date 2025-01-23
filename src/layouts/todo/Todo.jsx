import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import Tooltip from "@mui/material/Tooltip";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box, Button } from "@mui/material";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
//import todoItemsRaw from "./data/todos.json";
import ConfirmationDialog from "./ConfirmationDialog";
import AddNewItem from "./AddNewItem";
import Notification from "./Notification";
import MDButton from "components/MDButton";

function Todo() {
  const notificationColor = "success";
  const notificationIcon = "check";
  const notificationTitle = "Success";
  const [notificationContent, setNotificationContent] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [tableData, setUpTableData] = useState({ columns: [], rows: [] });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { columns, rows } = tableData;

  const setTableHeadersNRows = (todos = []) => {
    return {
      columns: [
        { Header: "title", accessor: "title", width: "30%", align: "left" },
        { Header: "status", accessor: "status", align: "left" },
        { Header: "created On", accessor: "createdOn", align: "center" },
        { Header: "created By", accessor: "createdBy", align: "center" },
        { Header: "due Date", accessor: "dueDate", align: "center" },
        { Header: "action", accessor: "action", align: "center" },
      ],
      rows: todos.map((todo) => {
        return {
          title: (
            <MDTypography component="a" variant="button" color="text" fontWeight="medium">
              {todo.title}
            </MDTypography>
          ),
          status: (
            <MDBox ml={-1}>
              <MDBadge
                badgeContent={todo.status}
                color={todo.status == "Completed" ? "success" : "warning"}
                variant="gradient"
                size="sm"
              />
            </MDBox>
          ),
          createdOn: (
            <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
              {todo.createdOn}
            </MDTypography>
          ),
          createdBy: (
            <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
              {todo.createdBy}
            </MDTypography>
          ),
          dueDate: (
            <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
              {todo.dueDate}
            </MDTypography>
          ),
          action: (
            <ButtonGroup variant="text" aria-label="Basic button group">
              <Tooltip title="Mark Done">
                <Button
                  color="success"
                  onClick={() => markAsDone(todo)}
                  size="small"
                  sx={{
                    color: "success.main",
                  }}
                >
                  <Icon>check_circle</Icon>
                </Button>
              </Tooltip>
              <Tooltip title="Remove">
                <Button
                  color="error"
                  onClick={() => removeItem(todo)}
                  size="small"
                  sx={{
                    color: "error.main",
                  }}
                >
                  <Icon>delete</Icon>
                </Button>
              </Tooltip>
            </ButtonGroup>
          ),
        };
      }),
    };
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem("todoItems");
    if (savedTodos) {
      setTodoItems(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    const formattedTodos = todoItems.map((todo) => ({
      ...todo,
      dueDate: new Date(todo.dueDate).toLocaleString(),
      createdOn: new Date(todo.createdOn).toLocaleString(),
      status: todo.isCompleted ? "Completed" : "Pending",
    }));
    setUpTableData(setTableHeadersNRows(formattedTodos));
  }, [todoItems]);

  const markAsDone = (todo) => {
    todo.status = "Completed";
  };

  const removeItem = (todo) => {
    setItemToDelete(todo);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      const items = todoItems.filter(
        (x) => x.title.toLowerCase() != itemToDelete.title.toLowerCase()
      );
      setTodoItems(items);
    }
    handleCloseDialog();
    setShowNotification(true);
    setNotificationContent("Item deleted");
  };

  const handleCloseDialog = () => {
    setItemToDelete(null);
    setOpenDialog(false);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleAdd = (itemToAdd) => {
    setTodoItems((prev) => [...prev, itemToAdd]);
    setShowNotification(true);
    setNotificationContent("Item added");
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Todo List
                </MDTypography>
                <MDButton
                  variant="gradient"
                  color="secondary"
                  onClick={() => handleOpenAddDialog()}
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;add new Item
                </MDButton>
              </MDBox>
              <AddNewItem open={openAddDialog} onAdd={handleAdd} onClose={handleCloseAddDialog} />
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
                <ConfirmationDialog
                  dialogTitle="Confirm Deletion"
                  dialogDescription={`Are you sure you want to delete the to-do item: "${itemToDelete?.title}"?`}
                  open={openDialog}
                  onConfirm={handleConfirmDelete}
                  onCancel={handleCloseDialog}
                />
              </MDBox>

              <Notification
                color={notificationColor}
                icon={notificationIcon}
                title={notificationTitle}
                content={notificationContent}
                open={showNotification}
                onClose={handleNotificationClose}
              />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Todo;
