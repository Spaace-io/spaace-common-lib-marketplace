# Spaace common-lib

This repository is a Node.js package.\
It is ment to be shared between all backend services.\
It contains database connections, TypeORM entities, and other reused helper functions.

## Usage

To install this package in **target** services, run:

```sh
npm i @spaace/common-lib
```

It can then be used as follows:

```typescript
import { Database, pubsub } from '@spaace/common-lib';

await Database.initialize();
await pubsub.initialize();

// OR

import { Database } from '@spaace/common-lib/dist/database';
import { pubsub } from '@spaace/common-lib/dist/pubsub/client';

await Database.initialize();
await pubsub.initialize();
```

Only databases on which the service is dependendant should (and must) be initialized.

## Contributing

To update this repository, update files in the `src` folder, then run:

```sh
npm run build
```

You can then push all changes to the `dev` branch.

To test out the changes in **target** services, run:

```sh
npm i git+ssh://git@github.com/avicenne-studio/spaace-common-lib.git#dev
```

## TypeORM migrations

Because this repository contains the TypeORM database entities, it must also contain migrations for the on-chain and off-chain databases.

To automatically generate migrations, use the TypeORM CLI through the provided NPM scripts with:

```sh
npm run migration:generate:on-chain --name=<name>
# OR
npm run migration:generate:off-chain --name=<name>
```

Finally, before commiting, update the `dist` folder to add the migrations by running:

```sh
npm run build
```

## Updating

After each change to this package merged onto the `main` branch, **target** services must be updated to use the new version.

To do so, run the following in the **target** services:

```sh
npm up @spaace/common-lib
```
# Spaace Common Library

Shared Node.js package for all Spaace backend services.

**Contains:**
- Database connections (TypeORM)
- Entity definitions & migrations
- Redis client
- PubSub (RabbitMQ)
- Blockchain utilities
- Twitter API handler
- Shared helper functions

---

## 📦 Installation

In your service (api, worker, admin, etc.):

```bash
npm install @Spaace-io/common-lib
```

## 🔧 Usage

```typescript
import { Database, pubsub } from '@spaace/common-lib';

await Database.initialize();
await pubsub.initialize();

// OR import specific modules:

import { Database } from '@spaace/common-lib/dist/database';
import { pubsub } from '@spaace/common-lib/dist/pubsub/client';

await Database.initialize();
await pubsub.initialize();
```

> **Note:** Only initialize databases that your service depends on.

---

## 👥 Development Workflow

### For Developers

#### 1. Start working on a feature

```bash
git checkout dev
git pull origin dev
git checkout -b feat/your-name-feature-name

# Example:
git checkout -b feat/john-nansen-airdrop
```

#### 2. Make your changes

- Edit files in `src/` folder
- Husky pre-commit hook will automatically:
  - Run linter
  - Build the project
  - Update `dist/` folder

#### 3. Commit and push

```bash
git add .
git commit -m "add nansen airdrop entities"
git push origin feat/john-nansen-airdrop
```

#### 4. Create Pull Request

- Create PR to `dev` branch in GitHub
- Request review from team members
- After approval, one selected person will merge

#### 5. Test your changes in other services

While developing, you can test your branch in other services:

```bash
# In your api/worker service:
npm install git+ssh://git@github.com/Spaace-io/spaace-common-lib-marketplace.git#feat/john-nansen-airdrop

# Test your changes locally

# When done testing, revert to stable version:
npm install @Spaace-io/common-lib@latest
```

---

### For Release Manager

We use pre-release versions for different environments:

- **Dev:** `0.0.8-beta.1`, `0.0.8-beta.2` (testing new features)
- **Stage:** `0.0.8-rc.1` (release candidate, final testing)
- **Prod:** `0.0.8` (stable, clean version)

#### Release Process

**1. Create Beta version for DEV server**

When features are ready for testing:

```bash
git checkout dev
git pull origin dev
# Merge approved PRs

# Create beta version
npm version prerelease --preid=beta   # 0.0.7 → 0.0.8-beta.1
git push origin dev --tags
```

✅ **GitHub Actions will automatically:**
- Run migrations on DEV database
- Publish package to GitHub Packages with `beta` tag

