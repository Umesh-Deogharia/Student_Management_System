let arr = [];
function getData() {
  fetch("hello.json")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      arr = res;
      allFunctionalizies();
    })
    .catch((e) => {
      console.log("error");
    });
}
getData();

function allFunctionalizies() {
  let searchHistory = [];
  const search = document.querySelector("#search");
  const searchBtn = document.querySelector("#searchBtn");
  const sortAZBtn = document.querySelector("#sortAtoZ");
  const sortZABtn = document.querySelector("#sortZtoA");
  const SortMarks = document.querySelector("#sorttoMarks");
  const sortPassing = document.querySelector("#sortPass");
  const sortClass = document.querySelector("#sortClass");
  const sortGender = document.querySelector("#sortGender");
  const tBody = document.querySelector("tbody");
  Show(arr);

  //                    Search Button

  searchBtn.addEventListener("click", (e) => {
    let searchTerm = search.value.toLowerCase();
    let filter = arr.filter((elem) => {
      let first = elem["first_name"].toLowerCase().search(searchTerm);
      let second = elem["last_name"].toLowerCase().search(searchTerm);
      let third = elem["email"].toLowerCase().search(searchTerm);
      if (first != -1 || second != -1 || third != -1) {
        return elem;
      }
    });
    console.log(filter);
    if (filter.length <= 0 || filter == undefined) {
      alert("No Result Found");
    } else {
      Show(filter);
    }
  });

  //                     To Sort A-Z

  sortAZBtn.addEventListener("click", () => {
    SortAZ(arr);
  });
  function SortAZ(arr) {
    arr.sort((a, b) => a.first_name.localeCompare(b.first_name));
    Show(arr);
  }

  //                     To Sort Z-A

  sortZABtn.addEventListener("click", () => {
    SortZA(arr);
  });
  function SortZA(arr) {
    arr.sort((a, b) => b.first_name.localeCompare(a.first_name));
    Show(arr);
  }

  //                       To Sort Marks

  SortMarks.addEventListener("click", () => {
    toSortMarks(arr);
  });
  function toSortMarks(arr) {
    arr.sort((a, b) => a.marks - b.marks);
    Show(arr);
  }

  //                    To Sort Passing

  sortPassing.addEventListener("click", () => {
    let filtered = arr.filter((elem) => elem.passing);
    Show(filtered);
  });

  //                     To Sort Class

  sortClass.addEventListener("click", () => {
    arr.sort((a, b) => a.class - b.class);
    Show(arr);
  });

  //                        To Sort Gender

  let check = true;
  sortGender.addEventListener("click", () => {
    let gender = [];
    let other = [];
    if (check) {
      arr.forEach((elem) => {
        if (elem.gender == "Male") {
          gender.push(elem);
        } else {
          other.push(elem);
        }
      });
    } else {
      arr.forEach((elem) => {
        if (elem.gender == "Female") {
          gender.push(elem);
        } else {
          other.push(elem);
        }
      });
    }
    check = !check;
    arr = [];
    arr = [...gender, ...other];
    Show(arr);

    Show(arr);
  });

  //                    To Show All the Data

  function Show(arr) {
    tBody.innerHTML = "";
    arr.forEach((students) => {
      let tRow = document.createElement("tr");

      let Id = document.createElement("td");
      let Name = document.createElement("td");
      let Gender = document.createElement("td");
      // let Gender2 = document.createElement("td");
      let Class = document.createElement("td");
      let Marks = document.createElement("td");
      let Passing = document.createElement("td");
      let Email = document.createElement("td");

      Id.innerText = students.id;
      Name.innerText = students.first_name;
      Name.innerText += ` ${students.last_name}`;
      Gender.innerText = students.gender;
      Class.innerText = students.class;
      Marks.innerText = students.marks;
      if (students.passing === true) {
        Passing.innerText = "Passing";
      } else {
        Passing.innerText = "Failed";
      }

      Email.innerText = students.email;
      tRow.appendChild(Id);
      tRow.appendChild(Name);
      tRow.appendChild(Gender);
      tRow.appendChild(Class);
      tRow.appendChild(Marks);
      tRow.appendChild(Passing);
      tRow.appendChild(Email);
      tBody.appendChild(tRow);
    });
  }
}
