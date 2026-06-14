import type { GuidanceFields } from "@myflow/config";
import { configPath, loadJsonConfig, validateGuidanceFields } from "@myflow/config";

const CONFIG_PATH = configPath("todo");

interface TodoConfig {
	guidance?: GuidanceFields;
}

export function loadConfig(): TodoConfig {
	return loadJsonConfig<TodoConfig>(CONFIG_PATH);
}

export { validateGuidanceFields };
