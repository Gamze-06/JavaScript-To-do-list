document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  header.style.backgroundColor = "#f78501";
  header.style.display = "flex";
  header.style.flexDirection = "column";
  header.style.alignItems = "center";

  const mb1Element = document.querySelector(".mb-1");
  if (mb1Element) {
    mb1Element.style.backgroundColor = "white";
    mb1Element.style.margin = "25px";
  }

  const title = document.querySelector(".header h2");
  if (title) title.style.color = "white";

  const input = document.querySelector("#task");
  const button = document.querySelector("#liveToastBtn");
  const list = document.querySelector("#list");

  // Input ve butonu saracak flex container
  const inputWrapper = document.createElement("div");
  inputWrapper.style.display = "flex";
  inputWrapper.style.width = "100%";
  inputWrapper.style.maxWidth = "1000px";
  inputWrapper.style.justifyContent = "center";
  inputWrapper.style.alignItems = "center";
  inputWrapper.style.gap = "0px";
  inputWrapper.style.marginBottom = "10px";
  inputWrapper.style.overflow = "hidden";

  inputWrapper.appendChild(input);
  inputWrapper.appendChild(button);
  header.appendChild(inputWrapper);

  input.style.flex = "1";
  input.style.width = "65%";
  input.style.border = "none";
  input.style.fontSize = "16px";
  input.style.padding = "10px";
  input.style.margin = "0px";


  button.style.display = "flex";
  button.style.alignItems = "center"; 
  button.style.justifyContent = "center"; 
  button.style.border = "none";
  button.style.width = "250px"
  button.style.fontSize = "16px";
  button.style.padding = "10px 20px";
  button.style.margin = "8px 0";
  button.style.backgroundColor = "#d9d9d9";
  button.style.color = "black";
  button.style.cursor = "pointer";


  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#bbb";
  });
  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "#d9d9d9";
  });


  const existingItems = list.getElementsByTagName("li");
  for (let i = 0; i < existingItems.length; i++) {
    styleListItem(existingItems[i], i); 
    addCloseBtnToItem(existingItems[i]); 
}

 button.addEventListener("click", function () {
  const taskText = input.value.trim();
  if (taskText === "") {
    toastr.error("Lütfen bir görev girin!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;

  const index = list.children.length; // index hesaplama
  styleListItem(li, index); 

  addCloseBtnToItem(li);
  list.appendChild(li);
  input.value = "";

  toastr.success("Listeye eklendi.");  
});

  // Liste elemanına tıklandığında işaretle/sil
  list.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.classList.contains("close")) {
      e.target.parentElement.remove();
    }
  });

  // Hover efekti 
  list.addEventListener("mouseover", function (e) {
    if (e.target.classList.contains("close")) {
      e.target.style.backgroundColor = "#bbb";
    }
  });
  list.addEventListener("mouseout", function (e) {
    if (e.target.classList.contains("close")) {
      e.target.style.backgroundColor = "";
    }
  });

 function addCloseBtnToItem(item) {
  item.style.position = "relative"; 

  const closeBtn = document.createElement("span");
  closeBtn.textContent = "×";
  closeBtn.className = "close";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.position = "absolute"; 
  closeBtn.style.right = "10px";
  closeBtn.style.top = "50%";
  closeBtn.style.transform = "translateY(-50%)"; 
  closeBtn.style.userSelect = "none";

  item.appendChild(closeBtn);
}

  function styleListItem(li, index) {
    li.style.backgroundColor = index % 2 === 0 ? "#f0f0f0" : "#dcdcdc";

    li.style.padding = "15px";
    li.style.marginBottom = "6px";
    li.style.borderRadius = "none";
    li.style.position = "relative";
    li.style.listStyle = "none";
    li.style.lineHeight ="0.8";

    list.style.paddingLeft = "0";
    list.style.marginLeft = "0";
    list.style.width = "100%";
    list.style.maxWidth = "1200px";
   


  // Transition ile hover 
  li.style.transition = "background-color 0.3s ease, text-decoration 0.3s ease";
  li.style.cursor = "pointer";
}

// Liste elemanlarının hover efekti:
list.addEventListener("mouseover", function (e) {
  if (e.target.tagName === "LI") {
    e.target.style.backgroundColor = "#c0c0c0";  // koyu gri hover
    e.target.style.textDecoration = "line-through"; // üzeri çizili örnek olarak
  }
});

list.addEventListener("mouseout", function (e) {
  if (e.target.tagName === "LI") {
  // Hover öncesi rengi tekrar uygula:
  const index = Array.from(list.children).indexOf(e.target);
  e.target.style.backgroundColor = index % 2 === 0 ? "#f0f0f0" : "#dcdcdc";
  e.target.style.textDecoration = "none";
  }
});
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: "3000"
};

// LOCAL STORAGE FONKSİYONLARI
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTask(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  const index = list.children.length;
  styleListItem(li, index);
  addCloseBtnToItem(li);
  list.appendChild(li);
}

});
