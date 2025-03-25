const PDFDocument = require('pdfkit');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const { formModel } = require('./formController');
const FORM = require("../model/admin/formModel");
const { createModelFromForm } = require("../utils/admin");

const generateActivityPDF = async (req, res) => {
  try {
    const { activities, selectedYear, activity_name } = await req.body;

    console.log("there is error in activity if not shown",activity_name);
    const query=selectedYear==="all"?{}:{year:selectedYear}
    
    // Fetch activity count data
    let data = {};
    
    // Get count for hardcoded events
    const activityPromises = activities.map(async (activity) => {
      const model = formModel[activity];
      
      if (model) {
        const count = await model.countDocuments(query);
        data[activity] = count;
      } else {
        console.log(`Model not found for activity: ${activity}`);
        data[activity] = 0;
      }
    });
    
    await Promise.all(activityPromises);
    
    // Get count for dynamic events
    const model = await FORM.find({ category: activity_name });
    
    if (model && model.length > 0) {
      await Promise.all(model.map(async (item) => {
        const actualModel = await createModelFromForm(item);
        const count = await actualModel.countDocuments(query);
        data[item.slug] = count;
      }));
    }
    

    // Generate PDF with chart
    await createPDFWithChart(res, data, selectedYear, activity_name);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Error generating PDF' });
  }
};




const sortAndLimitActivityData = (data) => {
  // Convert to array of [name, count] pairs
  const entries = Object.entries(data);
  
  // Sort by count in descending order
  entries.sort((a, b) => b[1] - a[1]);
  
  // If there are too many activities, group smaller ones into "Others"
  const MAX_ACTIVITIES_TO_DISPLAY = 15;
  
  if (entries.length > MAX_ACTIVITIES_TO_DISPLAY) {
    const mainActivities = entries.slice(0, MAX_ACTIVITIES_TO_DISPLAY - 1);
    const otherActivities = entries.slice(MAX_ACTIVITIES_TO_DISPLAY - 1);
    
    const otherSum = otherActivities.reduce((sum, [_, count]) => sum + count, 0);
    
    // Convert back to object
    const result = Object.fromEntries(mainActivities);
    result['Others'] = otherSum;
    
    return result;
  }
  
  // Convert back to object
  return Object.fromEntries(entries);
};


