import type { FC } from "react";
import type { Todo } from "types";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { useAppDispatch } from "hooks";
import {
  setStatus,
  deleteTodo,
  setIdEditedTask,
  changeStatusEditModalForm,
} from "store/slices/todosSlice";

import { WrapperTodo } from "./styles";

interface TodoProps {
  infoTodo: Todo;
}

const Todo: FC<TodoProps> = ({ infoTodo }) => {
  const dispatch = useAppDispatch();

  const { id, title, status } = infoTodo;

  const handleStatusChange = () => {
    dispatch(setStatus(id));
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(id));
  };

  const handleEditTask = () => {
    dispatch(setIdEditedTask(id));
    dispatch(changeStatusEditModalForm());
  };

  return (
    <WrapperTodo>
      <Button onClick={handleStatusChange}>
        <Checkbox checked={status} color="success" />
        <span>{title}</span>
      </Button>

      <Stack direction="row" spacing="10px">
        <Button variant="outlined" onClick={handleEditTask}>
          Edit
        </Button>

        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteTodo}
        >
          Delete
        </Button>
      </Stack>
    </WrapperTodo>
  );
};

export default Todo;
