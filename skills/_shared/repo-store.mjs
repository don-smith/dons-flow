#!/usr/bin/env node
// Resolve and initialize MyFlow's personal per-repo store.
//
// Commands:
//   node repo-store.mjs info
//   node repo-store.mjs ensure
//   node repo-store.mjs path <as_built|status|runbooks|agents>
//   node repo-store.mjs state <tabled|memory|retros>
//
// The store is intentionally outside target repos by default:
//   ${MYFLOW_HOME:-~/.myflow}/repos/<repo-identity>/

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_PATHS = {
	as_built: "docs/changes",
	status: "docs/status.md",
	runbooks: "docs/runbooks",
	agents: "AGENTS.md",
};

const DEFAULT_STATE = {
	tabled: "tabled.md",
	memory: "memory",
	retros: "retros",
};

const safeGit = (args, fallback = "") => {
	try {
		const out = execFileSync("git", args, {
			encoding: "utf-8",
			stdio: ["ignore", "pipe", "ignore"],
		}).trim();
		return out || fallback;
	} catch {
		return fallback;
	}
};

const sanitizeLocalName = (value) => value.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "repo";

export function normalizeRemoteUrl(remote) {
	let value = remote.trim();
	if (!value) return "";
	value = value.replace(/^git\+/, "");
	value = value.replace(/\.git$/, "");

	const sshMatch = value.match(/^git@([^:]+):(.+)$/);
	if (sshMatch) return `${sshMatch[1]}/${sshMatch[2]}`;

	try {
		const url = new URL(value);
		return `${url.hostname}${url.pathname}`.replace(/^\/+|\/+$/g, "");
	} catch {
		return value.replace(/^\/+|\/+$/g, "");
	}
}

export function repoIdentity(root, remote = safeGit(["config", "--get", "remote.origin.url"])) {
	const normalizedRemote = normalizeRemoteUrl(remote);
	if (normalizedRemote) return normalizedRemote;
	const hash = createHash("sha1").update(root || process.cwd()).digest("hex").slice(0, 12);
	return `local/${sanitizeLocalName(basename(root || process.cwd()))}-${hash}`;
}

function parseTomlSections(text) {
	const result = { paths: {}, state: {} };
	let section = "";
	for (const rawLine of text.split(/\r?\n/)) {
		const line = rawLine.trim();
		if (!line || line.startsWith("#")) continue;
		const sectionMatch = line.match(/^\[([^\]]+)\]$/);
		if (sectionMatch) {
			section = sectionMatch[1];
			continue;
		}
		const kv = line.match(/^([A-Za-z0-9_-]+)\s*=\s*"(.*)"\s*$/);
		if (!kv) continue;
		if (section === "paths" || section === "state") result[section][kv[1]] = kv[2];
	}
	return result;
}

function configText(identity, root) {
	return `# MyFlow personal repo configuration. Not committed to target repos.\n\n[repo]\nidentity = "${identity}"\nroot_hint = "${root.replaceAll("\\", "\\\\")}"\n\n[paths]\nas_built = "${DEFAULT_PATHS.as_built}"\nstatus = "${DEFAULT_PATHS.status}"\nrunbooks = "${DEFAULT_PATHS.runbooks}"\nagents = "${DEFAULT_PATHS.agents}"\n\n[state]\ntabled = "${DEFAULT_STATE.tabled}"\nmemory = "${DEFAULT_STATE.memory}"\nretros = "${DEFAULT_STATE.retros}"\n`;
}

export function resolveStore(cwd = process.cwd()) {
	const root = safeGit(["rev-parse", "--show-toplevel"], cwd);
	const identity = repoIdentity(root);
	const myflowHome = process.env.MYFLOW_HOME || join(homedir(), ".myflow");
	const storeDir = join(myflowHome, "repos", ...identity.split("/"));
	const configPath = join(storeDir, "config.toml");
	const worktreeScratch = join(root || cwd, ".myflow");
	return { root: root || cwd, identity, myflowHome, storeDir, configPath, worktreeScratch };
}

export function loadRepoConfig(store = resolveStore()) {
	let parsed = { paths: {}, state: {} };
	if (existsSync(store.configPath)) parsed = parseTomlSections(readFileSync(store.configPath, "utf-8"));
	return {
		paths: { ...DEFAULT_PATHS, ...parsed.paths },
		state: { ...DEFAULT_STATE, ...parsed.state },
	};
}

export function ensureStore(store = resolveStore()) {
	mkdirSync(store.storeDir, { recursive: true });
	if (!existsSync(store.configPath)) writeFileSync(store.configPath, configText(store.identity, store.root), "utf-8");
	const config = loadRepoConfig(store);
	for (const key of ["memory", "retros"]) mkdirSync(join(store.storeDir, config.state[key]), { recursive: true });
	for (const dir of ["artifacts", "specs", "guidance"]) mkdirSync(join(store.worktreeScratch, dir), { recursive: true });
	return store;
}

function printInfo(store = resolveStore()) {
	const config = loadRepoConfig(store);
	process.stdout.write(
		[
			`repo_identity: ${store.identity}`,
			`store_dir: ${store.storeDir}`,
			`config: ${store.configPath}`,
			`worktree_scratch: ${store.worktreeScratch}`,
			`path.as_built: ${config.paths.as_built}`,
			`path.status: ${config.paths.status}`,
			`path.runbooks: ${config.paths.runbooks}`,
			`path.agents: ${config.paths.agents}`,
			`state.tabled: ${join(store.storeDir, config.state.tabled)}`,
			`state.memory: ${join(store.storeDir, config.state.memory)}`,
			`state.retros: ${join(store.storeDir, config.state.retros)}`,
			"",
		].join("\n"),
	);
}

function main() {
	const [command = "info", key] = process.argv.slice(2);
	const store = resolveStore();
	if (command === "ensure") {
		ensureStore(store);
		printInfo(store);
		return;
	}
	if (command === "info") {
		printInfo(store);
		return;
	}
	const config = loadRepoConfig(store);
	if (command === "path") {
		if (!key || !(key in config.paths)) {
			console.error(`unknown path key: ${key || "(missing)"}`);
			process.exit(2);
		}
		console.log(config.paths[key]);
		return;
	}
	if (command === "state") {
		if (!key || !(key in config.state)) {
			console.error(`unknown state key: ${key || "(missing)"}`);
			process.exit(2);
		}
		console.log(join(store.storeDir, config.state[key]));
		return;
	}
	console.error(`unknown command: ${command}`);
	process.exit(2);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
