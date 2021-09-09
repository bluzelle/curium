#!/usr/bin/env zx
import {$, cd} from 'zx';

const deployCurium = () => {
    Promise.resolve()
    .then(() => $`git remote add temporary-remote-curium git@github.com:bluzelle/curium.git`)
    .then(() => $`git checkout -b deploy-curium`)
    .then(() => cd('../../'))
    .then(() => $`git filter-branch -f --tree-filter 'rm -rf curium/scripts/deploy.ts' HEAD`)
    .then(() => $`git filter-branch -f \
    --subdirectory-filter curium/ \
    --prune-empty \
    --tag-name-filter cat -- --all`)
    .then(() => $`git push -f temporary-remote-curium devel`)
    .then(() => $`git fetch`)
    .then(() => $`git checkout origin/devel`)
    .then(() => $`git branch -f devel`)
    .then(() => $`git checkout devel`)
    .then(() => $`git branch -D deploy-curium`)
    .then(() => $`git remote remove temporary-remote-curium`)
    .catch(error => {
        console.log(`SOMETHING WENT WRONG: ${error.message}`)
        process.exit(1)
    })
}

deployCurium()