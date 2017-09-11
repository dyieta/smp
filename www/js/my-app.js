// Initialize your app

        
var myApp = new Framework7({
     animateNavBackIcon:true,
    template7Pages: true,
precompileTemplates: true,
    
    
    
    
    
});




// Export selectors engine
var $$ = Dom7;

var x=0;
var idmapel=null;

var nomor_urut=1;

 var mapel=null;

var waktu=null;
var gambar=null;
var jumlah_soal=null;
var nama_mapel=null;
var arrayjawaban=null;
var soal='';
var timeinterval=null;
var tryout='1';
var aktivasi='';
var lihat='';
 var audio;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
          myApp.addNotification({
        title: 'Genta Smart',
        message: 'memilih notif'
    });
    });
});

myApp.onPageInit('soal', function (page) {
    // run createContentPage func after link was clicked
      $$('.create-page').on('click', function () {
     alert("sle");
    });
    
  
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}


$$(document).on('page:init', '.page[data-page="soal-pages"]', function (e) {
    var mySwiper = $$('.swiper-container')[0].swiper;  
    
var deadline = new Date(Date.parse(new Date()) + waktu * 60 * 1000);
initializeClock('clockdiv', deadline); 

    
mySwiper.on('slideChangeStart', function () {
document.getElementById("enomor").innerHTML = " &nbsp; No. " + (mySwiper.activeIndex+1);
nomor_urut=mySwiper.activeIndex+1;
    
    

var jawaban=arrayjawaban[nomor_urut]["jawab"];  
$$('#ba').removeClass('active'); 
$$('#bb').removeClass('active');
$$('#bc').removeClass('active');
$$('#bd').removeClass('active');
$$('#be').removeClass('active');
    
    if (jawaban=="A"){
       $$('#ba').addClass('active'); 
    }else if (jawaban=="B"){
       $$('#bb').addClass('active'); 
    }else if (jawaban=="C"){
       $$('#bc').addClass('active'); 
    }else if (jawaban=="D"){
       $$('#bd').addClass('active'); 
    }else if (jawaban=="E"){
       $$('#be').addClass('active'); 
    }

    
   if (aktivasi=='false' &&  lihat=='true'){
         myApp.prompt('masukkan kode yang ada di dalam buku', 'Aktivasi', function (value) {
         if (value=="PU13R"){
             ubahaktivasi();
       myApp.alert('aktivasi berhasil','SELAMAT');
             }else{
                 myApp.alert('kode salah','ERROR');
             }
    });
       
   }

})      

})

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
      
     
    if (t.total <= 0) {
      clearInterval(timeinterval);
        ubahlihat();
        myApp.alert('Waktu habis!!', 'Info', function () {
        myApp.popup('.popup-about');
    });
       
	   
    }
  }

  updateClock();
   timeinterval = setInterval(updateClock, 1000);
}
   
    
    



function pilihmapel(x) {
	idmapel=x;
	
    
 


 tampilmapel();
    
    
    
    
}


function pilihtryout(x) {
    $$('#btry1').removeClass('active');
    $$('#btry2').removeClass('active');
	
    if (x=='1'){
        $$('#btry1').addClass('active'); 
        tryout='1';
    }else if (x=='2'){
        $$('#btry2').addClass('active'); 
        tryout='2';
    }
    
 
    
    
}

function next(){
    x=x+1;
    
}

   var db = window.openDatabase("CBTSMP", "1.0", "cbt smp Database",  3*1024*1024);

  document.addEventListener("deviceready", onDeviceReady, false);





    // Populate the database 
    //
    function populateDB(tx) {
 
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, nama,soal,waktu,gambar)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS tbaktivasi (id unique, aktif,lihat)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS tbjawab (id unique,nomor INTEGER,idmapel INTEGER, kunci TEXT,gambar TEXT,jawab TEXT,tryout TEXT)');
         //tx.executeSql('CREATE TABLE IF NOT EXISTS tbjawaban (id INTEGER PRIMARY KEY,idmapel INTEGER , kunci TEXT,gambar TEXT,jawab TEXT)');
       


    
    
    }

    // Query the 
    //
    

    // Transaction error 
    //
    function errorCB(err) {
       //alert("Error processing SQL: "+err.code);
        
    }

    // Transaction success callback
    //
   

    // PhoneGap is ready
    //
    function onDeviceReady() {
      
        db.transaction(populateDB, errorCB, successCB);
    }

