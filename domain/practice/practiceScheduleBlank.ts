import {PracticeScheduleView} from "@/domain/practice/practiceScheduleView";

export class PracticeScheduleBlank {
	constructor(
		public id: string | null,
		public practiceId: string,
		public groupId: string,
		public practiceLeadId: string,
		public dateStart: Date,
		public dateEnd: Date
	) {}

	public static Empty(){
		return new PracticeScheduleBlank(null, "", "", "", new Date(), new Date());
	}

	public static ConvertFromPracticeScheduleView(view: PracticeScheduleView){
		return new PracticeScheduleBlank(view.id, view.practice.value, view.group.value, view.practiceLead.value, view.dateStart, view.dateEnd);
	}
}