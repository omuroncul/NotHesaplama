let students = [];
//Öğrenci bilgilerini local storage'dan var ise alma
let varMiLocalde = localStorage.getItem("students");

if (varMiLocalde) {
  //localStorage da kayitli ise
  students = JSON.parse(localStorage.getItem("students"));
} else {
  //localStorage da kayitli değil ise
  students = [];
}
//document HTML dosyalarına ulaşır
//querySelector seçiçi işlemidir class veya idlere ulaşarak bağlanır

//Öğrenci formunu seçme
const studentForm = document.querySelector("#student-form");

//Öğrenci listesini seçme
const studentList = document.querySelector("#student-list");

//Öğrenci ekleme butonu
const addButton = document.querySelector(".ekle");

viewStudentList();

//Öğrenci ekleme İşlemi
//studentForm olan form submit edildiğinde çalışacak olan olay
//addEventListener olay ekler ve olayin ismini icinde belirteblirisiniz
studentForm.addEventListener("submit", (e) => {
  //studentform her submit edildiginde

  //form ile submit değildiğinde sayfa yenilendiği için yenilemeyi iptal eder
  e.preventDefault();

  //FORMDAKI değerleri almak için
  const name = document.querySelector("#name").value;
  const surname = document.querySelector("#surname").value;
  const number = document.querySelector("#number").value;
  const vize = document.querySelector("#vize").value;
  const final = document.querySelector("#final").value;

  //Her yenİ Öğrenci için Öğrenci nesnesi oluşturma
  const newStudent = {
    ad: name,
    soyad: surname,
    no: number,
    vize: Number(vize),
    final: parseInt(final),
  };

  //Yeni öğrenciyi diziye ekleme => push(x), dizinin sonuna x öğesini ekler
  students.push(newStudent);

  console.log("HER YENI OGRENCIDEN BIRI", newStudent);

  //forma ait tüm inputları temizleme
  studentForm.reset();

  //Öğrenciyi locala de kaydetme ve güncelleme
  savetoLocalStorage();

  //Öğrenciyi listesi görüntüleme
  viewStudentList();

  console.log("students", students);
});
console.log("Öğrenciler", students);

//Öğrencileri listede görüntüleme
function viewStudentList() {
  //Liste boş olduğunda görüntülenecek kısım
  const emptyList = document.querySelector(".empty");

  if (students.length) {
    //length dizinin eleman sayısını döner.
    //öğrenci dizisi dolu ise

    if (emptyList) {
      emptyList.style.display = "none";
    }

    //Listede mevcut olan içeriği temizle
    studentList.innerHTML = "";

    students.forEach((oAnkiOgrenci, index) => {
      // console.log(`${index + 1}. ogrenci =>`, oAnkiOgrenci);

      //Öğrenci bilgilerini HTML içeriğine dönüştürme
      const studentCard = `
           <div class="student-item-info">
               <h3>${oAnkiOgrenci.ad} ${oAnkiOgrenci.soyad} - ${
        oAnkiOgrenci.no
      }</h3>
               <span>Vize: ${oAnkiOgrenci.vize} Final: ${
        oAnkiOgrenci.final
      }</span>
               <p>Ortalama: ${(
                 (oAnkiOgrenci.vize + oAnkiOgrenci.final) /
                 2
               ).toFixed(2)}</p>
           </div>
           <div class="student-item-process">
               <i class="fa-solid fa-pen-to-square edit-button" onclick='editStudent(${index})'></i>
               <i class="fa-solid fa-trash delete-button" onclick='deleteStudent(${index})'></i>
           </div>
            `;

      //Öğrenci bilgisini içeren eleman oluşturma student-item class yani
      const studenItem = document.createElement("div"); //createElement ile div etiketi oluşturur
      studenItem.classList.add("student-item"); //classList add ıle parantez içindeki ismi class olarak değişkene ekler
      studenItem.innerHTML = studentCard;

      const ortalama = ((oAnkiOgrenci.vize + oAnkiOgrenci.final) / 2).toFixed(
        2
      );
      if (ortalama > 80) {
        // console.log('80 den buyuk',ortalama)
        studenItem.style.background = "#15aefe";
      } else if (ortalama > 60) {
        // console.log('60 den buyuk',ortalama)
        studenItem.style.background = "#f47121";
      } else if (ortalama > 45) {
        // console.log('45 den buyuk',ortalama)
        studenItem.style.background = "#630eff";
      } else {
        // console.log('45 den küçük',ortalama)
        studenItem.style.background = "#ff0fe4";
        /* studenItem.cssText= `
          background:red;
          border:yellow 2px solid;
            ` */
      }

      //Öğrenci elemanını listeye ekleme
      //appendChild ile etiket icine ekler
      studentList.appendChild(studenItem);
    });
  } else {
    //öğrenci dizisi boş ise
    console.log("bos");
    //öğrenci dizisi boş olduğunda çalışacak HTML uyarı paragrafı
    const forEmpty = `
            <p class="empty">Listenizde öğrenci bulunmamaktadır.</p>
        `;
    //innerHTML html kodlarına erişmeyi sağlar
    studentList.innerHTML = forEmpty;
  }
}

