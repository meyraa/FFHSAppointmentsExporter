const header = encodeURIComponent("Subject, Start Date, Start Time, End Date, End Time, Location\n");

const appointmentsCollection = document.getElementsByClassName("v-table-table")[0].getElementsByTagName("tr");
const appointments = Array.prototype.slice.call(appointmentsCollection);

const csvContent = appointments.map((appointment) => {
	const columnsCollection = appointment.getElementsByTagName("td");
	const columns = Array.prototype.slice.call(columnsCollection);
	columns.pop();
	
	const content = [];
	columns.forEach(({ innerText }, index) => {
		if (index === 0 || index === 4) {
			content.push(innerText.split(",").join(" -"));
		}
		
		if (index === 1 || index === 2) {
			content.push(...innerText.split(", "));
		}
	});
	
	return content.join(",");
}).join("\n");

const link = document.createElement("a");
link.setAttribute("href", "data:attachment/csv," + header + encodeURIComponent(csvContent));
link.setAttribute("download", "MyAppointmentsGoogle.csv");
document.body.appendChild(link); // Required for FF

link.click();