export class Result{
    constructor(
        public data: any,
        public errors: string[],
        public isSuccess: boolean,
        public isFailed: boolean,
    ) {}

    public static EmptyFailed(){
        return new Result(null, [], false, true);
    }
}