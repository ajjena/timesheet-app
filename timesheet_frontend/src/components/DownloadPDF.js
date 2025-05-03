import jsPDF from "jspdf";

function getDateForRow(startDate, index) {
    const baseDate = new Date(startDate);
    if (isNaN(baseDate)) return ""; // return blank if invalid
  
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + index);
    return date.toLocaleDateString("en-AU", {
      weekday: "short",
      day: "2-digit",
      month: "short"
    });
}

function DownloadPDF({ employeeName, startDate, timesheet, week1Total, week2Total }) {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Timesheet Summary", 20, 20);

    doc.setFontSize(12);
    doc.text(`Employee: ${employeeName}`, 20, 30);
    doc.text(`Start Date: ${startDate}`, 20, 40);

    let x_coord = 20;
    let y_coord = 50;
    timesheet.forEach((row, i) => {
        if (row.hoursWorked > 0) {
            const line = `${getDateForRow(startDate, i)} — ${row.startTime} to ${row.endTime}, Break: ${row.break_time}h, Worked: ${row.hoursWorked}h`;
            doc.text(line, x_coord, y_coord);
            y_coord += 10;
        }
    });

    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL HOURS: ${week1Total + week2Total} hours`, 20, 50 + timesheet.length * 10);

    doc.setFont("helvetica", "normal");
    doc.text(`Total Week 1: ${week1Total} hours`, 20, 60 + timesheet.length * 10);
    doc.text(`Total Week 2: ${week2Total} hours`, 20, 70 + timesheet.length * 10);

    doc.save(`Timesheet_${employeeName}_${startDate}.pdf`);
  };

  return <button 
    style={{
        padding: "10px 18px",
        fontSize: "14px",
        marginTop: "16px" // space between totals and button
    }}
    onClick={handleDownload}>Download PDF
    </button>;
}

export default DownloadPDF;