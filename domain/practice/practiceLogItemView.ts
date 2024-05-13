import {Item} from "@/domain/shared/item";

export class PracticeLogItemView {
    constructor(
        public id: string,
        public name: string,
        public grade: number | null,
        public company: Item | null,
        public contract: string | null,
        public report: string | null,

    ) {}

    public static Empty(){
        return new PracticeLogItemView("", "", null, null, null, null);
    }
}