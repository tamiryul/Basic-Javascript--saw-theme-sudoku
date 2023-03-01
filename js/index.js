///////ניצור לוחות משחק ב-3 רמות שונות
const easy = [
    "53--7----6--195----98----6-8---6---34--8-3--17---2---6-6----28----419--5----8--79",
    "534678912672195348198342567859761423426853791713924856961537284287419635345286179"
];

const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];

const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];

////////////ניצור משתנים
var timer;////////////טיימר
var timeRemaining;///////הערך של הטיימר מפורק לשניות
var lives;////////יצירת כמות חיים
var selectedNum;////////המספר שנבחר מתוך תיבת המספרים
var selectedTile;////////////המיקום בלוח אליו נרצה למקם את המספר הנבחר
var disableSelect;

////////////////////////////////////פונקציות עזרה וקיצור דרך
/////ניצור קיצור דרך כדי לקבל אלמנטים ע"י ID
function id (id) {
    return document.getElementById(id)
};  

////////בחירת תא
function qs (selector) {
    return document.querySelector(selector)
};

//////בחירת כל התאים יחד
function qsa (selector) {
    return document.querySelectorAll(selector)
};


///////////////ניצור פונקציה לכפתור התחל מחדש
window.onload = function() {
    id("start-btn").addEventListener("click" , startGame);
    /////נוסיף פעולה בכל פעם שנקיש על ספרה בתיבת הספרות
    for (let n = 0 ; n < id("number-container").children.length ; n++ ) {
        id("number-container").children[n].addEventListener("click" , function() {
            if (!disableSelect) {
            ////נבטל בחירה קודמת
                if (this.classList.contains("selected")) {//////אם מספר כבר נבחר
                    this.classList.remove("selected");//////תמחק את הבחירה
                    selectedNum = null;
                }
                else {
                        for (let h = 0 ; h < 9 ; h++) {
                            id("number-container").children[h].classList.remove("selected");
                        }
                            //תבחר את הבחירה שלי ותעדכן את בחירת המספרים
                            this.classList.add("selected");
                            selectedNum = this;
                            // selectedNum = this.classList.add("selected");
                            updateMove();
                }
                
            }
        })
    }
}

function startGame() {
    let board
//////נבחר רמת משחק
    if (id("diff-1").checked) board = easy[0];/////המערך מוגדר מ-2 רצועות, 0 היא הראשונה 
    else if (id("diff-2").checked) board = medium[0];
    else board = hard[0];
    lives = 3; ///////נגדיר את כמות החיים ל-3
    disableSelect = false;//////ברגע שהחיים לא שווים ל-3 בעצם המשחק נגמר
    id("lives").textContent = "Lives Remaining: " + lives;////נציג את כמות החיים שנותרו
    generateBoard (board);
    //////הפעלת טיימר
    startTimer();
    /////יראה את תיבת הספרות
    id("number-container").classList.remove("hidden");
}

///ניצור פונקציה להתחלת הטיימר
function startTimer() {
    ////////נגדיר את הטיימר לפי בחירה
    if (id("time-1").checked) timeRemaining = 180;
    else if (id("time-2").checked) timeRemaining = 300;
    else timeRemaining = 600;
    ///// נגדיר טיימר לשניה הראשונה
    id("timer").textContent = timeConversion (timeRemaining);
    timer = setInterval(function() {
        timeRemaining --;
        if (timeRemaining == 0) endGame();//////אם לא נשאר זמן המשחק נגמר
        id("timer").textContent = timeConversion(timeRemaining);
    }, 1000)
}

////ניצור פונקציה אשר עושה המרה של השניות לדקות
function timeConversion (time) {
    let minutes = Math.floor(time /60);
    if (minutes < 10) minutes = "0" + minutes;
    let seconds = time % 60;
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}

/////////////////////////ניצור פונקציה ליצירת לוח המשחק המלא
function generateBoard (board) {
    clearPrevious();///ניקוי לוח קודם
    let idCount = 0;/////ניצור 81 תאים
    for(let t = 0 ; t < 81 ; t++){
       let tile = document.createElement("p"); ////ייצור כל תא כאלמנט מסוג פיסקה-P
       if (board.charAt(t) != "-") {////אם אמור להיות סיפרה בתא 
          tile.textContent = board.charAt(t);
        }
        else {
              tile.addEventListener("click" , function() {/////במידה ואין ספרה נוסיף חלל ריק
                  if(!disableSelect) {
                    if (tile.classList.contains("selected")) {/////אם התא נבחר
                          tile.classList.remove("selected");//////תסיר בחירה קודמת
                          selectedTile = null;
                    } 
                    else {
                        for ( let d = 0 ; d < 81 ; d++) {////////נבטל בחירה של כל התאים
                            qsa(".tile")[d].classList.remove("selected");
                        }
                        /////נוסיף בחירה ונעדכן את הבחירה
                        tile.classList.add("selected");
                        selectedTile = tile;
                        updateMove();
                    }     
                    
                      
                  }
              });
        }
       
       tile.id = idCount;/////ייתן לתא זהות
       idCount++;////יעבור לתא הבא
       tile.classList.add("tile");////ייתן לכל תא זהות
       ////////ניצור גבולות בולטים לתאי המשחק
       if ((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54)) {
           tile.classList.add("bottomBorder");
       }
       if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 ==6) {////יש להתחיל את האינדקס ממקום 1 ולא 0
           tile.classList.add("rightBorder");
       }
       /////נוסיף תאים ללוח
       id("board").appendChild(tile);
    }
}

