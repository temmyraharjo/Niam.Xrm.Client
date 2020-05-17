export type Employee = {
  new_firstname: string;
  new_lastname: string;
  new_fullname: string;
  new_superiorid: Xrm.LookupValue[];
  new_divisionid: Xrm.LookupValue[];
}