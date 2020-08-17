import { EntityMetadata } from '@niam/xrm-client';

export type new_employee = {
  new_firstname: string;
  new_lastname: string;
  new_fullname: string;
  new_level: number;
  new_superiorid: Xrm.LookupValue[];
  new_divisionid: Xrm.LookupValue[];
}

export const new_employee = Object.freeze({
  options: {
    new_level: {
      consultant: 1,
      supervisor: 2,
      manager: 3
    }
  },
  metadata: {
    logicalName: 'new_employee',
    schemaName: 'new_employee',
    entitySetName: 'new_employees',
    attributes: [
      {
        logicalName: 'new_firstname',
        schemaName: 'new_firstname',
        attributeType: 'string'
      },
      {
        logicalName: 'new_lastname',
        schemaName: 'new_lastname',
        attributeType: 'string'
      },
      {
        logicalName: 'new_fullname',
        schemaName: 'new_fullname',
        attributeType: 'string'
      },
      {
        logicalName: 'new_level',
        schemaName: 'new_level',
        attributeType: 'picklist'
      },
      {
        logicalName: 'new_superiorid',
        schemaName: 'new_superiorid',
        attributeType: 'lookup'
      },
      {
        logicalName: 'new_divisionid',
        schemaName: 'new_divisionid',
        attributeType: 'lookup'
      },
      {
        logicalName: 'new_employeeid',
        schemaName: 'new_employeeid',
        attributeType: 'uniqueidentifier'
      },

    ]
  } as EntityMetadata
});

export const METADATA: EntityMetadata[] = [
  new_employee.metadata
];
