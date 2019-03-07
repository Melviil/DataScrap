var profiles = [["Nom","Prénom", "Ecole", "Entreprise","Email", "Téléphone"]];
var profilesSeen = [];
var InfoAlreadyget = false;
if (window.location.href.startsWith('https://www.linkedin.com/in/') && !window.location.href.endsWith("/detail/contact-info/")) {
  isNew(window.location.href);


}


// When Clicking on the Add button
$('#AddPeople').click(function(){
  // get the name
  console.log(window.InfoAlreadyget)

  if (document.getElementsByClassName('pv-top-card-v2-section__link--contact-info')[0]){
      eventFire(document.getElementsByClassName('pv-top-card-v2-section__link--contact-info')[0], 'click');
        window.setInterval(function(){
          if ( window.InfoAlreadyget  == false){
            getAllInfo();
          }
          }, 1000);

  }else{
    getBasicsInfo();
  }


});

  //$(".pv-top-card-v2-section__link--contact-info").first().trigger("click");
  //jQuery('.pv-top-card-v2-section__link--contact-info')[0].click();

function getAllInfo(){

  var emailDOM = $("section.pv-contact-info__contact-type.ci-email a");
  var phoneDOM = $("section.pv-contact-info__contact-type.ci-phone span");
  var contactDOM = $("section.pv-contact-info__contact-type");
  console.log(window.InfoAlreadyget)
  if ( window.InfoAlreadyget  == false){
    if ( contactDOM.length > 0 ) { // when the popup is open, we take all the data
      console.log(window.InfoAlreadyget)

      window.InfoAlreadyget = true;
      console.log(emailDOM.length);
      console.log(phoneDOM.length);
      var fullname = $("h1.pv-top-card-section__name").first().text();
      var fullnamesplit = fullname.split(" ");
      console.log(fullnamesplit);
      var firstname = fullnamesplit[6]; // FIRST NAME
      var surname = fullnamesplit[7] + " " + fullnamesplit[8];
      surname = surname.substring(0, surname.length - 2); // SURNAME
      var schoolDOM = $(".pv-top-card-v2-section__school-name");
      var school = "";
      if ( schoolDOM.length){ // if has school
        school = schoolDOM.first().text(); // SCHOOL
        school = school.substring(0, school.length - 2);; // remove 2 backslash at the end
      }
      var companyDOM = $(".pv-top-card-v2-section__company-name");
      var company = "";
      if (companyDOM.length){ // if has company
        company = companyDOM.first().text(); // COMPANY
        company = company.substring(0, company.length - 2); // remove 2 backslash at the end
      }

      var email = "";
      if ( emailDOM.length){ // if has email
        email = emailDOM.text(); // COMPANY
        email = email.substring(11, email.length - 9);

      }else{
        emailDOM = $("section.pv-contact-info__contact-type.ci-ims .pv-contact-info__contact-item");
        if(emailDOM.length){
          email = emailDOM.text();
          email = email.substring(11, email.length - 9);
        }
      }
      var phone  = "";
      if ( phoneDOM.length){ // if has email
        phone = phoneDOM.text(); // COMPANY
        phone = phone.substring(0, phone.length - 9);

      }


      profiles.push([firstname, surname, school, company, email, phone]);

      console.log(profiles); // NEW SAVED PROFILE
      newProfiles(profiles);
      eventFire(document.getElementsByClassName('artdeco-dismiss')[0], 'click');
    }
  }
}



function getBasicsInfo(){
  var fullname = $("h1.pv-top-card-section__name").first().text();
  var fullnamesplit = fullname.split(" ");
  console.log(fullnamesplit);
  var firstname = fullnamesplit[6]; // FIRST NAME
  var surname = fullnamesplit[7] + " " + fullnamesplit[8];
  surname = surname.substring(0, surname.length - 1); // SURNAME
  var schoolDOM = $(".pv-top-card-v2-section__school-name");
  var school = "";
  if ( schoolDOM.length){ // if has school
    school = schoolDOM.first().text(); // SCHOOL
    school = school.substring(0, school.length - 2);; // remove 2 backslash at the end
  }
  var companyDOM = $(".pv-top-card-v2-section__company-name");
  var company = "";
  if (companyDOM.length){ // if has company
    company = companyDOM.first().text(); // COMPANY
    company = company.substring(0, company.length - 2); // remove 2 backslash at the end
  }

  profiles.push([firstname, surname, school, company]);

  console.log(profiles); // NEW SAVED PROFILE
  newProfiles(profiles);
  $("#AddPeople").hide();
}


function newProfiles(newProfiles){
  // update the database puttin the
  chrome.storage.local.set({"profiles": newProfiles});
}

function addButton(){
  console.log($("#AddPeople"));
  if ( $("#AddPeople").length == 0 ){
    var profileOthers = $(".pv-top-card-v2-section__actions.mt2.display-flex");
    if (profileOthers.length){
      profileOthers.append('<span class="pv-s-profile-actions__overflow ember-view">'
          + '<button aria-label="Add" aria-expanded="false" id="AddPeople" class="pv-s-profile-actions__overflow-toggle  button-secondary-large-muted mr2 mt2 artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view">'
            + '<span class="artdeco-button__text">Ajouter</span>'
              + '</button>  '
        + '</span>');
    }
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'hello!') {
      console.log(request.url)
      isNew(request.url);
    }
});
  // is the new URL an URL that we saw already ?
function isNew(url){
  if ( !window.profilesSeen.includes(url)){ // if we didn't see the profile yet
    console.log("new");
    addButton();
    window.InfoAlreadyget = false;
    window.profilesSeen.push(url);
  }
}
function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
