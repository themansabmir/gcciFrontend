export function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }

  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
}




 export const handleFileSelect = (XLSX,file, customKeys, setFileData) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      // Assuming there is only one sheet in the Excel file
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet data to array of objects
      const dataArray = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Assuming the first row contains column headers
      const headers = dataArray[0];

      // Convert data to array of objects
      const dataArrayObjects = dataArray.slice(1).map((row) => {
        const obj = {};
        customKeys.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });
      setFileData(dataArrayObjects);


      // console.log("Data Array of Objects:", dataArrayObjects);
    };

   reader.readAsBinaryString(file);

  };