function successCB() {
       db.transaction(function (tx) {
 
        tx.executeSql('select * from tbjawab', [], querySuccesscekdata, errorCB);

       })
}

function querySuccesscekdata(tx, results) {
    
    var len = results.rows.length;
   if (len==0){
        db.transaction(populateDATA, errorCB, successinsertData);
   }  
  

}

  function populateDATA(tx) {
       tx.executeSql('INSERT INTO tbaktivasi (id, aktif,lihat) VALUES (1, "false","false")');
        tx.executeSql('INSERT INTO DEMO (id, nama,soal,waktu,gambar) VALUES (1, "Matematika","40","120","matematika2")');
        tx.executeSql('INSERT INTO DEMO (id, nama,soal,waktu,gambar) VALUES (2, "Bahasa Indonesia","50","120","bahasaindonesia2")');
        tx.executeSql('INSERT INTO DEMO (id, nama,soal,waktu,gambar) VALUES (3, "Bahasa Inggris","120","30","bahasainggris2")');
        tx.executeSql('INSERT INTO DEMO (id, nama,soal,waktu,gambar) VALUES (4, "IPA","40","120","ipa")');
     
      
       



tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("1","01","","C","1","mat0101","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("2","02","","B","1","mat0102","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("3","03","","A","1","mat0103","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("4","04","","A","1","mat0104","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("5","05","","C","1","mat0105","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("6","06","","B","1","mat0106","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("7","07","","B","1","mat0107","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("8","08","","D","1","mat0108","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("9","09","","C","1","mat0109","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("10","10","","C","1","mat0110","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("11","11","","D","1","mat0111","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("12","12","","D","1","mat0112","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("13","13","","C","1","mat0113","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("14","14","","C","1","mat0114","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("15","15","","A","1","mat0115","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("16","16","","D","1","mat0116","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("17","17","","B","1","mat0117","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("18","18","","A","1","mat0118","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("19","19","","A","1","mat0119","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("20","20","","B","1","mat0120","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("21","21","","A","1","mat0121","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("22","22","","B","1","mat0122","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("23","23","","C","1","mat0123","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("24","24","","B","1","mat0124","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("25","25","","A","1","mat0125","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("26","26","","A","1","mat0126","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("27","27","","B","1","mat0127","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("28","28","","A","1","mat0128","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("29","29","","B","1","mat0129","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("30","30","","C","1","mat0130","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("31","31","","B","1","mat0131","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("32","32","","B","1","mat0132","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("33","33","","D","1","mat0133","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("34","34","","B","1","mat0134","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("35","35","","B","1","mat0135","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("36","36","","B","1","mat0136","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("37","37","","B","1","mat0137","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("38","38","","D","1","mat0138","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("39","39","","A","1","mat0139","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("40","40","","A","1","mat0140","1")');


tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("41","01","","C","2","mat0201","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("42","02","","D","2","mat0202","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("43","03","","C","2","mat0203","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("44","04","","A","2","mat0204","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("45","05","","C","2","mat0205","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("46","06","","C","2","mat0206","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("47","07","","B","2","mat0207","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("48","08","","D","2","mat0208","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("49","09","","B","2","mat0209","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("50","10","","C","2","mat0210","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("51","11","","C","2","mat0211","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("52","12","","B","2","mat0212","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("53","13","","B","2","mat0213","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("54","14","","C","2","mat0214","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("55","15","","C","2","mat0215","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("56","16","","B","2","mat0216","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("57","17","","A","2","mat0217","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("58","18","","B","2","mat0218","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("59","19","","B","2","mat0219","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("60","20","","D","2","mat0220","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("61","21","","B","2","mat0221","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("62","22","","B","2","mat0222","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("63","23","","A","2","mat0223","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("64","24","","B","2","mat0224","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("65","25","","C","2","mat0225","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("66","26","","C","2","mat0226","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("67","27","","B","2","mat0227","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("68","28","","B","2","mat0228","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("69","29","","D","2","mat0229","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("70","30","","D","2","mat0230","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("71","31","","A","2","mat0231","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("72","32","","D","2","mat0232","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("73","33","","D","2","mat0233","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("74","34","","A","2","mat0234","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("75","35","","B","2","mat0235","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("76","36","","C","2","mat0236","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("77","37","","C","2","mat0237","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("78","38","","B","2","mat0238","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("79","39","","C","2","mat0239","1")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("80","40","","A","2","mat0240","1")');





tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("81","01","","C","1","indo0101","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("82","02","","B","1","indo0102","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("83","03","","B","1","indo0103","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("84","04","","C","1","indo0104","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("85","05","","D","1","indo0105","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("86","06","","A","1","indo0106","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("87","07","","A","1","indo0107","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("88","08","","D","1","indo0108","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("89","09","","A","1","indo0109","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("90","10","","C","1","indo0110","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("91","11","","C","1","indo0111","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("92","12","","C","1","indo0112","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("93","13","","B","1","indo0113","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("94","14","","A","1","indo0114","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("95","15","","A","1","indo0115","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("96","16","","B","1","indo0116","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("97","17","","A","1","indo0117","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("98","18","","D","1","indo0118","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("99","19","","A","1","indo0119","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("100","20","","B","1","indo0120","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("101","21","","D","1","indo0121","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("102","22","","A","1","indo0122","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("103","23","","D","1","indo0123","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("104","24","","B","1","indo0124","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("105","25","","B","1","indo0125","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("106","26","","C","1","indo0126","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("107","27","","C","1","indo0127","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("108","28","","D","1","indo0128","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("109","29","","C","1","indo0129","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("110","30","","B","1","indo0130","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("111","31","","A","1","indo0131","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("112","32","","B","1","indo0132","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("113","33","","D","1","indo0133","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("114","34","","D","1","indo0134","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("115","35","","C","1","indo0135","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("116","36","","B","1","indo0136","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("117","37","","A","1","indo0137","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("118","38","","C","1","indo0138","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("119","39","","B","1","indo0139","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("120","40","","D","1","indo0140","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("121","41","","B","1","indo0141","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("122","42","","C","1","indo0142","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("123","43","","B","1","indo0143","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("124","44","","C","1","indo0144","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("125","45","","C","1","indo0145","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("126","46","","D","1","indo0146","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("127","47","","B","1","indo0147","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("128","48","","D","1","indo0148","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("129","49","","B","1","indo0149","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("130","50","","D","1","indo0150","2")');






tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("131","01","","C","2","indo0201","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("132","02","","A","2","indo0202","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("133","03","","D","2","indo0203","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("134","04","","A","2","indo0204","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("135","05","","C","2","indo0205","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("136","06","","C","2","indo0206","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("137","07","","B","2","indo0207","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("138","08","","B","2","indo0208","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("139","09","","A","2","indo0209","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("140","10","","D","2","indo0210","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("141","11","","B","2","indo0211","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("142","12","","B","2","indo0212","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("143","13","","A","2","indo0213","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("144","14","","B","2","indo0214","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("145","15","","C","2","indo0215","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("146","16","","D","2","indo0216","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("147","17","","B","2","indo0217","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("148","18","","D","2","indo0218","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("149","19","","D","2","indo0219","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("150","20","","A","2","indo0220","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("151","21","","C","2","indo0221","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("152","22","","B","2","indo0222","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("153","23","","B","2","indo0223","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("154","24","","C","2","indo0224","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("155","25","","C","2","indo0225","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("156","26","","B","2","indo0226","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("157","27","","A","2","indo0227","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("158","28","","B","2","indo0228","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("159","29","","C","2","indo0229","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("160","30","","C","2","indo0230","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("161","31","","B","2","indo0231","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("162","32","","D","2","indo0232","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("163","33","","C","2","indo0233","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("164","34","","C","2","indo0234","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("165","35","","A","2","indo0235","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("166","36","","C","2","indo0236","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("167","37","","C","2","indo0237","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("168","38","","A","2","indo0238","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("169","39","","A","2","indo0239","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("170","40","","B","2","indo0240","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("171","41","","A","2","indo0241","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("172","42","","A","2","indo0242","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("173","43","","A","2","indo0243","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("174","44","","A","2","indo0244","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("175","45","","C","2","indo0245","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("176","46","","D","2","indo0246","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("177","47","","D","2","indo0247","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("178","48","","A","2","indo0248","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("179","49","","A","2","indo0249","2")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("180","50","","A","2","indo0250","2")');




tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("181","01","","D","1","bing0101","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("182","02","","C","1","bing0102","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("183","03","","B","1","bing0103","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("184","04","","A","1","bing0104","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("185","05","","D","1","bing0105","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("186","06","","C","1","bing0106","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("187","07","","C","1","bing0107","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("188","08","","B","1","bing0108","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("189","09","","D","1","bing0109","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("190","10","","D","1","bing0110","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("191","11","","D","1","bing0111","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("192","12","","A","1","bing0112","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("193","13","","B","1","bing0113","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("194","14","","C","1","bing0114","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("195","15","","D","1","bing0115","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("196","16","","C","1","bing0116","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("197","17","","D","1","bing0117","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("198","18","","C","1","bing0118","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("199","19","","C","1","bing0119","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("200","20","","D","1","bing0120","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("201","21","","B","1","bing0121","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("202","22","","D","1","bing0122","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("203","23","","B","1","bing0123","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("204","24","","A","1","bing0124","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("205","25","","D","1","bing0125","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("206","26","","B","1","bing0126","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("207","27","","C","1","bing0127","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("208","28","","D","1","bing0128","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("209","29","","B","1","bing0129","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("210","30","","C","1","bing0130","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("211","31","","D","1","bing0131","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("212","32","","B","1","bing0132","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("213","33","","C","1","bing0133","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("214","34","","A","1","bing0134","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("215","35","","C","1","bing0135","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("216","36","","B","1","bing0136","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("217","37","","C","1","bing0137","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("218","38","","A","1","bing0138","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("219","39","","B","1","bing0139","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("220","40","","A","1","bing0140","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("221","41","","B","1","bing0141","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("222","42","","C","1","bing0142","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("223","43","","D","1","bing0143","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("224","44","","A","1","bing0144","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("225","45","","C","1","bing0145","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("226","46","","B","1","bing0146","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("227","47","","A","1","bing0147","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("228","48","","C","1","bing0148","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("229","49","","D","1","bing0149","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("230","50","","A","1","bing0150","3")');






tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("231","01","","C","2","bing0201","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("232","02","","D","2","bing0202","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("233","03","","B","2","bing0203","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("234","04","","A","2","bing0204","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("235","05","","B","2","bing0205","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("236","06","","C","2","bing0206","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("237","07","","B","2","bing0207","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("238","08","","B","2","bing0208","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("239","09","","D","2","bing0209","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("240","10","","C","2","bing0210","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("241","11","","C","2","bing0211","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("242","12","","C","2","bing0212","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("243","13","","C","2","bing0213","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("244","14","","C","2","bing0214","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("245","15","","A","2","bing0215","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("246","16","","B","2","bing0216","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("247","17","","C","2","bing0217","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("248","18","","C","2","bing0218","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("249","19","","C","2","bing0219","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("250","20","","A","2","bing0220","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("251","21","","A","2","bing0221","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("252","22","","B","2","bing0222","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("253","23","","D","2","bing0223","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("254","24","","C","2","bing0224","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("255","25","","B","2","bing0225","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("256","26","","C","2","bing0226","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("257","27","","A","2","bing0227","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("258","28","","C","2","bing0228","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("259","29","","B","2","bing0229","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("260","30","","D","2","bing0230","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("261","31","","C","2","bing0231","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("262","32","","B","2","bing0232","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("263","33","","D","2","bing0233","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("264","34","","C","2","bing0234","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("265","35","","C","2","bing0235","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("266","36","","B","2","bing0236","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("267","37","","B","2","bing0237","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("268","38","","A","2","bing0238","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("269","39","","B","2","bing0239","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("270","40","","A","2","bing0240","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("271","41","","A","2","bing0241","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("272","42","","A","2","bing0242","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("273","43","","A","2","bing0243","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("274","44","","D","2","bing0244","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("275","45","","C","2","bing0245","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("276","46","","B","2","bing0246","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("277","47","","A","2","bing0247","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("278","48","","A","2","bing0248","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("279","49","","B","2","bing0249","3")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("280","50","","D","2","bing0250","3")');




tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("281","01","","B","1","ipa0101","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("282","02","","C","1","ipa0102","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("283","03","","B","1","ipa0103","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("284","04","","A","1","ipa0104","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("285","05","","B","1","ipa0105","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("286","06","","B","1","ipa0106","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("287","07","","B","1","ipa0107","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("288","08","","D","1","ipa0108","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("289","09","","C","1","ipa0109","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("290","10","","A","1","ipa0110","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("291","11","","C","1","ipa0111","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("292","12","","C","1","ipa0112","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("293","13","","D","1","ipa0113","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("294","14","","A","1","ipa0114","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("295","15","","D","1","ipa0115","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("296","16","","C","1","ipa0116","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("297","17","","D","1","ipa0117","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("298","18","","B","1","ipa0118","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("299","19","","C","1","ipa0119","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("300","20","","D","1","ipa0120","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("301","21","","B","1","ipa0121","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("302","22","","A","1","ipa0122","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("303","23","","B","1","ipa0123","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("304","24","","D","1","ipa0124","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("305","25","","A","1","ipa0125","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("306","26","","D","1","ipa0126","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("307","27","","B","1","ipa0127","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("308","28","","A","1","ipa0128","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("309","29","","C","1","ipa0129","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("310","30","","B","1","ipa0130","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("311","31","","B","1","ipa0131","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("312","32","","B","1","ipa0132","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("313","33","","C","1","ipa0133","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("314","34","","A","1","ipa0134","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("315","35","","A","1","ipa0135","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("316","36","","D","1","ipa0136","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("317","37","","B","1","ipa0137","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("318","38","","C","1","ipa0138","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("319","39","","D","1","ipa0139","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("320","40","","D","1","ipa0140","4")');




tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("321","01","","B","2","ipa0201","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("322","02","","D","2","ipa0202","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("323","03","","B","2","ipa0203","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("324","04","","D","2","ipa0204","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("325","05","","D","2","ipa0205","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("326","06","","A","2","ipa0206","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("327","07","","B","2","ipa0207","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("328","08","","C","2","ipa0208","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("329","09","","C","2","ipa0209","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("330","10","","D","2","ipa0210","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("331","11","","A","2","ipa0211","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("332","12","","C","2","ipa0212","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("333","13","","A","2","ipa0213","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("334","14","","C","2","ipa0214","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("335","15","","C","2","ipa0215","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("336","16","","B","2","ipa0216","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("337","17","","C","2","ipa0217","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("338","18","","D","2","ipa0218","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("339","19","","C","2","ipa0219","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("340","20","","B","2","ipa0220","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("341","21","","B","2","ipa0221","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("342","22","","C","2","ipa0222","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("343","23","","D","2","ipa0223","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("344","24","","D","2","ipa0224","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("345","25","","B","2","ipa0225","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("346","26","","D","2","ipa0226","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("347","27","","C","2","ipa0227","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("348","28","","A","2","ipa0228","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("349","29","","C","2","ipa0229","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("350","30","","A","2","ipa0230","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("351","31","","C","2","ipa0231","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("352","32","","D","2","ipa0232","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("353","33","","B","2","ipa0233","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("354","34","","A","2","ipa0234","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("355","35","","C","2","ipa0235","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("356","36","","C","2","ipa0236","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("357","37","","D","2","ipa0237","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("358","38","","B","2","ipa0238","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("359","39","","B","2","ipa0239","4")');
tx.executeSql('insert into tbjawab(id,nomor,jawab,kunci,tryout,gambar,idmapel) values ("360","40","","B","2","ipa0240","4")');

 }

function successinsertData() {
   // alert("sukses insert");
}



function tampilmapel() {
   db.transaction(querytampilmapel, errorCB);    

}

function querytampilmapel(tx) {
  
tx.executeSql('SELECT * FROM DEMO where ID=?', [idmapel], querySuccesstampilmapel, errorCB);

}

function querySuccesstampilmapel(tx, results) {
      myApp.showIndicator();
    mapel = new Array();
    var len = results.rows.length;

      
        for (var i=0; i<len; i++){
       
            mapel[i] = {"id": results.rows.item(i).id,"nama":results.rows.item(i).nama,"soal":results.rows.item(i).soal,"waktu":results.rows.item(i).waktu,"gambar":results.rows.item(i).gambar};
        }
    
  
    mainView.router.load({url:'konfirmasi.html', context:{nama: mapel[0]['nama'],soal: mapel[0]['soal'],waktu: mapel[0]['waktu'],gambar: mapel[0]['gambar']}});
   
 
     idmapel=mapel[0]['id'];

     nama_mapel=mapel[0]['nama'];

     waktu=mapel[0]['waktu'];
    
     jumlah_soal=mapel[0]['soal'];
    gambar=mapel[0]['gambar'];
   
 
    
      myApp.hideIndicator();
  
}







 
function tampilsoal() {
   db.transaction(querytampilsoal, errorCB);    

}

function querytampilsoal(tx) {
 
tx.executeSql(' SELECT * FROM tbjawab where idmapel=? and tryout=?', [idmapel,tryout], querySuccesstampilsoal, errorCB);

}

function querySuccesstampilsoal(tx, results) {
      myApp.showIndicator();
    var jawaban='';
    var tjawab='';
    var ejawab='';
    
    soal='';
    document.getElementById("fjawaban").innerHTML = '';
    arrayjawaban = new Array();
    var len = results.rows.length;
    
        for (var i=0; i<len; i++){
             tjawab=results.rows.item(i).jawab;
            if (tjawab==null){
                ejawab='<span class="badge color-red">_</span>';
            }else{
                ejawab='<span class="badge color-blue">'+tjawab+'</span>';
            }
            
            arrayjawaban[i] = {"id": results.rows.item(i).id,"kunci":results.rows.item(i).kunci,"jawab":results.rows.item(i).jawab,"gambar":results.rows.item(i).gambar};
          soal=soal+ '<div class="swiper-slide"  style="overflow: auto;"><div class="swiper-zoom-container"><img src="image/'+results.rows.item(i).gambar+'.png" style="width:100%; height: auto;" ></div></div> ';
         
            jawaban=jawaban + '<li> '  +
                                                        '<a href="#" class="item-link close-panel" onclick="kenomor(\'' + (i+1) + '\')"> ' +
                                                        '<div class="item-content">'+
                                                        '<div class="item-inner">'+
                                                        '<div class="item-title">No. '+(i+1)+'</div>'+
                                                        '<div class="item-after" id="ejawab'+(i+1)+'">' +
                                                        ejawab +
                                                        '</div>'+
                                                        '</div>'+
                                                        '</div>'+
                                                        '</a>'+
                                                        '</li>';
        }
  
  kesoal();
    document.getElementById("fjawaban").innerHTML = jawaban;
      myApp.hideIndicator();
 
}



function mulai(){

//tampilsoal();
  
  db.transaction(function (tx) {
            tx.executeSql('update tbjawab set jawab=null where idmapel="'+idmapel+'" and tryout="'+tryout+'"', [], querySuccesshapussoal, errorCB);

 });



       
}

function querySuccesshapussoal(tx, results){
hapus();
}

function hapus(){
         db.transaction(function (tx) {
            tx.executeSql('Select * from tbjawab where idmapel="'+idmapel+'" and tryout="'+tryout+'"', [], querySuccesstampilsoal, errorCB);

 }); 
}

function maju(){
     var mySwiper = $$('.swiper-container')[0].swiper;
     
   
    mySwiper.slideNext();
   
}

function mundur(){
     var mySwiper = $$('.swiper-container')[0].swiper;
    
   
    mySwiper.slidePrev();
   
}

function kesoal() {
    audio = new Audio();
  
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '   <div class="navbar-inner">' +
        '       <div class="left" ><a href="#" class="link open-panel" data-panel="left"><i class="f7-icons">bars</i> <div id="enomor">&nbsp; No. 1</div></a></div>' +
        '       <div class="center labeltext" id="clockdiv"><span class="days" hidden></span><span class="hours"></span>:<span class="minutes"></span>:<span class="seconds"></span></div>' +
        '       <div class="right">' +
        '          <a href="#" class="button button-fill  " onclick="tampil_popup()" style="background-color:#26343d;">Selesai' +
        '          </a>' +
        '        </div>' +
        '      </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="soal-pages" class="page">' +
       
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
      
        '<div class="swiper-custom " >' +
        '<div class="swiper-container swiper-init" data-speed="400" data-space-between="40" data-pagination=".swiper-pagination" data-paginationHide="true" data-zoom="true" data-zoomMax="3" data-zoomMin="1" data-zoomToggle="true" >' +
      
        '<div class="swiper-wrapper " >' +
        soal +
   
        '</div>' +
     
   
        '</div>' +
        '    </div>' +
        
      
        '</div>' +
        '       <div class="toolbar">' +
        '           <div class="toolbar-inner">' +
        '           <a href="#" class="button  "  onclick="mundur()"> <i class="f7-icons">left</i> </a>' +
        '           <a href="#" class="button " onclick="pilih_jawab(\'' + 'A' + '\')" id="ba">A</a>' +
        '           <a href="#" class="button " onclick="pilih_jawab(\'' + 'B' + '\')" id="bb">B</a>'+
        '           <a href="#" class="button " onclick="pilih_jawab(\'' + 'C' + '\')" id="bc">C</a>'+
        '           <a href="#" class="button " onclick="pilih_jawab(\'' + 'D' + '\')" id="bd">D</a>' +
       
        '           <a href="#" class="button  " onclick="maju()"><i class="f7-icons">right</i></a>'  +             
               '</div>'+
           ' </div>'+
        '  </div>' +
        '</div>' 

    );
    
   
	return;
}

function pilih_jawab(a){
    
       var mySwiper = $$('.swiper-container')[0].swiper;  
       var no_soal=mySwiper.activeIndex+1;
        var idsoal=arrayjawaban[no_soal-1]["id"];
       db.transaction(function (tx) {
           tx.executeSql('update tbjawab set jawab="'+a+'" where id="'+idsoal+'"', [], querySuccessjawabsoal, errorCB);
       })
    arrayjawaban[no_soal]["jawab"]=a;
    document.getElementById("ejawab"+no_soal).innerHTML = '<span class="badge color-blue">'+a+'</span>';

    $$('#ba').removeClass('active'); 
    $$('#bb').removeClass('active');
    $$('#bc').removeClass('active');
    $$('#bd').removeClass('active');
    $$('#be').removeClass('active');
    
    if (a=="A"){
       $$('#ba').addClass('active'); 
    }else if (a=="B"){
       $$('#bb').addClass('active'); 
    }else if (a=="C"){
       $$('#bc').addClass('active'); 
    }else if (a=="D"){
       $$('#bd').addClass('active'); 
    }else if (a=="E"){
       $$('#be').addClass('active'); 
    }
}

function querySuccessjawabsoal(){
  
}

function tampil_popup(){

   myApp.confirm('Tampilkan nilai?', 'Konfirmasi', function () {
       audio.pause();
        tampilnilai();
        myApp.popup('.popup-about');
       clearInterval(timeinterval);
       ubahlihat();
    });
}

function kenomor(nomor){

    var mySwiper = $$('.swiper-container')[0].swiper;  
    mySwiper.slideTo(nomor-2, 300, false);
    mySwiper.slideNext();
 
}

function tampilnilai(){

//tampilsoal();
  


  db.transaction(function (tx) {
            tx.executeSql('Select * from tbjawab where idmapel="'+idmapel+'" and tryout="'+tryout+'"', [], querySuccesstampilnilai, errorCB);

 });
       
}

function querySuccesstampilnilai(tx, results) {
      myApp.showIndicator();

    var len = results.rows.length;
    var benar=0;
    var salah=0;
    var kosong=0;
    var kunci='';
    var jawab='';
        for (var i=0; i<len; i++){
             jawab=results.rows.item(i).jawab;
             kunci=results.rows.item(i).kunci;
            
            if (kunci==jawab){
                benar=benar+1;
            }
            
            if (jawab==null){
                kosong=kosong+1;
            }
       
          if (jawab!=kunci && jawab!=null){
              salah=salah+1;
          }
        }
  
    //alert('benar:' + benar + ' salah:' + salah + ' kosong' + kosong + ' jumlah:' + jumlah_soal);
   

    
    var nilai=benar/jumlah_soal*100;
    
    
    
     var data = {
  labels: [
    "Benar",
    "Salah",
    "Kosong"
  ],
  datasets: [
    {
      data: [benar, salah, kosong],
      backgroundColor: [
        "#4cd964",
        "#ff3b30",
        "#26343d"
      ],
      hoverBackgroundColor: [
        "#8e8e93",
        "#8e8e93",
        "#8e8e93"
      ]
    }]
};
    Chart.pluginService.register({
  beforeDraw: function(chart) {
    var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

    ctx.restore();
    var fontSize = (height / 114).toFixed(2);
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";

    var text = nilai ,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

    ctx.fillText(text, textX, textY);
    ctx.save();
  }
});

var chart = new Chart(document.getElementById('myChart'), {
  type: 'doughnut',
  data: data,
  options: {
  	responsive: true,
    legend: {
      display: false
    }
  }
});
    
   
     document.getElementById("ebenar").innerHTML = 'Benar: ' + benar;
     document.getElementById("esalah").innerHTML = 'Salah: ' + salah;
     document.getElementById("ekosong").innerHTML ='Kosong: ' +  kosong;
    
    
    
    
      myApp.hideIndicator();
    
    

}


cekaktif();
function cekaktif(){
       db.transaction(function (tx) {
 
tx.executeSql(' SELECT * FROM tbaktivasi', [], querySuccesstampilaktivasi, errorCB);

})
}

function querySuccesstampilaktivasi(tx, results) {
      myApp.showIndicator();
  
   
   
            var len = results.rows.length;
     
    
        for (var i=0; i<len; i++){
             aktivasi=results.rows.item(i).aktif;
             lihat=results.rows.item(i).lihat;
          
        }
  

      myApp.hideIndicator();

}

function ubahlihat(){
       db.transaction(function (tx) {
 
tx.executeSql('update tbaktivasi set lihat="true"', [], querySuccessubahlihat, errorCB);

})
}

function querySuccessubahlihat(tx, results) {
      myApp.showIndicator();
  
   
   
      lihat='true';
  

      myApp.hideIndicator();

}

function ubahaktivasi(){
       db.transaction(function (tx) {
 
tx.executeSql('update tbaktivasi set aktif="true"', [], querySuccessubahaktivasi, errorCB);

})
}

function querySuccessubahaktivasi(tx, results) {
      myApp.showIndicator();
  
     
   
      aktivasi='true';
 
 
      myApp.hideIndicator();

}