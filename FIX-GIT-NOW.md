# Fix Git Issue - Run These Commands

## The Problem
Your frontend folder has its own `.git` repository inside it, which causes issues.

## Quick Fix - Run These Commands:

### Option 1: Use the Batch Script
```bash
# Just double-click this file:
fix-git-issue.bat
```

### Option 2: Manual Commands (PowerShell)
```powershell
# 1. Remove nested .git folders
Remove-Item -Recurse -Force frontend\.git -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force backend\.git -ErrorAction SilentlyContinue

# 2. Clear Git cache
git rm -r --cached frontend
git rm -r --cached backend

# 3. Re-add everything
git add .

# 4. Check status
git status
```

## After Fixing

You should see a clean status. Then commit and push:

```powershell
# Commit
git commit -m "Initial commit: GloCar website"

# Add remote (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# Push
git branch -M main
git push -u origin main
```

## Verify It's Fixed

Run this to check:
```powershell
git status
```

You should NOT see any warnings about embedded repositories.

## Why This Happened

When you created the Next.js app with `create-next-app`, it automatically initialized a Git repository in the frontend folder. Since you want one repository for the entire project, we need to remove the nested one.

---

**After running the fix, you can push to GitHub without issues!**
