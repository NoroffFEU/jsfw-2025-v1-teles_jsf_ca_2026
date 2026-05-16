import { getSharedMocks } from "@/tests/shared-mocks";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/contact/ContactForm";
import { contactSuccessLinkOptions } from "@/lib/helpers/linkOptions";

const { mockedNavigate, mockedToastSuccess, mockedToastError } =
  getSharedMocks();

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render the form and submit button", () => {
    render(<ContactForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("should show validation errors and prevent submit when form is invalid", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText("Email must be a valid email."),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Name must be at least 3 characters."),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Title must be at least 3 characters."),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Description must be at least 10 characters."),
    ).toBeInTheDocument();

    expect(mockedNavigate).not.toHaveBeenCalled();
    expect(mockedToastSuccess).not.toHaveBeenCalled();
    expect(mockedToastError).not.toHaveBeenCalled();
  });

  test("should submit the form when valid and display toast", async () => {
    const user = userEvent.setup();
    const userEmail = "test@example.com";
    render(<ContactForm />);

    const emailInput = screen.getByPlaceholderText("Email...");
    const fullnameInput = screen.getByPlaceholderText("Full Name...");
    const titleInput = screen.getByPlaceholderText("Title...");
    const descInput = screen.getByPlaceholderText("Write your inquiry here...");

    await user.type(emailInput, userEmail);
    await user.type(fullnameInput, "Testman");
    await user.type(titleInput, "Cannot login");
    await user.type(descInput, "I cannot login to my account");

    await user.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockedToastSuccess).toHaveBeenCalledWith(
        `Message sent by: ${userEmail}`,
        { duration: 2000 },
      );

      expect(mockedNavigate).toHaveBeenCalledWith(contactSuccessLinkOptions);
    });

    await waitFor(() => {
      expect(emailInput).toHaveValue("");
      expect(fullnameInput).toHaveValue("");
      expect(titleInput).toHaveValue("");
      expect(descInput).toHaveValue("");
    });

    expect(mockedToastError).not.toHaveBeenCalled();
  });
});
