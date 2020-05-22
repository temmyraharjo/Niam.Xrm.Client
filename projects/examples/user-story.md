Entity: Division
Attributes:
- new_name: string (mandatory);

Entity: Employee
Attributes:
- new_firstname: string (mandatory);
- new_lastname: string;
- new_fullname: string (readonly);
- new_superiorid: EntityReference -> Employee;
- new_level: OptionSet
  - 1: Consultant
  - 2: Supervisor
  - 3: Manager
- new_divisionid: EntityReference -> Division;

User story - Division:
create 3 records
- Developer
- Quality Assurance
- Business Analyst

User story - Employee:
1. When user set firstname or lastname, set fullname = firstname + ' ' + lastname
2. When user set level to 
   - Consultant
     a. superiorid is mandatory, filter employee.level = Supervisor
     b. divisionid is readonly
   - Supervisor
     a. superiorid is mandatory, filter employee.level = Manager
     b. divisionid is readonly
   - Manager
     a. superiorid is not-mandatory, disabled, value: null
     b. divisionid is mandatory, editable
3. When user set superiorid to value
   - null
     a. set divisionid = null
   - employee x
     a. set divisionid = x.divisionid