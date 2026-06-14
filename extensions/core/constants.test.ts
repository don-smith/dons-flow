import { describe, expect, it } from "vitest";
import { FLAG_DEBUG, MSG_TYPE_GIT_CONTEXT, MSG_TYPE_GUIDANCE } from "./constants.js";

describe("core constants", () => {
	it("FLAG_DEBUG is the canonical debug-flag name", () => {
		expect(FLAG_DEBUG).toBe("myflow-debug");
	});
	it("MSG_TYPE_GIT_CONTEXT is the canonical git-context message type", () => {
		expect(MSG_TYPE_GIT_CONTEXT).toBe("myflow-git-context");
	});
	it("MSG_TYPE_GUIDANCE is the canonical guidance message type", () => {
		expect(MSG_TYPE_GUIDANCE).toBe("myflow-guidance");
	});
});
