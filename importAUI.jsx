var bookDoc = app.activeDocument;
var bookStory = bookDoc.xmlElements[0].xmlElements;
var auiDoc = app.documents[1];
var auiStory = auiDoc.xmlElements[0].xmlElements;

var auiCount = 0;

for(i=0; i < bookStory.length; i++){
    if(bookStory[i].markupTag.name == "category"){
        
       var bookCategory = bookStory[i].contents;
       while(auiStory[auiCount].markupTag.name == "category"){
                
            var auiCategory = auiStory[auiCount].contents;
                 
            if(bookCategory.localeCompare(auiCategory) == 1){
                do {
                    var newElement = bookStory.add(auiStory[auiCount].markupTag.name);
                    $.write(auiStory[auiCount].contents + "\n");
                    newElement.contents = auiStory[auiCount].contents;               
                    var movedElement = newElement.move(LocationOptions.BEFORE, bookStory[i]);
                    movedElement.insertTextAsContent("\r    ", XMLElementPosition.BEFORE_ELEMENT);
                    i++;
                    auiCount++;
                } while (auiStory[auiCount].markupTag.name != "category");
            } else {
                 break;
            }
        }
    }
}
bookDoc.mapXMLTagsToStyles();
