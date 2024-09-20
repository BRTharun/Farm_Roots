import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LoadingPage from "../UI/LoadingPage";


describe("LoadingPage Component", () => {
    it("renders correctly with default className", () => {
      const { container } = render(<LoadingPage />);
      const div = container.firstChild;
      expect(div).toBeTruthy();
      expect(div.className).toContain("flex");
      expect(div.className).toContain("justify-center");
      expect(div.className).toContain("items-center");
    });

    it("renders correctly with custom className", () => {
        const { container } = render(<LoadingPage className="custom-class" />);
        const div = container.firstChild;
        expect(div).toBeTruthy();
        expect(div.className).toContain("custom-class");
        expect(div.className).toContain("flex");
        expect(div.className).toContain("justify-center");
        expect(div.className).toContain("items-center");
      });
      
      it("renders the Loader component", () => {
        const { container } = render(<LoadingPage />);
        const loader = container.querySelector("svg"); // Assuming Loader renders an SVG
        expect(loader).toBeTruthy();
      });

})