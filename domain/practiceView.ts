export class PracticeView {
    constructor(
        public id: string,
        public name: string
    ) {}

    public static EmptyFailed(){
        return new PracticeView('', '');
    }
}