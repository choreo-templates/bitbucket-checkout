# bitbucket-checkout

This is a simple script to checkout a branch from a Bitbucket server repository.

#### Sample Usage

```
  name: "Bitbucket Server Checkout",
  uses: "choreo-templates/bitbucket-checkout@v2.0.0",
  with:
    token: "${{ env.APP_BB_SERVER_TOKEN }}",
    serverUrl: "${{env.APP_BB_SERVER_URL}}",
    userOrgName: "${{env.ORG_NAME}}",
    userRepoName: "${{env.APP_NAME}}",
    configRepoName: "config-repo",
    branch: "choreo-dev"
    commitUser: "choreo-bot",
    commitEmail: "choreo-bot@wso2.com"
```
