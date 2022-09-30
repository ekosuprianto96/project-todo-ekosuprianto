const RENDER_EVENT = "render-data";
let daftarBku = [];
window.addEventListener("load", () => {
  if (typeof Storage !== undefined) {
    if (localStorage.getItem("list books") === null) {
      localStorage.setItem("list books", JSON.stringify(daftarBku));
    } else {
      daftarBku = JSON.parse(localStorage.getItem("list books"));
      // const elementStyle = JSON.parse(localStorage.getItem('style'));
      // const logo = document.querySelector(`#${elementStyle.idElement}`);
      // logo.style.top = elementStyle.top;
      // logo.style.left = elementStyle.left;
      // logo.style.position = elementStyle.position;
      document.dispatchEvent(new Event(RENDER_EVENT));
    }
  }
});
const btnTambah = document
  .querySelector("#btn-add")
  .addEventListener("click", () => {
    const formTambah = document.querySelector(".tambah-buku");
    formTambah.style.display = "flex";
    const btnClose = document
      .querySelector("#cancel")
      .addEventListener("click", () => {
        formTambah.style.display = "none";
        alert("Yakin Ingin Keluar...?");
        document.location.href = "index.html";
      });
    const tambah = document
      .querySelector(".form-tambah")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        addData();
        alert("Data Success Adding");
        document.location.href = "index.html";
      });
  });
const belumDibaca = document
  .querySelector("#unread-book")
  .addEventListener("click", () => {
    const view = document.querySelector(".content-books");
    view.innerHTML = "";
    for (let data of daftarBku) {
      if (data.info === false) {
        console.log(data.info);
        const makeData = makeListBooks(data);
        view.append(makeData);
      }
    }
    if (view.firstChild === null) {
      view.innerHTML = "<h5 class='text-nodata'>Tidak Ada Data...!</h5>";
    }
  });
const sudahDibaca = document
  .querySelector("#already-read")
  .addEventListener("click", () => {
    const view = document.querySelector(".content-books");
    view.innerHTML = "";
    for (let data of daftarBku) {
      if (data.info === true) {
        console.log(data.info);
        const makeData = makeListBooks(data);
        view.append(makeData);
      }
    }
    if (view.firstChild === null) {
      view.innerHTML = "<h5 class='text-nodata'>Tidak Ada Data...!</h5>";
    }
  });
const halamanListBooks = document
  .querySelector("#list-books")
  .addEventListener("click", () => {
    document.location.href = "index.html";
  });
