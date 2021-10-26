import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

// Smoke test for Card component
it("should render without crashing", function() {
    render(<Card />)
});

// Snapshot test for Card component
it("should match snapshot", function() {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
});