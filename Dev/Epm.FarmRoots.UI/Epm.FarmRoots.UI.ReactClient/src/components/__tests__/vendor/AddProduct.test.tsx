import { render, screen, fireEvent } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../utils/store"; // Assuming store is exported from here
import AddProduct from "../../pages/vendor/AddProduct";

// Utility function to fill form inputs
const fillInputs = (values: { [key: string]: string }) => {
    Object.keys(values).forEach((key) => {
        const element = screen.getByLabelText(new RegExp(key, 'i'));
        if (element) {
            fireEvent.change(element, {
                target: { value: values[key] },
            });
        }
    });
};

describe("AddProduct Component Tests", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <AddProduct />
            </Provider>
        );
    });

    test("component should render input elements for product details", () => {
        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Image URL/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Stock/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Sale's Price/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/MRP/i)).toBeInTheDocument();
    });

    test("fields should have initial empty or default values", () => {
        expect((screen.getByLabelText(/Name/i) as HTMLInputElement).value).toBe("");
        expect((screen.getByLabelText(/Category/i) as HTMLSelectElement).value).toBe("");
        expect((screen.getByLabelText(/Image URL/i) as HTMLInputElement).value).toBe("");
        expect((screen.getByLabelText(/Description/i) as HTMLTextAreaElement).value).toBe("");
        expect((screen.getByLabelText(/Stock/i) as HTMLInputElement).value).toBe("0");
        expect((screen.getByLabelText(/Sale's Price/i) as HTMLInputElement).value).toBe("0");
        expect((screen.getByLabelText(/MRP/i) as HTMLInputElement).value).toBe("0");
    });

    test("should display error message when required fields are empty on submit", async () => {
        fireEvent.submit(screen.getByRole("button", { name: /Add Product/i }));
        await waitFor(() => {
            expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Category is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Image URL is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Stock cannot be less than one/i)).toBeInTheDocument();
            expect(screen.getByText(/Sale's Price cannot be less than one/i)).toBeInTheDocument();
            expect(screen.getByText(/Mrp Price cannot be less than one/i)).toBeInTheDocument();
        });
    });

    // test("should display error message when required fields are empty on submit", async () => {
    //     render(
    //         <Provider store={store}>
    //             <AddProduct />
    //         </Provider>
    //     );
    //     fireEvent.submit(screen.getByRole("button", { name: /Add Product/i }));
    //     await waitFor(async () => {
    //         expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    //         expect(screen.getByText(/Category is required/i)).toBeInTheDocument();
    //         expect(screen.getByText(/Image URL is required/i)).toBeInTheDocument();
    //         expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
    //         expect(screen.getByText(/Stock cannot be less than one/i)).toBeInTheDocument();
    //         expect(screen.getByText(/Sale's Price cannot be less than one/i)).toBeInTheDocument();
    //         expect(screen.getByText(/Mrp Price cannot be greater than Regular Price/i)).toBeInTheDocument();
    //     });
    // });

    test("valid inputs should not show error messages and submit successfully", async () => {
        fillInputs({
            Name: "Sample Product",
            Category: "Electronics",
            "Image URL": "http://example.com/image.jpg",
            Description: "A sample product description",
            Stock: "10",
            "MRP": "100",
            "Sale's Price": "90",
        });

        fireEvent.submit(screen.getByRole("button", { name: /Add Product/i }));

        await waitFor(() => {
            expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/cannot be less than one/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/cannot be greater than Regular Price/i)).not.toBeInTheDocument();
        });
    });

    test("should display error message when required fields are empty on submit", async () => {

        fireEvent.submit(screen.getByRole("button", { name: /Add Product/i }));
        await waitFor(async () => {
            expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Category is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Image URL is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Stock cannot be less than one/i)).toBeInTheDocument();
            expect(screen.getByText(/Sale's Price cannot be less than one/i)).toBeInTheDocument();
            expect(screen.getByText(/Mrp Price cannot be less than one/i)).toBeInTheDocument();
        });
    });

    

    test("should display error for invalid image URL", async () => {
        fillInputs({
            "Image URL": "invalid-url",
        });

        fireEvent.submit(screen.getByRole("button", { name: /Add Product/i }));

        await waitFor(() => {
            expect(screen.getByText(/Invalid URL format/i)).toBeInTheDocument();
        });
    });

    test("should enforce correct constraints on stock, regular price, and sale price", async () => {
        fillInputs({
            Stock: "0",
            "MRP": "0",
            "Sale's Price": "0",
        });

        fireEvent.submit(screen.getByRole("button", { name: /Add Product/i }));

        await waitFor(() => {
            expect(screen.getByText(/Stock cannot be less than one/i)).toBeInTheDocument();
            expect(screen.getByText(/MRP Price cannot be less than one/i)).toBeInTheDocument();
            expect(screen.getByText(/Sale's Price cannot be less than one/i)).toBeInTheDocument();
        });
    });

    test("should display error for MRP greater than Sale Price", async () => {
        fillInputs({
            "Sale's Price": "50",
            "MRP": "100",
        });

        fireEvent.submit(screen.getByRole("button", { name: /Add Product/i }));

        await waitFor(() => {
            expect(screen.getByText(/Mrp Price cannot be greater than Regular Price/i)).toBeInTheDocument();
        });
    });

    test("should handle category selection change", async () => {
        const selectElement = screen.getByLabelText(/Category/i);
        fireEvent.change(selectElement, { target: { value: "Meat" } });

        expect((selectElement as HTMLSelectElement).value).toBe("Meat");
    });

    test("should not accept negative stock", async () => {
        fillInputs({
            Stock: "-10",
        });

        fireEvent.submit(screen.getByRole("button", { name: /Add Product/i }));

        await waitFor(() => {
            expect(screen.getByText(/Stock cannot be less than one/i)).toBeInTheDocument();
        });
    });

    test("should not accept negative prices", async () => {
        fillInputs({
            "MRP": "-10",
            "Sale's Price": "-10",
        });

        fireEvent.submit(screen.getByRole("button", { name: /Add Product/i }));

        await waitFor(() => {
            expect(screen.getByText(/MRP Price cannot be less than one/i)).toBeInTheDocument();
            expect(screen.getByText(/Sale's Price cannot be less than one/i)).toBeInTheDocument();
        });
    });
});
