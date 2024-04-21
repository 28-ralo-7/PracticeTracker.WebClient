import {Error} from "@/domain/Error";

export class Response{
    constructor(
        public data: any,
        public errors: Error[],
        public isSuccess: boolean,
        public isFailed: boolean,
    ) {}
}