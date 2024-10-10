import { render, screen } from "@testing-library/react";
import React from "react";

import Button from "./Button";

describe("Button Component Rendering", () => {
    test("renders button component", () => {
        render(<Button>Test</Button>);
        const buttonElement = screen.getByText(/Test/i);
        expect(buttonElement).toBeInTheDocument();
    });
    test("onclick event", () => {
        const onClick = jest.fn();
        render(<Button onClick={onClick}>Test</Button>);
        const buttonElement = screen.getByText(/Test/i);
        buttonElement.click();
        expect(onClick).toHaveBeenCalled();
    });
});