//Öğrenci Silme işlemi
function deleteStudent(gelenIndex) {
  console.log('gelenIndex',gelenIndex)
  // console.log("deleteStudent fonksiyonu çalıştı.", gelenText);
  /* 2.YONTEM */
  /* var silmeIslemiIcinDizi = [] 
  const sonuc = students.forEach((oAnkiOgrenci, index)=>{
    // console.log('oAnkiOgrenci',oAnkiOgrenci)
    if (index !== gelenIndex) {//gelen indexe eşit olmayan öğrenciler
      console.log('BU ÖĞRENCİLER GELEN İNDEXE EŞİT OLMAYANDIR',oAnkiOgrenci)
      silmeIslemiIcinDizi.push(oAnkiOgrenci)
    }
  })
  console.log('sonuca gore Students=>',silmeIslemiIcinDizi) */

  console.log("Students=>", students);
  //Silinecek dizi elemanın indexi(gelenIndex) öğrenci dizisinde eşit olmayanları listeledik
  /* const sonuc = students.filter((oankiDeger, index) => index !== gelenIndex)*/
  const sonuc = students.filter((oankiDeger, index) => {
    /* TOASTIFY 1.YONTEM
    //sadece silinecek ogrenci icin
    if (index === gelenIndex) {
      Toastify({
        text: `${oankiDeger.ad} adındaki öğrenci listesinden silindi.`,
        duration: 1000
        }).showToast();
    } */

    return index !== gelenIndex;
  });

  //Silinecek öğrenciyi bulma find() ile
  const silinecekOgr = students.find(
    (oankiDeger, index) => index === gelenIndex
  );
  console.log("silinecekOgr", silinecekOgr);

  Toastify({
    text: `${silinecekOgr.ad} adındaki öğrenci listesinden silindi.`,
    duration: 1500, //1.5sn
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();

  // console.log('sonuca gore Students=>',sonuc)

  students = sonuc; // filtreleme İşlemine göre öğrenci dizimi güncelleme

  savetoLocalStorage();
  //localStorage.setItem("students", JSON.stringify(students));

  //Öğrencileri görüntüleme fonksiyonu
  viewStudentList();
}

function editStudent(gelenIndex) {
  // console.log('editStudent Çalıştı.', gelenIndex)

  //! Güncellenecek olan Öğrenci
  //1.YONTEM
  /* const editStudent = students[gelenIndex]
  console.log('editStudent',editStudent) */
  //2.YONTEM
  /* const editStudent = students.filter((oAnkiOgrenci,index)=> index === gelenIndex )
  console.log('editStudent',editStudent)  */
  //3.YONTEM
  const editStudent = students.find(
    (oAnkiOgrenci, index) => index === gelenIndex
  );
  console.log("editStudent", editStudent);

  //Form alanlarını öğrenci bilgileriyle doldurma
  document.querySelector("#name").value = editStudent.ad;
  document.getElementById("surname").value = editStudent.soyad;
  document.getElementById("number").value = editStudent.no;
  document.getElementById("vize").value = editStudent.vize;
  document.querySelector("#final").value = editStudent.final;

  //Öğrenciyi silme
  deleteStudent(gelenIndex);

  //bilgileri local storage'a kaydet
  savetoLocalStorage();
}

// Öğrenci bilgilerini local storage'da saklama
function savetoLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

let dizi = [1, 2, 3, 2, 5, 2, 2];

//oankıİtem 2 ye eşit olmayanları filtreler
const result = dizi.filter((item, index) => item !== 2);
//ındexi 0 a eşit olan elemanı bulur
const result2 = dizi.find((item, index) => index === 0);
//her elemani 10 a çarpar
const result3 = dizi.map((item, index) => item * 10);
/* 
console.log('filter dizi sonucu', result)
console.log('find dizi sonucu', result2)
console.log('map dizi sonucu', result3) */

