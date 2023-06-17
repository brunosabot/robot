export default interface NotionEisenhowerResponse {
  object: string;
  results: {
    object: string;
    properties: {
      Assign: {
        id: string;
        type: "people";
        people: any[];
      };
      Date: {
        id: string;
        type: "date";
        date: null;
      };
      Eisenhower: {
        id: string;
        type: "status";
        status: {
          id: string;
          name: string;
          color: string;
        };
      };
      Name: {
        id: string;
        type: "title";
        title: {
          type: "text";
          text: {
            content: string;
            link: null;
          };
          annotations: {
            bold: false;
            italic: false;
            strikethrough: false;
            underline: false;
            code: false;
            color: "default";
          };
          plain_text: string;
          href: null;
        }[];
      };
    };
  }[];
}
