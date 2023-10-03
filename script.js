let selectedFile;
let questionsData = [];
let currentQuestionIndex = 0;
document.getElementById("input").addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
});
document.getElementById("button").addEventListener("click", () => {
  if (selectedFile) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        questionsData = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        generateQue();
      });
    };
  }
});

function generateQue(){
    const n = questionsData.length;
        const random = Math.floor(Math.random() * n);
        currentQuestionIndex=random;
        document.getElementById("que").innerHTML = questionsData[random].Question;
        document.getElementById("opt1").innerHTML = questionsData[random].option1;
        document.getElementById("opt2").innerHTML = questionsData[random].option2;
        document.getElementById("opt3").innerHTML = questionsData[random].option3;
        document.getElementById("opt4").innerHTML = questionsData[random].option4;
        document.getElementById("queCon").classList.remove("hide");
        console.log(questionsData[currentQuestionIndex].AnswerOption);
        document.querySelector(".row").classList.add("hide");
}

function nextQue(){
    generateQue();
    document.querySelector(".result").textContent ="";
}

function verify(clickedOption){
    correctOption = questionsData[currentQuestionIndex].AnswerOption;
    console.log(clickedOption);
    if (clickedOption === questionsData[currentQuestionIndex].AnswerOption) {
        // If correct, display "Correct" in the result class
        document.querySelector(".result").textContent = "Correct";
      } else {
        // If incorrect, display "Incorrect" in the result class
        document.querySelector(".result").textContent = "Incorrect";
      }
}