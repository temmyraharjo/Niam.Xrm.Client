export interface FxControl {
    get(attribute: string) : Xrm.Controls.Control;
    setVisible(attribute: string, isVisible: boolean): FxControl;
    getVisible(attribute: string): boolean;
}
