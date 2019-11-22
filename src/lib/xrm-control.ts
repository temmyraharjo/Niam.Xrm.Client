import { FxControl } from './interfaces/fx-control';
import { Base } from './base';

export class XrmControl extends Base implements FxControl {
    
    private controls: {attribute: string, control: Xrm.Controls.Control}[] = [];

    get(attribute: string): Xrm.Controls.Control {
        const filter = this.controls.filter(e=> e.attribute === attribute);
        if(filter.length !== 0) return filter[0].control;

        const value = this.formContext.getControl(attribute);
        this.controls.push({
            attribute,
            control: value
        });

        return value;
    }

    setVisible(attribute: string, isVisible: boolean): FxControl {
        const attr = this.get(attribute) as Xrm.Controls.StandardControl;
        if(!attr) return this;

        attr.setVisible(isVisible);

        return this;
    }

    getVisible(attribute: string): boolean {
        return this.get(attribute).getVisible();
    }
}