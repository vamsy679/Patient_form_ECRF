import { type } from "@testing-library/user-event/dist/type";

class Helper {

    static FieldTypes = () => {
        let options = [
            {
                label: "Paragraph",
                value: "Textarea",
            },
            {
                label: "Multichoice",
                value: "Checkbox",
            },
    
            {
                label: "Radio ",
                value: "Radio",
            },
            {
                label: "Range ",
                value: "Range",
            },
        ];
    
       return options
    }
    

    static permission = () => {
        let options = [
           
            {
                label: "Admin",
                value: "Admin",
            },
            
            {
                label: "Researcher",
                value: "Researcher",
            },
    
            {
                label: "Intern ",
                value: "Intern",
            },
        ];
    
       return options
    }

    static replaceType = (type) => {
        switch (type) {
            case "Textarea":
                type = "free-text-string";
              break;
            case "Checkbox":
                type = "check-boxes";
              break;
            case "Radio":
                type = "radio-buttons";
              break;
            case "Range":
                type = "scale";
              break;
          }
    
       return type
    }

  }
  
  export default Helper;