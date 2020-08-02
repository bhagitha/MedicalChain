pragma solidity >=0.4.22 <0.7.0;


contract Storage {

   enum gender {male, female, other}

    struct actorsProfile {
        string name;
        uint age;
        uint phone;
        gender actorGender;
        string actorAddress;
        string password;
        uint actorType;
    }
       
   mapping (uint => actorsProfile) actor;
   mapping(uint => uint) public certificatieCount;
   mapping(uint => uint) public MedicertificatieCount;

   function setActorProfile(string memory _name,uint _age,uint _phone,gender _actorGender,string memory _actorAddress,string memory _password,uint _actorType) public  {
       actor[_phone]=actorsProfile(_name,_age,_phone,_actorGender,_actorAddress,_password,_actorType);
       
   }
   
   function getActorProfile(uint _phone) public view returns (string memory _name,uint _age,gender _actorGender,string memory _actorAddress){
       _name = actor[_phone].name;
       _age = actor[_phone].age;
       _actorGender = actor[_phone].actorGender;
       _actorAddress = actor[_phone].actorAddress;
       
   }

   function getLogin(uint _phone) public view returns (string memory _password, uint _actorType){
       _password = actor[_phone].password;
       _actorType = actor[_phone].actorType;
   }

   mapping(uint => mapping(uint =>string))  certificateHash;
   
   
   function setReport(uint _phno, string memory _certificateHash) public {
       certificatieCount[_phno] += 1;
       certificateHash[_phno][certificatieCount[_phno]] = _certificateHash;
   }
   
   function getReport(uint _phno, uint _certificatieCount) public view returns (string memory _certificateHash ) {
      _certificateHash = certificateHash[_phno][_certificatieCount];
   }

   mapping(uint => mapping(uint =>string))  MedicertificateHash;

    function setMediReport(uint _phno, string memory _certificateHash) public {
       MedicertificatieCount[_phno] += 1;
       MedicertificateHash[_phno][MedicertificatieCount[_phno]] = _certificateHash;
   }
   
   function getMediReport(uint _phno, uint _medicertificatieCount) public view returns (string memory _certificateHash ) {
      _certificateHash = MedicertificateHash[_phno][_medicertificatieCount];
   }
}