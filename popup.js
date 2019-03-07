//globall var

function downloadCSV(profiles){
  const rows = profiles;
  let csvContent = "data:text/csv;charset=utf-8,";
  rows.forEach(function(rowArray){
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
  });
  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}



function load(){

  chrome.storage.local.get(["profiles"], function(result){
    downloadCSV(result.profiles);
});
}
document.getElementById('download').onclick = load;
