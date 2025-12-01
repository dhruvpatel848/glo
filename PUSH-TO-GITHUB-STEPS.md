# Complete Steps to Push to GitHub

## Step 1: Fix the Git Issue

Run these commands in PowerShell:

```powershell
# Remove nested .git folders
Remove-Item -Recurse -Force frontend\.git -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force backend\.git -ErrorAction SilentlyContinue

# Clear Git cache
git rm -r --cached frontend
git rm -r --cached backend

# Re-add everything
git add .
```

## Step 2: Verify .gitignore is Working

```powershell
# Check what will be committed
git status
```

Make sure you DON'T see:
- `backend/.env`
- `frontend/.env.local`
- `node_modules/`
- `.next/`

## Step 3: Create Initial Commit

```powershell
git commit -m "Initial commit: GloCar car service website"
```

## Step 4: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `glocar-website` (or your choice)
3. Choose **Public** or **Private**
4. **DO NOT** check any boxes (no README, no .gitignore, no license)
5. Click **"Create repository"**

## Step 5: Connect to GitHub

Replace `YOUR-USERNAME` with your actual GitHub username:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/glocar-website.git
git branch -M main
git push -u origin main
```

## Step 6: Enter Credentials

When prompted:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your password)

### How to Get Personal Access Token:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "GloCar Website"
4. Select scopes: Check **"repo"**
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this token as your password

## Step 7: Verify Upload

```powershell
# Check remote
git remote -v

# Visit your repository
# https://github.com/YOUR-USERNAME/glocar-website
```

## Complete Command Sequence

Copy and paste these (replace YOUR-USERNAME):

```powershell
# Fix nested git
Remove-Item -Recurse -Force frontend\.git -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force backend\.git -ErrorAction SilentlyContinue
git rm -r --cached frontend
git rm -r --cached backend
git add .

# Commit
git commit -m "Initial commit: GloCar car service website"

# Connect to GitHub
git remote add origin https://github.com/YOUR-USERNAME/glocar-website.git
git branch -M main
git push -u origin main
```

## Future Updates

After making changes:

```powershell
git add .
git commit -m "Description of your changes"
git push
```

## Troubleshooting

### Error: "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/glocar-website.git
```

### Error: "Permission denied"
- Make sure you're using a Personal Access Token, not your password
- Generate a new token if needed

### Error: "Repository not found"
- Check the repository name is correct
- Make sure the repository exists on GitHub
- Verify your username is correct

## Security Check

Before pushing, verify these files are NOT in git:

```powershell
# This should return nothing:
git ls-files | Select-String ".env"
git ls-files | Select-String "node_modules"
```

If you see any .env files, they're being tracked! Fix with:
```powershell
git rm --cached backend/.env
git rm --cached frontend/.env.local
git commit -m "Remove .env files"
```

## Success!

Your repository is now at:
```
https://github.com/YOUR-USERNAME/glocar-website
```

You can:
- View your code online
- Share the link
- Clone it on other computers
- Collaborate with others

---

**Congratulations! Your project is now on GitHub! 🎉**
