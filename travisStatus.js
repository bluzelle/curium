// var stream = require('stream');
// var travisStatusCmd = require('travis-status/bin/travis-status');

// var options = {
//   // Redirect input/output streams (defaults to process.stdin, stdout, stderr)
//   in: new stream.PassThrough(),
//   out: new stream.PassThrough(),
//   err: new stream.PassThrough()
// };
// travisStatusCmd(['node', 'travis-status', '--pro', '--token', travisArgs[0], 
//     '--repo', 'bluzelle/curium-test', '--branch', 'task/milagan/cm-89', '--fail-pending'], options, function(err, exitCode) {
//   if (err) { console.error(err); }
//   process.exit(exitCode);
// });

var travisArgs = process.argv.slice(2);
const { exec } = require("child_process");

function runTravisCommand(comm, cb){
    exec(comm, (error, stdout, stderr) => {
        console.log("Current Status of Integration Tests: " + stdout)
    });
    exec(comm, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return -1;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return -1;
        }

        resp = `${stdout}`

        if(resp.includes("passed")){
            cb("passed")
        }
        else if (resp.includes("failed")){
            cb("failed")
        }
        else{
            cb("pending")
        }
    });
}

function runIntegrationTest(){
    runTravisCommand("node node_modules/travis-status --pro --token " + travisArgs[0] + " --repo bluzelle/curium-test --branch task/milagan/cm-89"
    , function (result) { 

        setTimeout(function(resp){
            if(resp == "passed"){
                console.log("INTEGRATION TESTS PASSED")
                process.exit(0)
            }
            else if(resp == "failed"){
                console.log("INTEGRATION TESTS FAILED")
                process.exit(1)
            }
            console.log("status: " + resp)
            console.log("INTEGRATION TESTS STILL RUNNING...")
            runIntegrationTest()
        }, 10000, result)  

    } );
}

runIntegrationTest()
