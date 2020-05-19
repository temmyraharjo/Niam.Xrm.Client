import { createHandler } from '@niam/xrm-client';
import { Employee } from '../../entities';

export const loaded = createHandler<Employee>(fx => {
  console.log('My.Company.Employee.formLoaded executed.');
});
