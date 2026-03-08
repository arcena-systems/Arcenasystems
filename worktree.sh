#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKTREE_DIR="$(dirname "$REPO_DIR")/worktrees"

usage() {
  echo "Usage: $0 <command> [name]"
  echo ""
  echo "Commands:"
  echo "  create <name>   Create feature/<name> branch + worktree"
  echo "  remove <name>   Remove worktree + delete branch (does NOT merge)"
  echo "  merge  <name>   Merge feature/<name> into main, then clean up"
  echo "  list            Show all active worktrees"
  echo ""
  echo "Examples:"
  echo "  $0 create hero-redesign"
  echo "  $0 list"
  echo "  $0 merge hero-redesign"
  echo "  $0 remove hero-redesign"
}

cmd_create() {
  local name="$1"
  local branch="feature/$name"
  local wt_path="$WORKTREE_DIR/$name"

  if [ -d "$wt_path" ]; then
    echo "Error: Worktree '$name' already exists at $wt_path"
    exit 1
  fi

  mkdir -p "$WORKTREE_DIR"

  # Create worktree with new branch from current main
  cd "$REPO_DIR"
  git worktree add "$wt_path" -b "$branch" main

  echo ""
  echo "Worktree created:"
  echo "  Path:   $wt_path"
  echo "  Branch: $branch"
  echo ""
  echo "To start working:"
  echo "  cd \"$wt_path\""
  echo "  PORT=\$((3000 + RANDOM % 1000)) node serve.mjs"
}

cmd_remove() {
  local name="$1"
  local branch="feature/$name"
  local wt_path="$WORKTREE_DIR/$name"

  if [ ! -d "$wt_path" ]; then
    echo "Error: Worktree '$name' not found at $wt_path"
    exit 1
  fi

  cd "$REPO_DIR"
  git worktree remove "$wt_path"
  git branch -D "$branch" 2>/dev/null || true

  echo "Removed worktree '$name' and deleted branch '$branch'"
}

cmd_merge() {
  local name="$1"
  local branch="feature/$name"
  local wt_path="$WORKTREE_DIR/$name"

  cd "$REPO_DIR"
  git checkout main

  echo "Merging $branch into main..."
  git merge "$branch" -m "Merge $branch into main"

  # Clean up worktree and branch
  if [ -d "$wt_path" ]; then
    git worktree remove "$wt_path"
  fi
  git branch -d "$branch"

  echo "Merged and cleaned up '$name'"
}

cmd_list() {
  cd "$REPO_DIR"
  echo "Active worktrees:"
  echo ""
  git worktree list
}

# --- Main ---
if [ $# -lt 1 ]; then
  usage
  exit 1
fi

command="$1"
shift

case "$command" in
  create)
    [ $# -lt 1 ] && { echo "Error: 'create' requires a name"; exit 1; }
    cmd_create "$1"
    ;;
  remove)
    [ $# -lt 1 ] && { echo "Error: 'remove' requires a name"; exit 1; }
    cmd_remove "$1"
    ;;
  merge)
    [ $# -lt 1 ] && { echo "Error: 'merge' requires a name"; exit 1; }
    cmd_merge "$1"
    ;;
  list)
    cmd_list
    ;;
  *)
    echo "Unknown command: $command"
    usage
    exit 1
    ;;
esac
