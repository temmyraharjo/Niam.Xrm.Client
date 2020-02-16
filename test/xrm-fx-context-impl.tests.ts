import { XrmMockGenerator } from 'xrm-mock';
import { XrmFxContextImpl } from '../src/lib/xrm-fx-context-impl';

describe('XrmFxContextImpl Tests', () => {
  beforeEach(() => {
    XrmMockGenerator.initialise();
  });
  
  it('XrmFxContextImpl Created', () => {
    let context = new XrmFxContextImpl(XrmMockGenerator.getEventContext());
    expect(context).toBeDefined();
    let formContext = context.formContext;
    expect(formContext).toBeDefined();
  });
});
