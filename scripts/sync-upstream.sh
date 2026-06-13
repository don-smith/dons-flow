#!/usr/bin/env bash
set -euo pipefail

# sync-upstream.sh
#
# Clone or update local mirrors of Superpowers and RPIV, compare against the
# last-synced commit hashes, and emit a decision-ready report.
#
# Usage:
#   ./scripts/sync-upstream.sh
#
# Outputs:
#   vendor/superpowers/       git mirror of obra/superpowers
#   vendor/rpiv-mono/         git mirror of juicesharp/rpiv-mono
#   docs/memory/upstream-sync-YYYY-MM-DD.md  report of changes
#   docs/memory/.upstream-last-sync.json    last-synced commit hashes

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

VENDOR_DIR="$REPO_ROOT/vendor"
MEMORY_DIR="$REPO_ROOT/docs/memory"
TODAY="$(date +%Y-%m-%d)"
REPORT_FILE="$MEMORY_DIR/upstream-sync-$TODAY.md"
LAST_SYNC_FILE="$MEMORY_DIR/.upstream-last-sync.json"

mkdir -p "$VENDOR_DIR" "$MEMORY_DIR"

# Ensure last-sync tracking file exists
if [[ ! -f "$LAST_SYNC_FILE" ]]; then
  echo '{}' > "$LAST_SYNC_FILE"
fi

# Read last-synced hashes
SUPERPOWERS_LAST="$(jq -r '.superpowers // ""' "$LAST_SYNC_FILE")"
RPIV_LAST="$(jq -r '.rpiv // ""' "$LAST_SYNC_FILE")"

sync_repo() {
  local name="$1"
  local url="$2"
  local dir="$3"

  if [[ -d "$dir/.git" ]]; then
    echo "Updating $name..." >&2
    git -C "$dir" fetch origin --quiet
    git -C "$dir" pull origin --quiet
  else
    echo "Cloning $name..." >&2
    git clone --quiet "$url" "$dir"
  fi

  git -C "$dir" rev-parse HEAD
}

SUPERPOWERS_CURRENT="$(sync_repo "Superpowers" "https://github.com/obra/superpowers" "$VENDOR_DIR/superpowers")"
RPIV_CURRENT="$(sync_repo "RPIV" "https://github.com/juicesharp/rpiv-mono" "$VENDOR_DIR/rpiv-mono")"

# Build report
cat > "$REPORT_FILE" <<EOF
# Upstream Sync: $TODAY

type: upstream-sync
superpowers-last: ${SUPERPOWERS_LAST:-none}
superpowers-current: $SUPERPOWERS_CURRENT
rpiv-last: ${RPIV_LAST:-none}
rpiv-current: $RPIV_CURRENT

## Superpowers ($SUPERPOWERS_LAST → $SUPERPOWERS_CURRENT)

### Commits since last sync

\`\`\`bash
$(if [[ -n "$SUPERPOWERS_LAST" ]]; then
  git -C "$VENDOR_DIR/superpowers" log --oneline "$SUPERPOWERS_LAST..$SUPERPOWERS_CURRENT" -- || true
else
  git -C "$VENDOR_DIR/superpowers" log --oneline -20 -- || true
fi)
\`\`\`

### Files changed

\`\`\`bash
$(if [[ -n "$SUPERPOWERS_LAST" ]]; then
  git -C "$VENDOR_DIR/superpowers" diff --stat "$SUPERPOWERS_LAST..$SUPERPOWERS_CURRENT" -- || true
else
  echo "First sync — review the repository structure and recent commits."
fi)
\`\`\`

### Decisions

- **Incorporate:** _list changes from Superpowers to pull into Don's Flow_
- **Defer / Skip:** _list changes that do not fit or are not yet needed_
- **Notes:** _impact assessment, breaking changes, new skills to watch_

## RPIV ($RPIV_LAST → $RPIV_CURRENT)

### Commits since last sync

\`\`\`bash
$(if [[ -n "$RPIV_LAST" ]]; then
  git -C "$VENDOR_DIR/rpiv-mono" log --oneline "$RPIV_LAST..$RPIV_CURRENT" -- || true
else
  git -C "$VENDOR_DIR/rpiv-mono" log --oneline -20 -- || true
fi)
\`\`\`

### Files changed

\`\`\`bash
$(if [[ -n "$RPIV_LAST" ]]; then
  git -C "$VENDOR_DIR/rpiv-mono" diff --stat "$RPIV_LAST..$RPIV_CURRENT" -- || true
else
  echo "First sync — review the repository structure and recent commits."
fi)
\`\`\`

### Decisions

- **Incorporate:** _list changes from RPIV to pull into Don's Flow_
- **Defer / Skip:** _list changes that do not fit or are not yet needed_
- **Notes:** _impact assessment, breaking changes, new skills to watch_

## Next steps

1. Review the commits and diffs above.
2. Edit the **Decisions** sections in this file.
3. Apply incorporated changes to the Don's Flow package.
4. Bump version, commit, push, and publish.
EOF

# Update last-sync tracking
jq -n \
  --arg superpowers "$SUPERPOWERS_CURRENT" \
  --arg rpiv "$RPIV_CURRENT" \
  '{superpowers: $superpowers, rpiv: $rpiv}' > "$LAST_SYNC_FILE"

echo ""
echo "Upstream sync complete."
echo "Report: $REPORT_FILE"
echo "Last-sync tracking: $LAST_SYNC_FILE"
echo ""
echo "Note: vendor/ is gitignored. Re-run this script to recreate local mirrors."
echo ""
echo "Current hashes:"
echo "  Superpowers: $SUPERPOWERS_CURRENT"
echo "  RPIV:        $RPIV_CURRENT"
