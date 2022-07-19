import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoTests from "../TodoTests";

describe("TodoTests", () => {
  const props = {
    onAddTodo: jest.fn(),
  };

  it("renders", () => {
    render(<TodoTests {...props} />);

    expect(screen.getByText("Task")).toBeInTheDocument();
  });

  describe("when user add task without due date", () => {
    it("fires onAddTodo event", () => {
      render(<TodoTests {...props} />);

      const textInput = screen.getByPlaceholderText("Eg: Try Frontend...");
      userEvent.type(textInput, "Do some Javascript");

      const addButton = screen.getByRole("button", { name: "Add" });
      userEvent.click(addButton);

      expect(props.onAddTodo).toHaveBeenCalledWith({ text: "Do some Javascript" });
    });
  });

  describe("when user add task with due date", () => {
    it("fires onAddTodo event", async () => {
      render(<TodoTests {...props} />);

      const textInput = screen.getByPlaceholderText("Eg: Try Frontend...");
      userEvent.type(textInput, "Do some Javascript");

      const dueDateInput = screen.getByLabelText("Due date");
      userEvent.type(dueDateInput, "17/07/2022");

      const addButton = screen.getByRole("button", { name: "Add" });
      userEvent.click(addButton);

      expect(props.onAddTodo).toHaveBeenCalledWith({
        text: "Do some Javascript",
        dueDate: "2022-07-17",
      });
    });
  });
});