**2. Fix bugs and create new beta versions** (if needed)

```bash
# After fixing bugs in dev branch
npm version prerelease --preid=beta   # 0.0.8-beta.1 → 0.0.8-beta.2
git push origin dev --tags
```

**3. Create Release Candidate for STAGE server**

When dev testing is complete:

```bash
git checkout stage  # or create stage branch if doesn't exist
git merge dev

# Create release candidate
npm version prerelease --preid=rc   # 0.0.8-beta.2 → 0.0.8-rc.1
git push origin stage --tags
```

✅ **GitHub Actions will automatically:**
- Run migrations on STAGE database
- Publish package to GitHub Packages with `rc` tag

**4. Create Production release**

After stage testing is successful:

```bash
git checkout main
git pull origin main
git merge stage

# Create clean production version
npm version patch    # 0.0.8-rc.1 → 0.0.8 (for bugfixes)
# npm version minor  # for new features (0.0.8 → 0.1.0)
# npm version major  # for breaking changes (0.0.8 → 1.0.0)

git push origin main --tags
```

✅ **GitHub Actions will automatically:**
- Run migrations on PROD database
- Publish package to GitHub Packages
- Create GitHub Release

**5. Notify team**

Post in team chat:
```
🚀 Production Release: v0.0.8

What's new:
- Nansen airdrop entities
- Mystery chest system
- Bug fixes

Servers to update:
✅ DEV - already on beta
✅ STAGE - already on rc
🔄 PROD - run: npm update @Spaace-io/common-lib
```

---

## 🤖 GitHub Actions (Automated Deployments)

We use GitHub Actions to automatically deploy and run migrations when you push version tags.

### How it works:

1. **Push beta tag** (`v0.0.8-beta.1`) → Triggers `deploy-dev.yml`
   - Runs migrations on DEV database
   - Publishes to npm with `beta` tag

2. **Push rc tag** (`v0.0.8-rc.1`) → Triggers `deploy-stage.yml`
   - Runs migrations on STAGE database
   - Publishes to npm with `rc` tag

3. **Push prod tag** (`v0.0.8`) → Triggers `deploy-prod.yml`
   - Runs migrations on PROD database
   - Publishes to npm
   - Creates GitHub Release

### Required GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

#### DEV Environment:
- `DEV_DATABASE_HOST`
- `DEV_DATABASE_PORT`
- `DEV_DATABASE_USERNAME`
- `DEV_DATABASE_PASSWORD`
- `DEV_DATABASE_NAME`
- `DEV_DATABASE_SCHEMA`
- `DEV_DATABASE_SSL` (true/false)

#### STAGE Environment:
- `STAGE_DATABASE_HOST`
- `STAGE_DATABASE_PORT`
- `STAGE_DATABASE_USERNAME`
- `STAGE_DATABASE_PASSWORD`
- `STAGE_DATABASE_NAME`
- `STAGE_DATABASE_SCHEMA`
- `STAGE_DATABASE_SSL` (true/false)

#### PROD Environment:
- `PROD_DATABASE_HOST`
- `PROD_DATABASE_PORT`
- `PROD_DATABASE_USERNAME`
- `PROD_DATABASE_PASSWORD`
- `PROD_DATABASE_NAME`
- `PROD_DATABASE_SCHEMA`
- `PROD_DATABASE_SSL` (true/false)

> **Note:** `GITHUB_TOKEN` is automatically provided by GitHub Actions.

---

## 🔄 Updating in Services

### For Different Environments

**DEV servers** - use beta versions:
```bash
npm install @Spaace-io/common-lib@0.0.8-beta.1
```

**STAGE servers** - use release candidates:
```bash
npm install @Spaace-io/common-lib@0.0.8-rc.1
```

**PROD servers** - use stable versions:
```bash
npm update @Spaace-io/common-lib
npm install
```

### Package.json Configuration

**For DEV servers:**
```json
{
  "dependencies": {
    "@Spaace-io/common-lib": "0.0.8-beta.1"
  }
}
```

