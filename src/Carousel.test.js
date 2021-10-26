import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// Smoke test for Carousel component
it("should render without crashing", function() {
  render(<Carousel />)
});

// Snapshot test for Carousel component
it("should match snapshot", function() {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("should work when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // setting up for left arrow test
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // second image should show after right arrow event
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move backward in the carousel using left arrow
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("should test left/right arrows", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the left arrow to not be in document, and right arrow to be present, first image present
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByTestId("right-arrow")).toBeInTheDocument();

  // setting up for left arrow test
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // second image as well as left and right arrows should be present after rightArrow fireEvent
  expect(queryByTestId("left-arrow")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByTestId("right-arrow")).toBeInTheDocument();

  // setting up for right arrow test
  fireEvent.click(rightArrow);

  // expect right arrow to be hidden, left arrow and third image to be present
  expect(queryByTestId("left-arrow")).toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
  expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
});
