import { describe, expect, it } from "vitest";

function bunny(name: string): string {
	return `Hello, ${name} 🐰!`;
}

describe("bunny", () => {
	it("should return a greeting message", () => {
		expect(bunny("UoxoU")).toBe("Hello, UoxoU 🐰!");
	});
});
