import {Item} from "@/domain/shared/item";
import {UserSettingView} from "@/domain/user/userSettingView";

export class UserBlank {
    constructor(
        public id: string | null,
        public surname: string | null,
        public name: string | null,
        public patronymic: string | null,
        public login: string | null,
        public password: string | null,
        public roleId: string | null,
        public groupId: string | null,
    ) {}

    public static Empty(){
        return new UserBlank(null, "", "", null, "", "", "1", null);
    }

    public static ConvertFromUserSettingView(user: UserSettingView)
    {
        const surname = user.fullName.split(" ")[0];
        const name = user.fullName.split(" ")[1];
        const patronymic =  user.fullName.split(" ")[2];

        return new UserBlank(user.id, surname, name, patronymic, user.login, null, user.role?.value ?? null, user.group?.value ?? null);
    }
}