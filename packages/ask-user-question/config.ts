import type { GuidanceFields } from "@myflow/config";
import { configPath, loadJsonConfig, validateGuidanceFields } from "@myflow/config";

const CONFIG_PATH = configPath("ask-user-question");

interface AskUserQuestionConfig {
	guidance?: GuidanceFields;
}

export function loadConfig(): AskUserQuestionConfig {
	return loadJsonConfig<AskUserQuestionConfig>(CONFIG_PATH);
}

export { validateGuidanceFields };
