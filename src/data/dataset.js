const data = [
 {
  id: "1",
  list_title: "勉強",
  tasks: [
   {
    id: "2",
    taskTitle: "htmlの勉強",
    deadLine: "2022/7/7",
    tabsData: [
     {
      id: "6",
      type: "note",
      title: "勉強",
      contents: {
       text: "今日はHTMLの勉強をしました\n明日もHTMLの勉強をします。",
      },
     },
     {
      id: "7",
      type: "note",
      title: "ごはん",
      contents: {
       text: "今日はカレーライスを食べました。明日はハヤシライスを食べます。",
      },
     },
    ],
   },
   {
    id: "3",
    taskTitle: "cssの勉強",
    deadLine: "2022/8/30",
   },
  ],
 },
 {
  id: "4",
  list_title: "趣味",
  tasks: [
   {
    id: "5",
    taskTitle: "バドミントン",
    deadLine: "2022/7/7",
   },
  ],
 },
];

export default data;
