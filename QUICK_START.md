# Quick Start Guide

## 🚀 For Developers (5 minutes read)

### Daily Workflow

```bash
# 1. Start new feature
git checkout dev && git pull
git checkout -b feat/your-name-feature

# 2. Make changes in src/ folder
# ... edit code ...

# 3. Commit (pre-commit hook will lint & build automatically)
git add .
git commit -m "add new feature"

# 4. Push and create PR
git push origin feat/your-name-feature
# Create PR to dev branch in GitHub
```

### Testing Your Changes

```bash
# In another service (api/worker):
npm install git+ssh://git@github.com/Spaace-io/spaace-common-lib-marketplace.git#feat/your-name-feature

# Test it
# ...

# Revert to stable
npm install @Spaace-io/common-lib@latest
```

### Rules
- ❌ DON'T touch version in package.json
- ❌ DON'T edit dist/ folder
- ✅ DO work in feature branches
- ✅ DO create PRs to dev

---

## 👔 For Release Manager

### Release to DEV

```bash
git checkout dev
git pull
# Merge approved PRs

npm version prerelease --preid=beta   # → 0.0.8-beta.1
git push origin dev --tags

# ✅ GitHub Actions will:
# - Run migrations on DEV database
# - Publish package with beta tag
```

### Release to STAGE

```bash
git checkout stage
git merge dev

npm version prerelease --preid=rc     # → 0.0.8-rc.1
git push origin stage --tags

# ✅ GitHub Actions will:
# - Run migrations on STAGE database
# - Publish package with rc tag
```

### Release to PROD

```bash
git checkout main
git merge stage

npm version patch                      # → 0.0.8
git push origin main --tags

# ✅ GitHub Actions will:
# - Run migrations on PROD database
# - Publish package
# - Create GitHub Release

# Notify team to update their services:
# npm update @Spaace-io/common-lib
```

---

## 📦 Version Types

| Environment | Version Format | Example | Auto Deploy |
|------------|----------------|---------|-------------|
| DEV | `x.x.x-beta.N` | `0.0.8-beta.1` | ✅ Yes |
| STAGE | `x.x.x-rc.N` | `0.0.8-rc.1` | ✅ Yes |
| PROD | `x.x.x` | `0.0.8` | ✅ Yes |

---

## 🗄️ Database Migrations

### Auto (Recommended)
Migrations run automatically via GitHub Actions when you push version tags.

### Manual (If needed)
```bash
# Generate new migration
npm run migration:generate --name=add_feature

# Run migrations
npm run migrate

# Revert migration
npm run migration:revert
```

---

## 🔧 First Time Setup

### For Release Manager

1. **Setup GitHub Secrets** (one time)
   - See `.github/SETUP.md` for detailed instructions
   - Add database credentials for DEV/STAGE/PROD

2. **Test Workflows**
   - Push a beta tag and verify it works
   - Check Actions tab in GitHub

### For Developers

1. **Clone repo**
   ```bash
   git clone git@github.com:Spaace-io/spaace-common-lib-marketplace.git
   cd spaace-common-lib-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create feature branch and start coding!**
   ```bash
   git checkout -b feat/your-name-feature
   ```

---

## 🆘 Help

- **Full docs:** See `README.md`
- **GitHub Actions setup:** See `.github/SETUP.md`
- **Questions:** Ask in team chat

---

## 🎯 Common Commands

```bash
# Developer
git checkout -b feat/name-feature       # Create feature branch
git commit -m "add feature"             # Commit (auto lint & build)
git push origin feat/name-feature       # Push to GitHub

# Release Manager
npm version prerelease --preid=beta     # Beta version
npm version prerelease --preid=rc       # RC version
npm version patch                       # Prod version (bugfix)
npm version minor                       # Prod version (new feature)
npm version major                       # Prod version (breaking change)

git push origin BRANCH --tags           # Push with tags (triggers deploy)

# In other services
npm install @Spaace-io/common-lib@0.0.8-beta.1  # Install specific version
npm update @Spaace-io/common-lib                # Update to latest
```

---

**That's it! You're ready to go! 🎉**

