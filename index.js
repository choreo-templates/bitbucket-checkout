const { exec } = require('child_process');
const util = require('util');
const core = require('@actions/core');

const execProm = util.promisify(exec);

async function run() {
try  {
    const token = core.getInput('token');
    const serverUrl = core.getInput('serverUrl');
    const userOrgName = core.getInput('userOrgName');
    const userRepoName = core.getInput('userRepoName');
    const commitUser = core.getInput('commitUser');
    const commitEmail = core.getInput('commitEmail');
    const configRepoName = core.getInput('configRepoName');
    const branch = core.getInput('branch');

    console.log("Started removing files in current directory");
    exec(`rm -rf /home/runner/workspace/${configRepoName}/${configRepoName}/*`, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            core.setOutput("choreo-status", "failed");
            core.setFailed(err.message);
            return;
        }
        console.log(stdout);
        console.log(stderr);
        console.log("Completed removing files in current directory");
        console.log("Started checkout to bitbucket repo");
        exec(`git config --global --add safe.directory /home/runner/workspace/${configRepoName}/${configRepoName}`, (err, stdout, stderr) => {  
            if (err) {
                console.log(err);
                core.setOutput("choreo-status", "failed");
                core.setFailed(err.message);
                return;
            }
            console.log(stdout);
            console.log(stderr);
            console.log("Completed adding safe directory");
            exec(`git init /home/runner/workspace/${configRepoName}/${configRepoName}`, (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    core.setOutput("choreo-status", "failed");
                    core.setFailed(err.message);
                    return;
                }
                console.log(stdout);
                console.log(stderr);
                console.log("Completed git init");
                exec(`git config user.name "${commitUser}" && git config user.email "${commitEmail}"`, (err, stdout, stderr) => {
                    if (err) {
                        console.log(err);
                        core.setOutput("choreo-status", "failed");
                        core.setFailed(err.message);
                        return;
                    }
                    console.log(stdout);
                    console.log(stderr);
                    console.log("Completed git config user.name and user.email");
                    exec(`git config http.extraHeader="Authorization: Bearer ${token}"`,(err,stdout,stderr)=>{
                        if (err) {
                            console.log(err);
                            core.setOutput("choreo-status", "failed");
                            core.setFailed(err.message);
                            return;
                        }
                        console.log(stdout);
                        console.log(stderr);
                        console.log("Completed git config http.extraHeader");

                   
                        exec(`git remote add origin ${serverUrl}/scm/${userOrgName}/${userRepoName}.git`, (err, stdout, stderr) => {
                            if (err) {
                                console.log(err);
                                core.setOutput("choreo-status", "failed");
                                core.setFailed(err.message);
                                return;
                            }
                            console.log(stdout);
                            console.log(stderr);
                            console.log("Completed git remote add origin");
                            exec(`git -c protocol.version=2 fetch --no-tags --prune --progress --no-recurse-submodules --depth=1 origin +refs/heads/${branch}*:refs/remotes/origin/${branch}* +refs/tags/${branch}*:refs/tags/${branch}*`, (err, stdout, stderr) => {
                                if (err) {
                                    console.log(err);
                                    core.setOutput("choreo-status", "failed");
                                    core.setFailed(err.message);
                                    return;
                                }
                                console.log(stdout);
                                console.log(stderr);
                                console.log("Completed git fetch");
                                exec(`git branch --list --remote origin/${branch}`, (err, stdout, stderr) => {
                                    if (err) {
                                        console.log(err);
                                        core.setOutput("choreo-status", "failed");
                                        core.setFailed(err.message);
                                        return;
                                    }
                                    console.log("branches");
                                    console.log("branches" + stdout);
                                    console.log(stderr);
                                    console.log("Completed git branch --list --remote");
                                    exec(`git checkout --progress --force -B ${branch} refs/remotes/origin/${branch}`, (err, stdout, stderr) => {
                                        if (err) {
                                            console.log(err);
                                            core.setOutput("choreo-status", "failed");
                                            core.setFailed(err.message);
                                            return;
                                        }
                                        console.log(stdout);
                                        console.log(stderr);
                                        console.log("Completed checkout to bitbucket server repo");
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    
} catch (e) {
    core.setOutput("choreo-status", "failed");
    core.setFailed(e.message);
    console.log("choreo-status", "failed");
    console.log(e.message);
}
}

run();
