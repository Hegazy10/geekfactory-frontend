var Employee = function (n, d) {
    this.name = n;
    this.department = d;
    this.setRole('employee');
}
Employee.prototype.getInfo = function () {
    return `My name is ${this.name}. I am ${this.role} in the ${this.department} department.`;
}
Employee.prototype.setRole = function (n) {
    this.role = n;
    return this;
}

var Manager = function (n, d, r) {
    Employee.call(this, n, d);
    Employee.prototype.setRole.call(this, 'manager');
    this.reports = r;
}
Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;

Manager.prototype.getInfo = function() {
    return Employee.prototype.getInfo.call(this) + ` I manage ${this.reports} employees.`;
}



exports.Employee = Employee;
exports.Manager = Manager;