/**
 * Detect which SIBLINGS are installed by reading the active Pi settings file.
 * Pure utility — no ExtensionAPI.
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { SIBLINGS, type SiblingPlugin } from "./siblings.js";
import { getPiAgentSettingsPath, readPiAgentSettings } from "./utils.js";

/**
 * Return the extensions declared in a package's pi manifest, resolved
 * against the package root. Returns an empty array if the package has no
 * pi manifest or no extensions field.
 */
function readPackageExtensions(packageDir: string): string[] {
	const pkgJsonPath = join(packageDir, "package.json");
	if (!existsSync(pkgJsonPath)) return [];
	try {
		const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
		const extPaths = pkg?.pi?.extensions;
		if (!Array.isArray(extPaths)) return [];
		return extPaths.map((e: string) => resolve(packageDir, e));
	} catch {
		return [];
	}
}

/**
 * Resolve a settings.json `packages[]` entry to an absolute package directory.
 * Handles npm: specifiers (skipped — not local), git: specifiers (skipped),
 * and local paths (resolved against the settings file directory).
 * Returns undefined for non-local entries.
 */
function resolvePackageDir(entry: string, settingsDir: string): string | undefined {
	if (entry.startsWith("npm:") || entry.startsWith("git:") || entry.startsWith("http")) return undefined;
	if (entry.startsWith("/")) return entry;
	return resolve(settingsDir, entry);
}

/**
 * Collect siblings covered by the pi manifests of locally-installed packages.
 *
 * @param settingsDir  Directory containing the settings.json file (used to
 *                     resolve relative local package paths).
 * @param installed    The raw `packages[]` entries from settings.json.
 */
export function findCoveredByManifests(
	settingsDir: string,
	installed: string[],
): Set<string> {
	const covered: Set<string> = new Set();
	for (const entry of installed) {
		const pkgDir = resolvePackageDir(entry, settingsDir);
		if (!pkgDir) continue;
		for (const extPath of readPackageExtensions(pkgDir)) {
			for (const sib of SIBLINGS) {
				if (sib.matches.test(extPath)) {
					covered.add(sib.pkg);
				}
			}
		}
	}
	return covered;
}

/**
 * Return the SIBLINGS not currently installed.
 * Reads the active Pi settings file once per call — callers that need both the
 * full snapshot and the missing subset should call this once and filter.
 *
 * Accepts an optional `settingsDir` for testing. When provided, reads
 * `settings.json` from that directory; otherwise reads from the real
 * Pi agent settings path.
 *
 * In addition to checking settings.json `packages[]` directly (npm installs),
 * this also checks each installed local package's pi manifest. If a local
 * package declares a sibling under `pi.extensions`, the sibling is considered
 * installed — supporting monorepo setups where all siblings are bundled into
 * one root package.
 */
export function findMissingSiblings(settingsDir?: string): SiblingPlugin[] {
	const sDir = settingsDir;
	if (sDir !== undefined) {
		// Test path: read settings.json from the given directory
		const settingsPath = join(sDir, "settings.json");
		if (!existsSync(settingsPath)) return [...SIBLINGS];
		try {
			const parsed = JSON.parse(readFileSync(settingsPath, "utf-8"));
			if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return [...SIBLINGS];
			const pkgs = parsed.packages;
			if (!Array.isArray(pkgs)) return [...SIBLINGS];
			const installed = pkgs.filter((e: unknown): e is string => typeof e === "string");
			const covered = findCoveredByManifests(sDir, installed);
			return SIBLINGS.filter(
				(s) =>
					!installed.some((entry) => s.matches.test(entry)) && !covered.has(s.pkg),
			);
		} catch {
			return [...SIBLINGS];
		}
	}

	// Real path: use readPiAgentSettings
	const result = readPiAgentSettings();
	if (!result) return [...SIBLINGS];
	const installed = result.packages.filter((e): e is string => typeof e === "string");

	const realDir = dirname(getPiAgentSettingsPath());
	const covered = findCoveredByManifests(realDir, installed);

	return SIBLINGS.filter(
		(s) =>
			!installed.some((entry) => s.matches.test(entry)) && !covered.has(s.pkg),
	);
}