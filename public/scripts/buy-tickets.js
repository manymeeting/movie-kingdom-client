
function getTicketNumber() {
    let t = document.getElementById('ticketnumber');
    let p = document.getElementById('totalprice');
    let ticNum = Number(t.value);
    p.value = (ticNum * 12).toFixed(2);
    console.log(typeof p.value, p.value);
}
