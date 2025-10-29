function addRow() {
  let table1 = document.getElementById("table");
  // console.log(table);
  // get rows' count
  let length = table1.rows.length;
  // console.log(length);
  // 插入行节点
  let newRow = table1.insertRow(length);
  console.log(newRow);
  // 插入列节点
  let newName = newRow.insertCell(0);
  let newPhone = newRow.insertCell(1);
  let newAct = newRow.insertCell(2);

  // 修改结点文本内容
  newName.innerHTML = "red";
  newPhone.innerHTML = "321321321";
  newAct.innerHTML =
    "<button onclick='editRow(this)'>edit</button> <button onclick='deleteRow(this)'>delete</button>";
}

function deleteRow(button) {
  let row = button.parentNode.parentNode;
  row.remove();
}

function editRow(button) {
  let row = button.parentNode.parentNode;
  let name = row.cells[0];
  let phone = row.cells[1];

  let inputName = prompt("enter name:");
  let inputPhone = prompt("enter phone number:");

  name.innerHTML = inputName;
  phone.innerHTML = inputPhone;
}
