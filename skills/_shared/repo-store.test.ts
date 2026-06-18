import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const REPO_STORE_MJS = fileURLToPath(new URL("./repo-store.mjs", import.meta.url));

const gitIn = (cwd: string, ...args: string[]) =>
	execFileSync("git", args, { cwd, stdio: ["ignore", "pipe", "ignore"] });

const run = (cwd: string, myflowHome: string, ...args: string[]) =>
	execFileSync("node", [REPO_STORE_MJS, ...args], {
		cwd,
		env: { ...process.env, MYFLOW_HOME: myflowHome },
		encoding: "utf-8",
		stdio: ["ignore", "pipe", "ignore"],
	}).trim();

const initRepo = (cwd: string) => {
	gitIn(cwd, "init", "--initial-branch=main", "-q");
	gitIn(cwd, "config", "user.email", "test@example.com");
	gitIn(cwd, "config", "user.name", "Test User");
};

let dir: string;
let home: string;

beforeEach(() => {
	dir = mkdtempSync(join(tmpdir(), "myflow-repo-store-repo-"));
	home = mkdtempSync(join(tmpdir(), "myflow-repo-store-home-"));
});

afterEach(() => {
	rmSync(dir, { recursive: true, force: true });
	rmSync(home, { recursive: true, force: true });
});

describe("repo-store.mjs", () => {
	it("normalizes git remotes into a stable repo identity and store path", () => {
		initRepo(dir);
		gitIn(dir, "remote", "add", "origin", "git@github.com:don-smith/example.git");

		const out = run(dir, home, "info");

		expect(out).toContain("repo_identity: github.com/don-smith/example");
		expect(out).toContain(`store_dir: ${join(home, "repos", "github.com", "don-smith", "example")}`);
		expect(out).toContain(`worktree_scratch: ${join(realpathSync(dir), ".myflow")}`);
	});

	it("falls back to a local path hash when no origin remote exists", () => {
		initRepo(dir);

		const out = run(dir, home, "info");

		expect(out).toMatch(/^repo_identity: local\/[a-z0-9._-]+-[a-f0-9]{12}$/m);
		expect(out).toContain(`worktree_scratch: ${join(realpathSync(dir), ".myflow")}`);
	});

	it("ensure creates default config, global state locations, and worktree scratch folders", () => {
		initRepo(dir);
		gitIn(dir, "remote", "add", "origin", "https://github.com/don-smith/example.git");

		const out = run(dir, home, "ensure");

		const store = join(home, "repos", "github.com", "don-smith", "example");
		expect(out).toContain(`store_dir: ${store}`);
		expect(existsSync(join(store, "config.toml"))).toBe(true);
		expect(existsSync(join(store, "memory"))).toBe(true);
		expect(existsSync(join(store, "retros"))).toBe(true);
		expect(existsSync(join(dir, ".myflow", "artifacts"))).toBe(true);
		expect(existsSync(join(dir, ".myflow", "specs"))).toBe(true);
		expect(existsSync(join(dir, ".myflow", "guidance"))).toBe(true);

		const config = readFileSync(join(store, "config.toml"), "utf-8");
		expect(config).toContain('as_built = "docs/changes"');
		expect(config).toContain('status = "docs/status.md"');
		expect(config).toContain('tabled = "tabled.md"');
	});

	it("prints configured repo paths from config.toml", () => {
		initRepo(dir);
		gitIn(dir, "remote", "add", "origin", "https://github.com/don-smith/example.git");
		run(dir, home, "ensure");
		const configPath = join(home, "repos", "github.com", "don-smith", "example", "config.toml");
		writeFileSync(
			configPath,
			'[paths]\nas_built = "docs/historical"\nstatus = "roadmap.md"\nrunbooks = "docs/runbooks"\nagents = "AGENTS.md"\n\n[state]\ntabled = "tabled.md"\nmemory = "memory"\nretros = "retros"\n',
			"utf-8",
		);

		expect(run(dir, home, "path", "as_built")).toBe("docs/historical");
		expect(run(dir, home, "path", "status")).toBe("roadmap.md");
	});

	it("prints absolute global state paths", () => {
		initRepo(dir);
		gitIn(dir, "remote", "add", "origin", "https://github.com/don-smith/example.git");
		run(dir, home, "ensure");

		const store = join(home, "repos", "github.com", "don-smith", "example");
		expect(run(dir, home, "state", "tabled")).toBe(join(store, "tabled.md"));
		expect(run(dir, home, "state", "memory")).toBe(join(store, "memory"));
		expect(run(dir, home, "state", "retros")).toBe(join(store, "retros"));
	});
});
