// Your code here
function createEmployeeRecord(rawArray) {
    return {
        firstName: rawArray[0],
        familyName: rawArray[1],
        title: rawArray[2],
        payPerHour: rawArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(records){
    return records.map(function(record) {
        return createEmployeeRecord(record);
    });
}

function createTimeInEvent(emp, dateStamp) {
    const eventInfo = dateStamp.split(" ");
    const event = {
        type: "TimeIn",
        hour: parseInt(eventInfo[1]),
        date: eventInfo[0]
    };
    emp.timeInEvents.push(event);
    return emp;
}

function createTimeOutEvent(emp, dateStamp) {
    const eventInfo = dateStamp.split(" ");
    const event = {
        type: "TimeOut",
        hour: parseInt(eventInfo[1]),
        date: eventInfo[0]
    };
    emp.timeOutEvents.push(event);
    return emp;
}

function hoursWorkedOnDate(emp, date) {
    const timeIn = emp.timeInEvents.find(tIE => tIE.date === date)
    const timeOut = emp.timeOutEvents.find(tOE => tOE.date === date)
    return timeOut.hour/100 - timeIn.hour/100;
}

function wagesEarnedOnDate(emp, date) {
    const hours = hoursWorkedOnDate(emp, date);
    const wage = hours * emp.payPerHour;
    return wage;
}

function allWagesFor(employee) {
    const payDates = employee.timeInEvents.map(function(event){
        return event.date
    })
    const totalPay = payDates.reduce(function(sum, addend) {
        return sum + wagesEarnedOnDate(employee, addend)
    }, 0)
    return totalPay
}

function calculatePayroll(recordsArray) {
    return recordsArray.reduce(function(total, individual){
        return total += allWagesFor(individual)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(record){
        return record.firstName === firstName
    })
}