import {Item} from "@/domain/shared/item";
import {PracticeLogItemView} from "@/domain/practice/practiceLogItemView";

export class PracticeLogView {
    constructor(
        public id: string,
        public name: string,
        public group: Item,
        public logItems: PracticeLogItemView[]
    ) {}

    public static Empty(){
        return new PracticeLogView("", "", Item.Empty(), []);
    }
}