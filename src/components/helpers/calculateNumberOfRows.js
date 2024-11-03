//  ex :  const pageSize = matches ? calculateNumberOfRows(250, 54) : calculateNumberOfRows(300, 63)
export const calculateNumberOfRows = (minisSpace, rowHeight) => {
  const viewportHeight = window.innerHeight;
  const tableHeight = viewportHeight - minisSpace; // Subtract 200 pixels from the viewport height
  const numberOfRows = Math.floor(tableHeight / rowHeight);

  return numberOfRows;
}

// for scrollable table
// largeHeight={calculateHeightOfTable(350)}
// smallHeight={calculateHeightOfTable(300)}

export const calculateHeightOfTable = (minisSpace) => {
  const viewportHeight = window.innerHeight;
  const tableHeight = viewportHeight - minisSpace; // Subtract 200 pixels from the viewport height

  return tableHeight;
}


export const calculateHeightOfTableVH = (vhPercentage) => {
  const viewportHeight = window.innerHeight;
  const tableHeight = (vhPercentage / 100) * viewportHeight;

  return tableHeight;
};



export const calculateWidthOfTable = (minisSpace, percentage = 100) => {
  const viewportWidth = window.innerWidth;
  const tableWidth = (viewportWidth - minisSpace) * (percentage / 100); // Subtract minisSpace pixels and convert to percentage

  return tableWidth;
};
