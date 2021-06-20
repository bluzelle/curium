fetch("./dynamic-data.json")
    .then(x => x.json())
    .then(time => document.querySelector("#now").innerHTML = time.now)