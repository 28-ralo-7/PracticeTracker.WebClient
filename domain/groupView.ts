export class GroupView {
    constructor(
        public id: string,
        public name: string
    ) {}

    public static EmptyFailed(){
        return new GroupView('', '');
    }
}