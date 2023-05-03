# bitbucket-checkout

This is a simple script to checkout a branch from a Bitbucket repository.

#### Sample Usage

```
  name: "Bitbucket Checkout",
  uses: "choreo-templates/bitbucket-checkout@v1.0.0",
  with: 
    token: "${{ env.APP_GH_TOKEN }}",
    username: "${{env.BB_USERNAME}}",
    userOrgName: "${{env.ORG_NAME}}",
    userRepoName: "${{env.APP_NAME}}",
    configRepoName: "config-repo",
    branch: "choreo-dev"
    commitUser: "choreo-bot",
    commitEmail: "choreo-bot@wso2.com"
```