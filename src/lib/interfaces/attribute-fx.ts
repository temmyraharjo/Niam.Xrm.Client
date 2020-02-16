export interface AttributeFx<T> {
    set<Field extends Extract<keyof T, 
        string>>(attributeName: Field, value: T[Field]);
    get<Field extends Extract<keyof T, 
        string>>(attributeName: string): T[Field];
}