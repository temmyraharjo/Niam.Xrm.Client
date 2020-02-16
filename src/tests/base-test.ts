import { XrmMockGenerator } from 'xrm-mock';
import { XrmFxContext } from '../lib/interfaces/xrm-fx-context';
import { XrmFxContextImpl } from '../lib/xrm-fx-context-impl';

export class BaseTest {
    public get xrmMock() {
        return XrmMockGenerator;
    }

    constructor() {
        this.xrmMock.initialise();
    }
    
    public get eventContext() {
        return XrmMockGenerator.getEventContext();
    }

    private _context: XrmFxContext;
    public get context() {
        if(this._context == null) {
            this._context = new XrmFxContextImpl(this.eventContext);
        }

        return this._context;
    }
}