import {Item} from "@/domain/shared/item";

export class UserSettingView {
    constructor(
        public id: string,
        public fullName: string,
        public login: string,
        public role: Item | null,
        public group: Item | null,
    ) {}

    public static Empty(){
        return new UserSettingView("", "", "", null, null);
    }
}