**For STAGE servers:**
```json
{
  "dependencies": {
    "@Spaace-io/common-lib": "0.0.8-rc.1"
  }
}
```

**For PROD servers:**
```json
{
  "dependencies": {
    "@Spaace-io/common-lib": "^0.0.8"
  }
}
```

> The `^` symbol means npm will auto-update to latest `0.0.x` stable version (e.g., 0.0.8 → 0.0.9).

---

## 🗄️ Database Migrations

### Generate new migration

```bash
npm run migration:generate --name=your_migration_name

# Example:
npm run migration:generate --name=add_nansen_airdrop
```

### Run migrations manually (if needed)

```bash
npm run migrate
```

### Revert last migration

```bash
npm run migration:revert
```

**Note:** Migrations are automatically run by GitHub Actions when you push version tags.

---

## 🚫 Rules (Important!)

### ❌ DON'T:

- **DON'T** manually change version in `package.json` (only release manager does this)
- **DON'T** manually edit files in `dist/` folder (auto-generated)
- **DON'T** commit without running linter (pre-commit hook does this)
- **DON'T** push directly to `main` or `dev` branches
- **DON'T** use weird version names like `0.0.7-my-feature-name-123`
- **DON'T** run migrations manually on prod (GitHub Actions does this)

### ✅ DO:

- **DO** always work in feature branches: `feat/your-name-feature`
- **DO** keep your branch up to date with `dev`
- **DO** write clear commit messages
- **DO** request code reviews before merging
- **DO** test your changes in target services before PR
- **DO** use `npm update` to get latest versions
- **DO** let GitHub Actions handle migrations and deployments

---

## 🏗️ Project Structure

```
spaace-common-lib-marketplace/
├── .github/
│   └── workflows/
│       ├── deploy-dev.yml      # Auto-deploy beta versions
│       ├── deploy-stage.yml    # Auto-deploy rc versions
│       └── deploy-prod.yml     # Auto-deploy production
├── src/                         # Source code (edit here)
│   ├── database/
│   │   ├── tables/             # TypeORM entities
│   │   ├── migrations/         # Database migrations
│   │   ├── enums/              # Shared enums
│   │   └── types/              # TypeScript types
│   ├── blockchain/             # Blockchain utilities
│   ├── pubsub/                 # RabbitMQ client
│   ├── redis/                  # Redis client
│   ├── twitter/                # Twitter API
│   └── utils/                  # Helper functions
├── dist/                        # Compiled code (auto-generated)
├── package.json                # Dependencies & scripts
└── tsconfig.json               # TypeScript config
```

---

## 🆘 Common Issues

### Issue: "Version conflicts between developers"

**Solution:** Only release manager bumps versions. Developers never touch `package.json` version field.

### Issue: "Changes not appearing in other services"

**Solution:** 
```bash
# Make sure you rebuilt and pushed
npm run build
git push

# In target service, force update
npm install git+ssh://git@github.com/Spaace-io/spaace-common-lib-marketplace.git#your-branch
```

### Issue: "Merge conflicts in dist/ folder"

**Solution:** 
```bash
# Delete dist and rebuild
rm -rf dist/
npm run build
git add dist/
git commit -m "rebuild dist"
```

### Issue: "What version should I use on my environment?"

**Solution:**
- **DEV** → `0.0.8-beta.X` (latest features, may have bugs)
- **STAGE** → `0.0.8-rc.X` (testing before production)
- **PROD** → `0.0.8` (stable only)

### Issue: "How to rollback to previous version?"

**Solution:**
```bash
# Find version you need
npm view @Spaace-io/common-lib versions

# Install specific version
npm install @Spaace-io/common-lib@0.0.7
```

### Issue: "GitHub Actions failed to run migrations"

**Solution:**
1. Check if all database secrets are set in GitHub
2. Check workflow logs in Actions tab
3. Verify database credentials are correct
4. You can run migrations manually if needed: `npm run migrate`

---

## 📞 Support

Questions? Ask in team chat or contact the release manager.

**Current release manager:** [Add name here]

---

## 📝 Version History

See [GitHub Releases](https://github.com/Spaace-io/spaace-common-lib-marketplace/releases) for changelog.
