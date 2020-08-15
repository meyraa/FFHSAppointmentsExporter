// INFO: German header
// const header = encodeURIComponent("Betreff, Beginnt am, Beginnt um, Erinnerung am, Erinnerung um, Endet am, Endet um, Ort, Vertraulichkeit, Kategorien, Erinnerung Ein/Aus\n");

// INFO: English Header
const header = encodeURIComponent("Subject, Start Date, Start Time, Reminder Date, Reminder Time, End Date, End Time, Location, Private, Categories, Reminder On/Off\n");

const reminderHoursBeforeBegin = 2;
const category = "FFHS";
const privateYesNo = "YES"; // German header: value = 'Privat'
const reminderOnOff = "TRUE"; // German header: value = 'EIN/AUS'

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
			const [date, time] = innerText.split(", ");
			content.push(date);
			content.push(time);

			if (index === 1) {
				content.push(date);
				const [hours, minutes] = time.split(":");
				const hourToRemind = hours - reminderHoursBeforeBegin;
				const reminder = hourToRemind + ":" + minutes;
				content.push(reminder);
			}
		}
	});

	const staticValues = [privateYesNo, category, reminderOnOff];
	content.push(...staticValues)
	return content.join(",");
}).join("\n");

const link = document.createElement("a");
link.setAttribute("href", "data:attachment/csv," + header + encodeURIComponent(csvContent));
link.setAttribute("download", "MyAppointmentsOutlook.csv");
document.body.appendChild(link); // Required for FF

link.click();