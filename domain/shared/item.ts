export class Item{
    constructor(
        public value: string,
        public label: string
    ) {}

    static Empty(){
        return new Item("", "");
    }
}