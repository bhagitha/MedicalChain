var express = require('express');
var router = express.Router();
var ipfsAPI = require("ipfs-api");
var controller = require('./users')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'MediChain' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'MediChain' });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'MediChain' });
});

router.get('/doctor', function (req, res, next) {
  res.render('doctor', { title: 'MediChain' });
});

router.get('/patient', function (req, res, next) {
  res.render('patient', { title: 'MediChain' });
});

router.get('/patient_details', function (req, res, next) {
  res.render('patient_details', { title: 'MediChain' });
});

router.get('/patient_medical_details', function (req, res, next) {
  res.render('patient_medical_details', { title: 'MediChain' });
});

router.get('/paramedical', function (req, res, next) {
  res.render('paramedical', { title: 'MediChain' });
});

router.get('/share_patient_details', function (req, res, next) {
  res.render('share_patient_details', { title: 'MediChain' });
});

router.post('/login', async function (req, res, next) {
  let Controller = new controller();
  let dataLogin = await message.methods.getLogin(req.body.mobile)
    .call({ from: coinbase })
  // .then((response) => {
  //   console.log("server response", response);
  //   if (req.body.password == response._password) {
  //     if (response._actorType == '1') {
  //       console.log("one");
  //       res.render("patient", { title: 'MediChain' });
  //     } else if (response._actorType == '2') {
  //       console.log("two");
  //       res.render("doctor", { title: 'MediChain' });
  //     }
  //     else if (response._actorType == '3') {
  //       console.log("three");
  //       res.render("paramedical", { title: 'MediChain' });
  //     }
  //     else {
  //       res.render("login ", { title: 'MediChain' });
  //     }
  //   }
  // }) 
  if (req.body.password == dataLogin._password) {
    if (dataLogin._actorType == '1') {
      console.log("one");
      res.render("patient", { title: 'MediChain' });
    } else if (dataLogin._actorType == '2') {
      console.log("two");
      res.render("doctor", { title: 'MediChain' });
    }
    else if (dataLogin._actorType == '3') {
      console.log("three");
      res.render("paramedical", { title: 'MediChain' });
    }
    else {
      res.send({ res: dataLogin });
    }
  }
  console.log("dataLogin", dataLogin)

  console.log("dataLogin", dataLogin)

  // res.render('login', { title: 'MediChain' });
});

router.post('/register', function (req, res, next) {
  data = req.body;
  console.log(data);
  message.methods.setActorProfile(data.name, data.age, data.mobile, data.gender, data.address, data.password, data.sel_type)
    .send({ from: coinbase, gas: 4721975 }).then((tx) => {
      res.send(tx)
    })
});


router.post('/upload', function (req, res, next) {
  pid = req.body.phone;
  fileBytes = req.files.report.data;

  console.log("ID", pid);
  console.log("fileBytes", fileBytes);

  const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' });

  ipfs.files.add(fileBytes, function (err, file) {
    if (err) throw err;
    ifpsHash = file[0].hash;
    console.log("ipfs hash", ifpsHash);
    message.methods.setReport(pid, ifpsHash).send({ from: coinbase, gas: 4721975 }).then(function (result) {
      res.send(result);
    })

  });

});

router.post('/getreport', async function (req, res, next) {
  phno = req.body.phone;
  let ipfspath = [];
  let ipfs = [];
  let limit = await message.methods.certificatieCount(phno)
    .call({ from: coinbase })
  console.log("limit", limit);
  var arr = [];
  for (i = 1; i <= limit; i++) {
    console.log("ghh", i);
    arr[i] = await message.methods.getReport(phno, i).call({ from: coinbase })
    console.log(arr[i])
    ipfspath[i] = 'https://ipfs.io/ipfs/' + arr[i];
    ipfs = ipfspath;
    //res.render('patient_medical_details', { data: [value] })
  }
  let hashes = {};
  hashes["ipfs"] = ipfs;
  console.log("ipfspath", [hashes])
    res.render('patient_details', { data: [hashes] })


});

router.post('/getpatientreport', async function (req, res, next) {
  let phno = req.body.phone;
  let ipfspath = [];
  let ipfs = [];
  let limit = await message.methods.certificatieCount(phno)
    .call({ from: coinbase })
  console.log("limit", limit);
  var arr = [];
  for (i = 0; i < limit; i++) {
    console.log("ghh", i);
    arr[i] = await message.methods.getReport(phno, i).call({ from: coinbase })
    console.log(arr[i])
    ipfspath[i] = 'https://ipfs.io/ipfs/' + arr[i];
    ipfs = ipfspath;
    //res.render('patient_medical_details', { data: [value] })
  }
  let hashes = {};
  hashes["ipfs"] = ipfs;
  console.log("ipfspath", hashes)
    res.render('patient', { data: [hashes] })



  // res.send("certificate uploaded");
});


router.post('/searchPatient', async function (req, res, next) {
  phone = req.body.search_no;
  console.log("phone", phone);
  let searchData = await message.methods.getActorProfile(phone)
    .call({ from: coinbase })

  console.log("searchData", searchData)
  res.render('patient_medical_details', { data: [searchData] })
});



module.exports = router;
