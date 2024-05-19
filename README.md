        Education  (get,create)
medicalSchool, 
educated, 
degree
year

        Medical Board License  (get,create)
country, 
lisence of state, 
lisence number,
npi number, 
date, 
certificateImage


        certifications (get,create) 
certificate name, 
year, 
image

        Awards  (get,create)
award name, 
year, 
image

        Languages  (get,create)
id, 
name,


        User  (create : signup , update: profileUpdate, get: profile  detail:  post: signin, put: forgetPassword, put: verificationCodeVerify, put: passwordUpdate with verification code , put: basic profile update, put: password update with login, put:profile picture update, get: doctor list with filter:rating  ) 
id 
firstName (text)
middleName (text)
lastName (text)
phoneNumber (text)
email(text)
password (text)
npiNumber(text)
insuranceID(image)
driving lisence (image)
age : text

education(Medical, Residency, Fellowship)  (select field : text)
suffix(MD, DO, LAC) (select field : text)
boardCertified(Yes, Eligible, No  : text)
hospitalAffiliate(Yes, Eligible, No : text )
hospitalName: text
... oneMany(Education)
... oneMany(Medical Board License)
... oneMany(Certifications)
... oneMany(Awards)


faculty appoinment (yes/no)
title
Accepted insurance plan (Aetna, AmeriHealth, BlueCross BlueShield, Cigna) multi select (for now one at a time so text type) 

provider office location, 
provider city, 
provider street,
provider zip code, 
provider state, 
provider suite 

office days (mon - fri, mon-sat) select ,text
office hours(9am to 1pm, 9am to 2pm) select, text
website text
... oneMany(Languages)
verificationCode  text 
verificationStatus
password
profilePicture

# Doctor getSUbscriptionPlans
        Subscriptions   (create, get)
title, 
months, 
description, 
price  


        Payment   (create, get)
transactionId, 
doctorId, 
description, 
price ,
status ,
date ,




            Appoinment Booking  (Get: List of all bookings by doctor/patient , Get: booking Detail by Id, Post: Book appoinment, Put: Update appoinment , Put: Send booking Request (Accept/Reject) ) Filter (gender, date status)

id
patientName
patientDisease
patientDescription
patientAge
patientGender
date
time
diagnosedCondition
status
allergies
medications
status (pending, accept,reject)
statusReason (pending, accept,reject)
statusReasonDetail




            Notifications (Post: Create, Get : List of notifications )
ID
title
description
icon
date
time
notificationFrom
notificationTo


            Contact (Post: Create, Get : List of forms )
id
name
email
message
userId
userRole
date


            Reviews

id
rating
Review
status
date
reviewTo
reviewFrom
whouldYouRecommend ? (yes/no)





            FavouriteDoctor (Post: Make Doctor Favourite, Delete: Remove Doctor from favourite)

doctorId
patientID
date



                        //skin specialist, dentist, urologist     

            Specialities
id
title
status
date

            Sub Specialities
id
title
speciality_id
status
date


















                    Patient  (create : signup , update: profileUpdate, get: profile  detail:  post: signin, put: forgetPassword, put: verificationCodeVerify, put: passwordUpdate with verification code , put: basic profile update, put: password update with login, put:profile picture update) 
id 
firstName (text)
middleName (text)
lastName (text)
phoneNumber (text)
email(text)
password (text)
dob
gender
race

mailing address home address 
mailing address home city,
mailing address home state,
mailing address home zip code,
mailing address home street,
mailing address home suite

mailing address work address 
mailing address work city,
mailing address work state,
mailing address work zip code,
mailing address work street,
mailing address work suite

provider  home address 
provider  home city,
provider  home state,
provider  home zip code,
provider  home street,
provider  home suite
 
provider  work address 
provider  work city,
provider  work state,
provider  work zip code,
provider  work street,
provider  work suite


preferred provider age
preferred provider gender
preferred provider insurance

id_attachment
driving_lisence_attachment
passport_attachment

verificationCode  text 
verificationStatus
password
profilePicture
