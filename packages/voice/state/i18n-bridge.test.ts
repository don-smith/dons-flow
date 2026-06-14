import { afterEach, describe, expect, it, vi } from "vitest";

// The module performs `await import("@myflow/i18n")` at top level and
// caches the result. To exercise both branches (SDK present vs. SDK missing)
// we re-import after resetting the module registry with the dep mocked
// differently each time.

describe("i18n-bridge", () => {
	afterEach(() => {
		vi.doUnmock("@myflow/i18n");
		vi.resetModules();
	});

	it("uses the i18n SDK when it is installed", async () => {
		const scopeFn = vi.fn((_k: string, fb: string) => `[scoped] ${fb}`);
		const scope = vi.fn(() => scopeFn);
		const getActiveLocale = vi.fn(() => "ru");
		vi.resetModules();
		vi.doMock("@myflow/i18n", () => ({ scope, getActiveLocale }));

		const mod = await import("./i18n-bridge.js");
		expect(scope).toHaveBeenCalledWith("@myflow/voice");
		expect(mod.t("k", "fallback")).toBe("[scoped] fallback");
		expect(mod.getActiveLocale()).toBe("ru");
	});

	it("falls back to identity + undefined locale when the SDK is missing", async () => {
		vi.resetModules();
		vi.doMock("@myflow/i18n", () => {
			throw new Error("module not found");
		});

		const mod = await import("./i18n-bridge.js");
		expect(mod.t("any.key", "the english fallback")).toBe("the english fallback");
		expect(mod.getActiveLocale()).toBeUndefined();
		expect(mod.I18N_NAMESPACE).toBe("@myflow/voice");
	});
});
