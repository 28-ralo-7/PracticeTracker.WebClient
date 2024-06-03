import {Item} from "@/domain/shared/item";

export class PracticeScheduleView {
    constructor(
        public id: string,
        public practice: Item,
        public group: Item,
        public practiceLead: Item,
        public dateStart: Date,
        public dateEnd: Date
    ) {}

    public static Empty(){
        return new PracticeScheduleView("", Item.Empty(), Item.Empty(), Item.Empty(), new Date(), new Date());
    }
}