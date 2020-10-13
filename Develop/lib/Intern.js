// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
class Intern {
    constructor (name, id, email) {
        super(name, id, email);
        this.school = school;
    }

    getSchool(){
        return this.school;
    }

    getRole() {
        return "Intern";
    }
}

module.exports = Manager;