
function addNode() {
    console.log('add node');
    let node = document.createElement("INPUT");
    let root = document.getElementById("timeslot");
    node.classList.add("form-control");
    node.classList.add("form-control-sm");
    node.classList.add("input-sm");
    node.classList.add("col-sm-4");
    node.setAttribute("type", "time");
    root.appendChild(node);
}