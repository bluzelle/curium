var travisArgs = process.argv.slice(2);
const { exec } = require("child_process");

function runTravisCommand(comm, cb){
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
    runTravisCommand("travis-status --pro --token " + travisArgs[0] + " --repo bluzelle/curium-test --branch devel"
    , function (result) { 
        if(result == "passed"){
            console.log("INTEGRATION TESTS PASSED")
            process.exit(0)
        }
        else if(result == "failed"){
            console.log("INTEGRATION TESTS FAILED")
            process.exit(1)
        }
        else{
            setTimeout(function(resp){
                console.log("status: " + resp)
                console.log("INTEGRATION TESTS STILL RUNNING...")
                runIntegrationTest()
            }, 10000, result)  
        }
    } );
}

runIntegrationTest()
