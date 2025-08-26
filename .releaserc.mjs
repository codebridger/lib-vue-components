// Get the current branch from environment or git
const getCurrentBranch = () => {
  // Check if we're in a CI environment
  if (process.env.CI && process.env.GITHUB_REF) {
    return process.env.GITHUB_REF.replace("refs/heads/", "");
  }

  // For local development, you can set BRANCH env var
  if (process.env.BRANCH) {
    return process.env.BRANCH;
  }

  // Default to main if we can't determine
  return "main";
};

const currentBranch = getCurrentBranch();
const isMainBranch = currentBranch === "main";

export default {
  branches: [
    "main",
    {
      name: "dev",
      prerelease: true,
    },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          {
            type: "refactor",
            release: "patch",
          },
        ],
      },
    ],
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        changelogFile: isMainBranch ? "CHANGELOG.md" : "CHANGELOG-DEV.md",
      },
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: true,
        tag: isMainBranch ? "latest" : currentBranch,
      },
    ],
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        assets: [
          "package.json",
          isMainBranch ? "CHANGELOG.md" : "CHANGELOG-DEV.md",
        ],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
