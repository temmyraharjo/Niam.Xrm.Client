export type Employee = {
  new_firstname: string;
  new_lastname: string;
  new_fullname: string;
  new_level: number;
  new_superiorid: Xrm.LookupValue[];
  new_divisionid: Xrm.LookupValue[];
}

export const Employee = Object.freeze({
  options: {
    new_level: {
      consultant: 1,
      supervisor: 2,
      manager: 3
    }
  }
});