function save(objectBuku) {
  if (isStorage()) {
    daftarBku.push(objectBuku);
    localStorage.setItem("list books", JSON.stringify(daftarBku));
  }
  console.log(daftarBku);
}
function createObject(id, title, writer, year, info) {
  return {
    id,
    title,
    writer,
    year,
    info,
  };
}
document.addEventListener(RENDER_EVENT, () => {
  const view = document.querySelector(".content-books");
  for (let data of daftarBku) {
    const item = makeListBooks(data);
    view.append(item);
  }
});
function isStorage() {
  if (typeof Storage === undefined) {
    alert("Your Browser Doesn't Support Web API");
    return false;
  }
  return true;
}
function makeListBooks(objectBuku) {
  const { id, title, writer, year, info } = objectBuku;
  const elementTitle = document.createElement("h4");
  elementTitle.textContent = `Judul Buku : ${title}`;

  const elementWriter = document.createElement("h4");
  elementWriter.textContent = `Penulis : ${writer}`;

  const elementYear = document.createElement("h4");
  elementYear.textContent = `Tahun Keluar : ${year}`;

  const btnDelete = document.createElement("i");
  btnDelete.setAttribute("class", "btn-delete bi bi-trash-fill");
  btnDelete.setAttribute("id", id);
  btnDelete.addEventListener("click", (e) => {
    if (confirm("Anda Yakin Ingin Menghapus Data Ini...?")) {
      const idTarget = e.target.id;
      if (id == idTarget) {
        if (localStorage.getItem("list books") !== null) {
          daftarBku = JSON.parse(localStorage.getItem("list books"));
          const idIndex = findId(id);
          daftarBku.splice(idIndex, 1);
          localStorage.setItem("list books", JSON.stringify(daftarBku));
          document.location.href = "index.html";
        }
      }
    }
  });

  const container = document.createElement("div");
  container.setAttribute("class", "container-text");
  container.append(elementTitle, elementWriter, elementYear, btnDelete);

  if (info === false) {
    const buttonBelumDibaca = document.createElement("button");
    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Pindahkan Ke Sudah Dibaca";
    btnEdit.setAttribute("class", "btn-sudah");
    btnEdit.addEventListener("click", () => {
      const idTarget = findItem(id);
      idTarget.info = true;
      console.log(daftarBku);
      localStorage.setItem("list books", JSON.stringify(daftarBku));
      document.location.href = "index.html";
    });
    buttonBelumDibaca.setAttribute("class", "button-false");
    buttonBelumDibaca.textContent = "Belum Dibaca";
    container.append(buttonBelumDibaca, btnEdit);
  } else {
    const btnEdit2 = document.createElement("button");
    btnEdit2.textContent = "Pindahkan Ke Belum Dibaca";
    btnEdit2.setAttribute("class", "btn-belum");
    btnEdit2.addEventListener("click", () => {
      const idTarget = findItem(id);
      idTarget.info = false;
      console.log(daftarBku);
      localStorage.setItem("list books", JSON.stringify(daftarBku));
      document.location.href = "index.html";
    });
    const buttonSudahDibaca = document.createElement("button");
    buttonSudahDibaca.setAttribute("class", "button-true");
    buttonSudahDibaca.textContent = "Sudah Dibaca";
    container.append(buttonSudahDibaca, btnEdit2);
  }
  return container;
}
function addData() {
  const id = +new Date();
  const title = document.querySelector("#title-books").value;
  const writer = document.querySelector("#writer").value;
  const year = document.querySelector("#year").value;
  const check = document.querySelector("#info");
  let info = false;
  if (check.checked) {
    info = true;
  }
  console.log(info);
  const objectBuku = createObject(id, title, writer, year, info);
  save(objectBuku);
  makeListBooks(objectBuku);
}
function removeItem(id, element) {
  if (id === element.id) {
    console.log(element.id);
  }
}
function findId(id) {
  for (const index in daftarBku) {
    if (daftarBku[index].id === id) {
      return index;
    }
  }
  return -1;
}
function findItem(id) {
  for (const item of daftarBku) {
    if (item.id === id) {
      return item;
    }
  }
  return null;
}
function cari(title) {
  const dataBuku = JSON.parse(localStorage.getItem("list books"));
  for (const item of dataBuku) {
    if (item.title === title) {
      return item.title;
    }
  }
  return null;
}
const inputSearch = document.querySelector('#input-cari').addEventListener('keyup', (e) => {
  const dataBooks = JSON.parse(localStorage.getItem("list books"));
  const dataContainer = document.querySelectorAll('.container-text');
  const view = document.querySelector(".content-books");
  const valueInput = e.target.value.toLowerCase();
  view.innerHTML = "";
  dataBooks.forEach(element => {
    const titleBooks = new String(element.title).toLowerCase();
    const writereBooks = new String(element.writer).toLowerCase();
    if (titleBooks.indexOf(valueInput) > -1 || writereBooks.indexOf(valueInput) > -1) {
      const makeData = makeListBooks(element);
      view.append(makeData);
    }
      
  });
  if (dataContainer === null || view.textContent === "" && dataContainer !== null) {
    if (new String(e.target.length).length > 0) {
        document.dispatchEvent(new Event('text-data'));
      }
  }

})
document.addEventListener('text-data', () => {
  const h1Element = document.createElement('h1');
  h1Element.setAttribute('class', 'text-nodata');
  h1Element.textContent = 'No Data...!';
  const view = document.querySelector(".content-books");
  view.append(h1Element);
})
document.addEventListener('DOMContentLoaded', () => {
 let  daftarBuku = JSON.parse(localStorage.getItem("list books"));
  if (daftarBuku.length <= 0) {
    document.dispatchEvent(new Event('text-data'));
  }
})
// let mouseCursor = document.querySelector('.cursor');

// window.addEventListener('mousemove', (e) => {
//   mouseCursor.style.top = e.pageY + 'px';
//   mouseCursor.style.left = e.pageX + 'px';
// })
// let logo = document.querySelector('.menu a');
// logo.addEventListener('dragend', (e) => {
//   logo.addEventListener('drag', (e) => {
//   logo.style.position = 'absolute';
//   logo.style.top = e.pageY + 'px';
//     logo.style.left = e.pageX + 'px';
//     if (!logo.className) {
//       logo.classList.add('coba')
//     }
// })
//   logo.style.position = 'absolute';
//   logo.style.top = e.pageY + 'px';
//   logo.style.left = e.pageX + 'px';
//   // console.log(logo.style.top)
//   const styleTop = logo.style.top;
//   const styleLeft = logo.style.left;
//   const stylePosition = logo.style.position;
//   const classElement = logo.className;

//   console.log(classElement)

//   const objcStyle = {
//     idElement: logo.id,
//     nameClass: classElement,
//     top: styleTop,
//     left: styleLeft,
//     position: stylePosition
//   };

//   localStorage.setItem('style', JSON.stringify(objcStyle));
// })
// document.body.addEventListener('click', (e) => {
//   e.target.setAttribute('draggable', 'true')
// })