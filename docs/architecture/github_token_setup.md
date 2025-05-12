# GitHub Personal Access Token Setup for Deployments

## Overview

This guide explains how to create and use a GitHub Personal Access Token (PAT) to fix the deployment issues with our GitHub Pages workflow.

## Why We Need a Personal Access Token

The default `GITHUB_TOKEN` provided by GitHub Actions has limited permissions. For our GitHub Pages deployment, we need a token with write access to the repository. A Personal Access Token with the appropriate scopes will solve this issue.

## Step 1: Generate a Personal Access Token

1. Go to your GitHub account settings
2. Navigate to **Developer settings** > **Personal access tokens** > **Fine-grained tokens**
3. Click **Generate new token**
4. Configure the token:
   - **Name**: `Pattern-Site-Deployment`
   - **Expiration**: Set an appropriate expiration (e.g., 90 days)
   - **Repository access**: Select "Only select repositories" and choose `james-pattern-ai/placeholder-site`
   - **Permissions**:
     - Repository permissions:
       - **Contents**: Read and write
       - **Pages**: Read and write
5. Click **Generate token**
6. **IMPORTANT**: Copy the generated token immediately (you won't be able to see it again)

## Step 2: Add the Token as a Repository Secret

1. Go to the repository settings
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Configure the secret:
   - **Name**: `PAT_GITHUB_TOKEN`
   - **Value**: Paste the personal access token you generated
5. Click **Add secret**

## Step 3: Update the GitHub Actions Workflow

Update the `.github/workflows/gh-pages.yml` file to use the new token:

```yaml
name: GitHub Pages
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.PAT_GITHUB_TOKEN }}
          publish_dir: .
```

## Step 4: Verify Deployment

After pushing these changes:

1. Go to the **Actions** tab in your repository
2. Check that the workflow runs successfully
3. Verify that the site is deployed correctly at `https://james-pattern-ai.github.io/placeholder-site/`

## Security Considerations

- The PAT should have the minimum required permissions
- Set an appropriate expiration date and renew as needed
- Consider using a dedicated GitHub account for deployments in production environments

## Next Steps for Improving the Build Process

While this fixes the immediate deployment issue, we should still address the content management problem:

1. Update `content.json` to match the current production values
2. Implement a proper build process that outputs directly to the root directory
3. Document the content update process to prevent future inconsistencies