const createPDFWithChart = async (res, data, selectedYear, activity_name) => {
  // Configure chart canvas with higher resolution for better clarity
  const width = 800; 
  const height = 450;
  
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ 
    width, 
    height, 
    backgroundColour: 'white'
  });
  
  // Sort and limit data for better visualization if there are many activities
  const sortedData = sortAndLimitActivityData(data);
  
  // Prepare data for chart
  const activityNames = Object.keys(sortedData);
  const activityCounts = Object.values(sortedData);
  
  // Generate colors for each bar
  const colors = generateColors(activityNames.length);
  
  // Configure chart with improved styling
  const chartConfig = {
    type: 'bar',
    data: {
      labels: activityNames,
      datasets: [{
        label: `Activities in ${selectedYear}`,
        data: activityCounts,
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      devicePixelRatio: 2,
      layout: {
        padding: {
          left: 10,
          right: 30,
          top: 20,
          bottom: 30
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          title: {
            display: true,
            text: 'Number of Activities',
            font: {
              size: 16, // Increased from 14
              weight: 'bold'
            }
          },
          ticks: {
            font: {
              size: 14 // Increased from 12
            },
            precision: 0
          }
        },
        x: {
          grid: {
            display: false
          },
          title: {
            display: true,
            text: 'Activity Names',
            font: {
              size: 16, // Increased from 14
              weight: 'bold'
            }
          },
          ticks: {
            font: {
              size: 12, // Increased from 10
            },
            maxRotation: 30, // Reduced from 45
            minRotation: 30, // Reduced from 45
            autoSkip: true,
            maxTicksLimit: 20
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: `Activity Analytics for ${activity_name} - ${selectedYear}`,
          font: {
            size: 20, // Increased from 18
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: {
              size: 14 // Increased from 12
            },
            boxWidth: 15
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 16 // Increased from 14
          },
          bodyFont: {
            size: 14 // Increased from 12
          },
          padding: 10, // Increased from 8
          callbacks: {
            label: function(context) {
              return `Count: ${context.raw}`;
            }
          }
        }
      }
    }
  };

  // Create pie chart config (now showing only highest and lowest)
  const pieChartConfig = createPieChartConfig(sortedData, selectedYear);
  
  try {
    // Generate bar chart image
    const barChartImage = await chartJSNodeCanvas.renderToBuffer(chartConfig);
    
    // Generate pie chart image
    const pieChartImage = await chartJSNodeCanvas.renderToBuffer(pieChartConfig);
    
    // Create PDF document with optimized layout
    const doc = new PDFDocument({ 
      size: 'A4', 
      margin: 50,
      bufferPages: true
    });
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=activity-analytics-${activity_name}-${selectedYear}.pdf`);
    
    // Pipe PDF to response
    doc.pipe(res);
    
    // Add content to PDF with improved layout that prevents overlapping
    addPDFContentWithNoOverlap(doc, barChartImage, pieChartImage, data, selectedYear, activity_name);
    
    // Add page numbers to all pages
    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      doc.fontSize(10).text(
        `Page ${i + 1} of ${pageCount}`,
        50,
        doc.page.height - 50,
        { align: 'center' }
      );
    }
    
    // Finalize PDF
    doc.end();
  } catch (chartError) {
    console.error('Error generating chart:', chartError);
    
    // Alternative approach: Create PDF without chart if chart generation fails
    createPDFWithoutChart(res, data, selectedYear, activity_name);
  }
};


const generateColors = (count) => {
  const backgroundColors = [];
  const borderColors = [];
  
  const baseColors = [
    [65, 105, 225],   // Royal Blue
    [0, 128, 128],    // Teal
    [70, 130, 180],   // Steel Blue
    [100, 149, 237],  // Cornflower Blue
    [30, 144, 255],   // Dodger Blue
    [0, 191, 255],    // Deep Sky Blue
    [46, 139, 87],    // Sea Green
    [60, 179, 113],   // Medium Sea Green
    [72, 61, 139],    // Dark Slate Blue
    [106, 90, 205],   // Slate Blue
    [123, 104, 238],  // Medium Slate Blue
    [147, 112, 219],  // Medium Purple
    [186, 85, 211],   // Medium Orchid
    [138, 43, 226],   // Blue Violet
    [148, 0, 211]     // Dark Violet
  ];
  
  for (let i = 0; i < count; i++) {
    const colorIndex = i % baseColors.length;
    const [r, g, b] = baseColors[colorIndex];
    
    const shade = 0.7 + (i / count) * 0.3;
    
    backgroundColors.push(`rgba(${r}, ${g}, ${b}, 0.7)`);
    borderColors.push(`rgba(${r * shade}, ${g * shade}, ${b * shade}, 1)`);
  }
  
  return {
    background: backgroundColors,
    border: borderColors
  };
};

/**
 * Darken a hex color by a given amount
 * @param {String} color - Hex color code
 * @param {Number} amount - Amount to darken (0-1)
 * @returns {String} - Darkened hex color
 */
const darkenColor = (color, amount) => {
  let hex = color.replace('#', '');
  
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  
  r = Math.max(0, Math.floor(r * (1 - amount)));
  g = Math.max(0, Math.floor(g * (1 - amount)));
  b = Math.max(0, Math.floor(b * (1 - amount)));
  
  return '#' + 
    r.toString(16).padStart(2, '0') + 
    g.toString(16).padStart(2, '0') + 
    b.toString(16).padStart(2, '0');
};

/**
 * Create pie chart configuration showing only highest and lowest activities
 * @param {Object} sortedData - Sorted activity data
 * @param {String} selectedYear - Selected year
 * @returns {Object} - ChartJS configuration object
 */
const createPieChartConfig = (sortedData, selectedYear) => {
  const activityEntries = Object.entries(sortedData);
  
  let pieData = [];
  let pieLabels = [];
  let pieColors = [];
  
  // Always include the highest activity
  const highestActivity = activityEntries[0];
  pieLabels.push(`${highestActivity[0]} (Highest)`);
  pieData.push(highestActivity[1]);
  pieColors.push('#4CAF50'); // Green for highest
  
  // Include the lowest activity (excluding "Others" if present)
  let lowestIdx = activityEntries.length - 1;
  if (activityEntries[lowestIdx][0] === 'Others' && activityEntries.length > 1) {
    lowestIdx--;
  }
  
  const lowestActivity = activityEntries[lowestIdx];
  pieLabels.push(`${lowestActivity[0]} (Lowest)`);
  pieData.push(lowestActivity[1]);
  pieColors.push('#F44336'); // Red for lowest
  
  // If there are other activities, group them as "Others"
  if (activityEntries.length > 2) {
    const otherActivities = activityEntries.slice(1, lowestIdx).concat(
      lowestIdx !== activityEntries.length - 1 ? activityEntries.slice(lowestIdx + 1) : []
    );
    
    if (otherActivities.length > 0) {
      const otherSum = otherActivities.reduce((sum, [_, count]) => sum + count, 0);
      pieLabels.push('Others');
      pieData.push(otherSum);
      pieColors.push('#9E9E9E'); // Grey for others
    }
  }
  
  return {
    type: 'pie',
    data: {
      labels: pieLabels,
      datasets: [{
        data: pieData,
        backgroundColor: pieColors,
        borderColor: pieColors.map(color => darkenColor(color, 0.1)),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      devicePixelRatio: 2,
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 20,
          bottom: 10
        }
      },
      plugins: {
        title: {
          display: true,
          text: `Activity Distribution in ${selectedYear}`,
          font: {
            size: 20, // Increased from 18
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        },
        legend: {
          display: true,
          position: 'right',
          labels: {
            font: {
              size: 14 // Increased from 10
            },
            boxWidth: 15, // Increased from 12
            padding: 12   // Increased from 10
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 16   // Increased from 12
          },
          bodyFont: {
            size: 14   // Increased from 11
          },
          padding: 12, // Increased from 8
          callbacks: {
            label: function(context) {
              const value = context.raw;
              const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
              const percentage = Math.round((value / total) * 100);
              return `Count: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  };
};


const createPDFWithoutChart = (res, data, selectedYear, activity_name) => {
  // Sort data by count in descending order
  const sortedData = sortAndLimitActivityData(data);
  const activityNames = Object.keys(sortedData);
  const activityCounts = Object.values(sortedData);
  
  // Create PDF document
  const doc = new PDFDocument({ 
    size: 'A4', 
    margin: 50,
    bufferPages: true
  });
  
  // Set response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=activity-analytics-${activity_name}-${selectedYear}.pdf`);
  
  // Pipe PDF to response
  doc.pipe(res);
  
  // Add title
  doc.font('Helvetica-Bold').fontSize(24).text(`${activity_name} Activity Report`, { align: 'center' });
  doc.moveDown();
  doc.font('Helvetica').fontSize(16).text(`Year: ${selectedYear}`, { align: 'center' });
  doc.moveDown(2);
  
  // Add text summary
  doc.font('Helvetica-Bold').fontSize(18).text('Activity Summary', { align: 'left' });
  doc.moveDown();
  
  // Create table with pagination
  createPaginatedTable(doc, activityNames, activityCounts);
  
  // Add highest and lowest activities text summary
  if (activityNames.length > 0) {
    doc.moveDown(2);
    doc.font('Helvetica-Bold').fontSize(14).text('Activity Highlights', { align: 'left' });
    doc.moveDown(0.5);
    
    // Get highest activity
    const highestActivity = activityNames[0];
    const highestCount = activityCounts[0];
    
    // Get lowest activity
    const lowestActivity = activityNames[activityNames.length - 1];
    const lowestCount = activityCounts[activityNames.length - 1];
    
    // Add summary text
    doc.font('Helvetica').fontSize(12);
    doc.text(`Highest Activity: ${highestActivity} (${highestCount} occurrences)`);
    doc.moveDown(0.5);
    doc.text(`Lowest Activity: ${lowestActivity} (${lowestCount} occurrences)`);
  }
  
  // Add footer
  doc.fillColor('black').fontSize(10).text(
    `Generated on ${new Date().toLocaleDateString()}`,
    50,
    doc.page.height - 40,
    { align: 'center' }
  );
  
  // Finalize PDF
  doc.end();
};


const createPaginatedTable = (doc, activityNames, activityCounts) => {
  const tableLeft = 100;
  const tableRight = doc.page.width - 100;
  const tableWidth = tableRight - tableLeft;
  
  // Calculate total
  const totalActivities = activityCounts.reduce((sum, count) => sum + count, 0);
  
  let currentPage = 1;
  let itemsPerPage = 20;
  let currentIndex = 0;
  
  while (currentIndex < activityNames.length) {
    if (currentIndex > 0) {
      doc.addPage();
    }
    
    // Create header row
    const headerRowHeight = 30;
    const headerY = doc.y;
    
    doc.fillColor('#05549C').rect(tableLeft - 10, headerY - 5, tableWidth + 20, headerRowHeight).fill();
    doc.fillColor('white').font('Helvetica-Bold').fontSize(12);
    doc.text('Activity Name', tableLeft, headerY + 8);
    doc.text('Count', tableLeft + tableWidth - 100, headerY + 8);
    
    // Reset for table content
    doc.fillColor('black').font('Helvetica').fontSize(12);
    
    // Add table rows
    let rowY = headerY + headerRowHeight;
    const rowHeight = 25;
    
    const endIndex = Math.min(currentIndex + itemsPerPage, activityNames.length);
    let rowCounter = 0;
    
    for (let i = currentIndex; i < endIndex; i++) {
      const name = activityNames[i];
      const count = activityCounts[i];
      
      if (rowCounter % 2 === 0) {
        doc.fillColor('#f5f5f5').rect(tableLeft - 10, rowY, tableWidth + 20, rowHeight).fill();
      }
      
      doc.fillColor('black');
      const displayName = name.length > 30 ? name.substring(0, 27) + '...' : name;
      doc.text(displayName, tableLeft, rowY + 7);
      doc.text(count.toString(), tableLeft + tableWidth - 100, rowY + 7);
      
      rowY += rowHeight;
      rowCounter++;
    }
    
    // Add total row on the last page
    if (endIndex === activityNames.length) {
      doc.fillColor('#05549C').rect(tableLeft - 10, rowY, tableWidth + 20, rowHeight).fill();
      doc.fillColor('white').font('Helvetica-Bold').fontSize(12);
      doc.text('Total Activities', tableLeft, rowY + 7);
      doc.text(totalActivities.toString(), tableLeft + tableWidth - 100, rowY + 7);
    }
    
    currentIndex = endIndex;
    currentPage++;
  }
};

const addPDFContentWithNoOverlap = (doc, barChartImage, pieChartImage, data, selectedYear, activity_name) => {
  // Sort data by activity count
  const sortedData = sortAndLimitActivityData(data);
  const activityNames = Object.keys(sortedData);
  const activityCounts = Object.values(sortedData);

  // Add title
  doc.font('Helvetica-Bold').fontSize(18).text(`${activity_name} Activity Report`, { align: 'center' });
  doc.moveDown(0.5);
  doc.font('Helvetica').fontSize(14).text(`Year: ${selectedYear}`, { align: 'center' });
  doc.moveDown(1);

  // --------- BAR CHART SECTION ---------
  const chartStartY = doc.y;
  const chartHeight = 180;
  
  doc.rect(50, chartStartY, doc.page.width - 100, chartHeight).stroke();
  doc.image(barChartImage, 55, chartStartY + 5, {
    fit: [doc.page.width - 110, chartHeight - 10],
    align: 'center',
    valign: 'center'
  });
  
  // --------- PIE CHART SECTION ---------
  const pieChartStartY = chartStartY + chartHeight + 20;
  
  doc.font('Helvetica-Bold').fontSize(14).text('Activity Distribution', 50, pieChartStartY);
  doc.moveDown(0.5);
  
  const pieChartHeight = 180;
  doc.rect(50, pieChartStartY + 20, doc.page.width - 100, pieChartHeight).stroke();
  doc.image(pieChartImage, 55, pieChartStartY + 25, {
    fit: [doc.page.width - 110, pieChartHeight - 10],
    align: 'center',
    valign: 'center'
  });
  
  // --------- HIGHEST/LOWEST SUMMARY ---------
  const summaryY = pieChartStartY + pieChartHeight + 25;
  doc.font('Helvetica-Bold').fontSize(12).text('Activity Highlights', 50, summaryY);
  
  const highestActivity = activityNames[0];
  const highestCount = activityCounts[0];
  
  let lowestIdx = activityNames.length - 1;
  if (activityNames[lowestIdx] === 'Others' && activityNames.length > 1) {
    lowestIdx--;
  }
  const lowestActivity = activityNames[lowestIdx];
  const lowestCount = activityCounts[lowestIdx];
  
  doc.font('Helvetica').fontSize(10);
  doc.text(`Highest Activity: `, 60, summaryY + 20);
  doc.font('Helvetica-Bold');
  doc.text(`${highestActivity}`, 140, summaryY + 20);
  doc.font('Helvetica');
  doc.text(`(${highestCount} Activites)`, 140, summaryY + 35);
  
  doc.text(`Lowest Activity: `, 300, summaryY + 20);
  doc.font('Helvetica-Bold');
  doc.text(`${lowestActivity}`, 380, summaryY + 20);
  doc.font('Helvetica');
  doc.text(`(${lowestCount} Activities)`, 380, summaryY + 35);
  
  // --------- TABLE SECTION ---------
  if (summaryY + 60 > doc.page.height - 150) {
    doc.addPage();
    doc.font('Helvetica-Bold').fontSize(14).text('Activity Summary',50, doc.y,  { align: 'left' });
    doc.moveDown(0.5);
  } else {
    doc.y = summaryY + 60;
    doc.font('Helvetica-Bold').fontSize(14).text('Activity Summary',50, doc.y,  { align: 'left' });
    doc.moveDown(0.5);
  }
  
  const tableStartY = doc.y;
  const availableHeight = doc.page.height - tableStartY - 60;
  
  const rowHeight = 20;
  const headerHeight = 25;
  const totalRowHeight = 20;
  
  const maxRowsOnFirstPage = Math.floor(
    (availableHeight - headerHeight - totalRowHeight) / rowHeight
  );
  
  if (activityNames.length <= maxRowsOnFirstPage) {
    createActivityTable(doc, activityNames, activityCounts, 0, activityNames.length);
  } else {
    createPartialActivityTable(doc, activityNames, activityCounts, 0, maxRowsOnFirstPage, false);
    
    let currentIndex = maxRowsOnFirstPage;
    while (currentIndex < activityNames.length) {
      doc.addPage();
      
      const isLastPage = (currentIndex + 30 >= activityNames.length);
      const rowsPerPage = Math.min(30, activityNames.length - currentIndex);
      
      createPartialActivityTable(
        doc, 
        activityNames, 
        activityCounts, 
        currentIndex, 
        rowsPerPage, 
        isLastPage
      );
      
      currentIndex += rowsPerPage;
    }
  }
  
  doc.fillColor('black').fontSize(10).text(
    `Generated on ${new Date().toLocaleDateString()}`,
    50,
    doc.page.height - 40,
    { align: 'center' }
  );
};


const createActivityTable = (doc, activityNames, activityCounts, startIndex, count) => {
  createPartialActivityTable(doc, activityNames, activityCounts, startIndex, count, true);
};


const createPartialActivityTable = (doc, activityNames, activityCounts, startIndex, count, includeTotalRow) => {
  const tableLeft = 80;
  const tableRight = doc.page.width - 80;
  const tableWidth = tableRight - tableLeft;
  
  const endIndex = Math.min(startIndex + count, activityNames.length);
  
  if (startIndex > 0) {
    doc.font('Helvetica-Oblique').fontSize(10).text('(Continued from previous page)', { align: 'left' });
    doc.moveDown(0.5);
  }
  
  const headerRowHeight = 25;
  const headerY = doc.y;
  
  doc.fillColor('#05549C').rect(tableLeft - 10, headerY - 5, tableWidth + 20, headerRowHeight).fill();
  doc.fillColor('white').font('Helvetica-Bold').fontSize(10);
  doc.text('Activity Name', tableLeft, headerY + 6);
  doc.text('Count', tableLeft + tableWidth - 60, headerY + 6);
  
  doc.fillColor('black').font('Helvetica').fontSize(10);
  
  let rowY = headerY + headerRowHeight;
  const rowHeight = 20;
  
  for (let i = startIndex; i < endIndex; i++) {
    const name = activityNames[i];
    const count = activityCounts[i];
    
    if ((i - startIndex) % 2 === 0) {
      doc.fillColor('#f5f5f5').rect(tableLeft - 10, rowY, tableWidth + 20, rowHeight).fill();
    }
    
    doc.fillColor('black');
    const displayName = name.length > 40 ? name.substring(0, 37) + '...' : name;
    doc.text(displayName, tableLeft, rowY + 5);
    doc.text(count.toString(), tableLeft + tableWidth - 60, rowY + 5);
    
    rowY += rowHeight;
  }
  
  if (includeTotalRow) {
    const totalActivities = activityCounts.reduce((sum, count) => sum + count, 0);
    
    doc.fillColor('#05549C').rect(tableLeft - 10, rowY, tableWidth + 20, rowHeight).fill();
    doc.fillColor('white').font('Helvetica-Bold').fontSize(10);
    doc.text('Total Activities', tableLeft, rowY + 5);
    doc.text(totalActivities.toString(), tableLeft + tableWidth - 60, rowY + 5);
  }
};

module.exports = { generateActivityPDF };


