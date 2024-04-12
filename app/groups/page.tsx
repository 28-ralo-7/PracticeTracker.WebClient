import 'bootstrap/dist/css/bootstrap.css';
import '../../public/college_logo.png';

export default function GroupPage() {

    const groups = [
            {id: "1", name: "400"},
        {id: "2", name: "401"},
        {id: "3", name: "402"},
        {id: "4", name: "403"},
        {id: "5", name: "404"},
        {id: "6", name: "405"},
        {id: "7", name: "406"},
        {id: "8", name: "407"},
        {id: "9", name: "408"},
        {id: "10", name: "409"},
        {id: "11", name: "410"},
        {id: "12", name: "411"},
        {id: "13", name: "412"},
        {id: "14", name: "413"},
        {id: "15", name: "414"},
        {id: "16", name: "415"},
        {id: "17", name: "416"},
        {id: "18", name: "417"},
        {id: "19", name: "418"},
        {id: "20", name: "419"},
        {id: "21", name: "420"},
        {id: "22", name: "421"},
        {id: "23", name: "422"},
        {id: "24", name: "423"},
        {id: "25", name: "424"},
        {id: "26", name: "425"},
        {id: "27", name: "426"},
        {id: "28", name: "427"},
        {id: "29", name: "428"},
        {id: "30", name: "429"},
        {id: "31", name: "430"},
        {id: "32", name: "431"},
        {id: "33", name: "432"},
        {id: "34", name: "433"},
        {id: "35", name: "434"},
        {id: "36", name: "435"},
        {id: "37", name: "436"},
        {id: "38", name: "437"},
        {id: "39", name: "438"},
        {id: "40", name: "439"},
        {id: "41", name: "440"},
        {id: "42", name: "441"},
        {id: "43", name: "442"},
        {id: "44", name: "443"},
        {id: "45", name: "444"},
        {id: "46", name: "445"},
        {id: "47", name: "446"},
        {id: "48", name: "447"},
        {id: "49", name: "448"},
        {id: "50", name: "449"},
        {id: "51", name: "450"},
        {id: "52", name: "451"},
        {id: "53", name: "452"},
        {id: "54", name: "453"},
        {id: "55", name: "454"},
        {id: "56", name: "455"},
        {id: "57", name: "456"},
        {id: "58", name: "457"},
        {id: "59", name: "458"},
        {id: "60", name: "459"},
        ];

    return (
        <div className={"w-75 h-75 position-absolute top-50 start-50 translate-middle bg-white rounded-3 overflow-auto"}>
            <div className={"card-body p-3 text-center"}>
                <h2 style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>Группы</h2>
                <div className="row d-flex justify-content-center">
                    {groups.map((group, index) => (
                        index % 10 === 0 && (
                            <div key={index} className="col-4 mb-5">
                                {groups.slice(index, index + 10).map(group => (
                                    <a className="d-block fs-3 text-black btn btn-primary m-1 text-white" key={group.id} href={`/practice?groupid=${group.id}`}>{group.name}</a>
                                ))}
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}