/////ניצור פונקציית עדכון מהלך אשר תגרום לבחירת ספרה להופיע בלוח המשחק
function updateMove() {
    if (selectedTile && selectedNum) {
        selectedTile.textContent = selectedNum.textContent;
        if (checkCorrect(selectedTile)) {/////אם הספרה תואמת לפתרון
            selectedTile.classList.remove("selected");/////תבטל בחירת תאים
            selectedNum.classList.remove("selected");
            selectedNum = null;//////תרענן את המשתנים
            selectedTile = null;
            if (checkDone()) {/////יבדוק האם הלוח מלא
                endGame();
            }
        } 
        else {//////ובמידה והספרה לא תואמת לפתרון
            disableSelect = true;/////תגרום לתא להיצבע באדום
            selectedTile.classList.add("incorrect");
            setTimeout(function() {////במקרה של שגיאה הוא יראה את הספרה למשך שניה ואז ימחק אותה
                    /////אם החיים שווים ל-0 תסיים את המשחק, אחרת תעדכן אותם
                    lives --;
                    if (lives == 0) {
                        endGame();
                    } 
                    else {/////אם החיים לא שווים ל-0
                        id("lives").textContent = "Lives Remaining: " + lives;
                        disableSelect = false;
                    }
                    selectedTile.classList.remove("incorrect");/////יסיר את הצבע האדום
                    selectedTile.classList.remove("selected");////ויסיר את הבחירה משני הלוחות: הספרות והלוח
                    selectedNum.classList.remove("selected");
                    selectedTile.textContent = "";
                    selectedTile.classList.textContent = "selected";/////מסיר את הספרה מהתא הנבחר
                    selectedTile = null;///////ומבטל בחירה בספרה
                    selectedNum = null;
            }, 1000);
        }
    }
}

//////ניצור פונקציית בדיקה לסיום
function checkDone() {
    let tiles = qsa(".tile");
    for (let w = 0 ; w < tiles.length ; w++) {
        if (tiles[w].textContent == "") return false;/////אם חלק מהתאים ריקים, תחזיר שקר
    }
    return true;//////אחרת תחזיר נכון
}

////ניצור פונקציית לסיום המשחק
function endGame() {
    disableSelect = true;
    clearTimeout(timer);
    //// תציג האם קיים ניצחון או הפסד
    if (lives == 0 || timeRemaining == 0) {
        window.location = "./../html/gameover.html";
        // id("lives").textContent = "You Lost!";
    } 
    else {
        window.location = "./../html/finish.html";
        // id("lives").textContent = "You Won!";
    }
}

//////ניצור פונקציית בדיקה לבחירת ספרה ללוח
function checkCorrect (tile) {
    //////////////נגדיר פתרון בהתאם לרמת קושי
    let solution;
    if (id("diff-1").checked) solution = easy[1];
    else if (id("diff-2").checked) solution = medium[1];
    else solution = hard[1];
    ////////////אם הספרה בלוח המשחק שווה לספרה בפתרון
    if (solution.charAt(tile.id) == tile.textContent) return true;
    else return false;

}

/////////////ניצור פונקציה לניקוי לוח קודם
function clearPrevious() {
    let tiles = qsa(".tile");///ניצור קלאס לכל התאים בעזרת בחירת כל התאים ונקודה ושם הקלאס
    ////ננקה את כל התאים מבחירה
    for (let i = 0 ; i < tiles.length ; i++) {
        tiles[i].remove();
    }
    ////נאפס את הטיימר
    if (timer) clearTimeout(timer);
    ////ביטול בחירת מספרים מלוח הספרות
    for ( let j = 0 ; j < id("number-container").children.length ; j++) {
        id("number-container").children[j].classList.remove("selected");
    }
    /////ביטול בחירה במספרים
    selectedTile = null;
    selectedNum = null; 
    
}
