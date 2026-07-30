window.document.addEventListener("DOMContentLoaded", () => {
  const csvFileInput = document.getElementById("csv-file-input");
  const selectCsvFileButton = document.getElementById("select-csv-file-btn");
  const csvFilterSelect = document.getElementById("csv-filter-select");

  selectCsvFileButton.addEventListener("click", () => {
    csvFileInput.click();
  });

  csvFileInput.addEventListener("change", (event) => {
    const csvFile = event.target.files[0];
    if (!csvFile) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const { headers, tableData } = convertCsv(text);
      csvFilterSelect.style.visibility = "visible";
      for (const header of headers) {
        csvFilterSelect.add(new Option(header, header));
      }
    };
    reader.readAsText(csvFile);
  });

  function convertCsv(text) {
    const lines = text.split("\r\n");
    const tableData = lines.map((line) => line.split(","));
    return {
      headers: tableData[0],
      data: tableData.slice(0, tableData.length - 1),
    };
  }
});
