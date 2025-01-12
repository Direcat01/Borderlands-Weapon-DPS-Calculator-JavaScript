// Borderlands DPS Calculator - JavaScript edition!
//============================================================================
// v0.06 - allowed "DamagexPellets" (ie. 7x18) damage to be calculated.
//       - adjusted textbox widths on html file.
// v0.05 - added guardian rank passive bonuses to calculator.
//       - reload speed passive bonus is bugged so I disabled it.
//       - updated html form to reflect new changes.
// v0.04 - added elemental damage and element chance to the math formula.
//       - updated the html file to include an option to add elemental data.
//       - cleaned up javascript code (removed redundant code).
//       - added a newer error alert code.
//       - added new functions to calculator.
// v0.03 - introduced an html file with form elements that can be manipulated
//       - adjusted code in the javascript. added css code to html file.
// v0.02 - added an error alert function
//       - updated safety checks
//       - fixed an accidental bug in code.
// v0.01 - initial start of project totally works
//============================================================================

//wep dmg, wep acc, wep reload, wep firerate, wep mag size, ele damage, ele chance
var WeaponDamage; var WeaponAccu; var ReloadSpeed;
var FireRate; var MagSize; var ElementalDamage; var ElementalChance;
var guardWepDMG; var guardWepACC; var guardWepRS; var guardWepFR;
var b_gd_p; var b_gacc_p; var b_grs_p; var b_gfr_p;
var secMF = 0; var secMFR = 0; var TotalMagDamage = 0; var FinalDPS;
var FinalDPS; var AlertMSG; var resAcc; var resDmg; var resFr; var resRs;
function ErrAlert(eCode, objName){
	let oN = objName;
	switch(eCode){
		case 0:
			AlertMSG = '[Error 0] - Cannot compute ${oN} is less than one';
			document.getElementById('CalcDPS').value = AlertMSG;
		break;
		case 1:
			AlertMSG = '[Error 1] - ${oN} does not contain valid numbers';
			document.getElementById('CalcDPS').value = AlertMSG;
		break;
	}
}
function BLCalculate(){
		if (ElementalDamage < 1 || ElementalChance < 1 || isNaN(ElementalDamage) || isNaN(ElementalChance)) {
			BLC(0); //base calculations.
		} else if (isNaN(WeaponAccu) || WeaponAccu < 1) { //no weapon accuracy :)
			BLC(1); //base + elemental calculations.
		} else { //hopefully they have weapon accuracy.
			BLC(2);
		}
	}
function BLC(choice){
	switch(choice){
		case 0:
			reg_calc();
			break;
		case 1:
			ele_calc();
			break;
		case 2:
			ele_acc_calc();
			break;
		case 3:
			guard_ele_acc_calc(); 
	}
}
function run_datacheck(){ //runs a small input data check.
	//if base values have no valid numbers we cannot compute.
	if (isNaN(MagSize)) {
		ErrAlert(1,"magazine size");
	}
	if (isNaN(FireRate)) {
		ErrAlert(1,"firerate");
	}
	if (isNaN(ReloadSpeed)) {
		ErrAlert(1,"reload speed");
	}	
	if (isNaN(WeaponDamage)) {
		ErrAlert(1,"weapon damage");
	}
	//if base values are less than 1 than we cannot compute.
	if (MagSize < 1) {
		ErrAlert(0,"magazine size");
	}
	if (FireRate < 1) {
		ErrAlert(0,"firerate");
	}
	if (WeaponDamage < 1) {
		ErrAlert(0,"weapon damage");
	}
	if (ReloadSpeed < 1) {
		ErrAlert(0,"reload speed");
	}
}
function ele_calc(){ //calculate with elemental chance/damage.
	var NewDPS = parseFloat(WeaponDamage.replace('x','*')); //cheap fix for weapons that have 128x17
	run_datacheck();

	let secEle = parseFloat((ElementalChance / 1000) * 10).toFixed(3); //0.345% ?
	let secMF = parseFloat(MagSize / FireRate);
	let secMFR = parseFloat(secMF + ReloadSpeed);
	let zebra = parseFloat(ElementalDamage * secEle);
	let TotalMagDamage = parseFloat(MagSize * NewDPS);
	let FinalDPS = parseFloat(((TotalMagDamage / secMFR) + zebra)).toFixed(3);; 

	x = FinalDPS.toString();

    document.getElementById('CalcDPS').value = x;
	console.log("Weapon DPS (+Elemental): " + x);
}
function ele_acc_calc(){ //calculate with elemental chance/damage with base accuracy data.
	var NewDPS = parseFloat(WeaponDamage.replace('x','*')); //cheap fix for weapons that have 128x17
	run_datacheck();

	let secEle = parseFloat((ElementalChance / 1000) * 10).toFixed(3); //34.5 = 0.345% ?
	let secAcc = parseFloat((WeaponAccu / 1000) * 10).toFixed(3); //convert accuracy to a percentage!
	let secMF = parseFloat(MagSize / FireRate);
	let secMFR = parseFloat(secMF + ReloadSpeed);
	let zebra = parseFloat(ElementalDamage * secEle);
	let TotalMagDamage = parseFloat(MagSize * NewDPS);
	let FinalDPS = parseFloat(secAcc * (((TotalMagDamage / secMFR) + zebra))).toFixed(2); 

	x = FinalDPS.toString();

    document.getElementById('CalcDPS').value = x;
	console.log("Weapon DPS (+Elemental+Accuracy): " + x);
}

function roundNumber(number, decimals) {
    var newnumber = new Number(number+'').toFixed(parseInt(decimals));
    return parseFloat(newnumber); 
}
function insertDecimal(num) {
	return Number((num / 100).toFixed(2));
 }

 function sum(input){
             
	if (toString.call(input) !== "[object Array]")
	   return false;
		 
			   var total =  0;
			   for(var i=0;i<input.length;i++)
				 {                  
				   if(isNaN(input[i])){
				   continue;
					}
					 total += Number(input[i]);
				  }
				return total;
			   }

function guard_ele_acc_calc(){ //calculate with elemental chance/damage with base accuracy data.
	run_datacheck();
	var NewDPS = parseFloat(WeaponDamage.replace('x','*')); //cheap fix for weapons that have 128x17

	let b_gd_p = parseFloat((guardWepDMG / 1000) * 10).toFixed(3); //bonus damage
	console.log("b_gd_p:" + b_gd_p);
	let b_gacc_p = parseFloat((guardWepACC / 1000) * 10).toFixed(3); //bonus accuracy
	console.log("b_gacc_p: " + b_gacc_p);
	let b_grs_p = parseFloat((guardWepRS / 1000) * 10).toFixed(3); //bonus reload speed
	console.log("b_grs_p: " + b_grs_p);
	let b_gfr_p = parseFloat((guardWepFR / 1000) * 10).toFixed(2); //bonus fire rate
	console.log("b_gfr_p: " + b_gfr_p);
	let secEle = parseFloat((ElementalChance / 1000) * 10).toFixed(3); //34.5 = 0.345% ?
	console.log("secEle: " + secEle);
	let secAcc = parseFloat((WeaponAccu / 1000) * 10).toFixed(3); //convert accuracy to a percentage!
	console.log("secAcc: " + secAcc);
	var FrBonus = parseFloat((FireRate/1000)*10);
	FrBonus = FrBonus+1*b_gfr_p;
	console.log("FrBonus: " + FrBonus);
	let secMF = parseFloat(roundNumber((MagSize / FrBonus), 2));//* (1 + b_gfr_p))+"%"); //with bonus gun firerate
	console.log("secMF: " + secMF);
if (isNaN(guardWepRS) || guardWepRS < 1) { // gotta check ReloadSpeed
    let RsBonus = ReloadSpeed; // no change
    console.log(("RsBonus: " + RsBonus));
    secMFR = parseFloat(sum([secMF, ReloadSpeed]));//(secMF + RsBonus)+"%");
    console.log("secMFR: " + secMFR);
} else if (guardWepRS > 1) {
	console.log("ReloadSpeed = " + ReloadSpeed);
	let RsBonus2 = parseFloat(sum([ReloadSpeed, b_grs_p]));//Math.ceil(ReloadSpeed * b_grs_p);//RsBonus + 1 * insertDecimal(guardWepRS);// + 1 * b_grs_p;
	console.log(("RsBonus2: " + RsBonus2));
	secMFR = parseFloat(sum([secMF, RsBonus2]));//(secMF + RsBonus)+"%");
	console.log("secMFR: " + secMFR);
}
	let zebra = parseFloat(sum([ElementalDamage * secEle]).toFixed(3));
	console.log("zebra: " + zebra); //elemental reee
	let resDmg = parseFloat(sum([NewDPS * (1 + b_gd_p)])).toFixed(3);
	console.log("resDmg: " + resDmg);
	let TotalMagDamage = parseFloat(sum([MagSize * resDmg])).toFixed(3);
	console.log("TotalMagDamage: " + TotalMagDamage);
	resAcc = parseFloat(sum([secAcc * (1 + b_gacc_p)])).toFixed(4); //+ b_gacc_p); //bonus acc + acc
	console.log("Bonus resAcc: " + resAcc);
	let FinalDPS = parseFloat(sum([resAcc * (((TotalMagDamage / secMFR) + zebra))])).toFixed(2);
	console.log("FinalDPS: " + FinalDPS);
	x = FinalDPS;

    document.getElementById('CalcDPS').value = x;
	console.log("Weapon DPS (+Elemental+Accuracy): " + x);
}
function reg_calc(){ //calculate without elemental chance/damage.
	var NewDPS = parseFloat(WeaponDamage.replace('x','*')); //cheap fix for weapons that have 128x17
	
	run_datacheck();

	let secMF = parseFloat(MagSize / FireRate);
	let secMFR = parseFloat(sum([secMF, ReloadSpeed]));
	let TotalMagDamage = parseFloat(MagSize * NewDPS);
	let FinalDPS = parseFloat(TotalMagDamage / secMFR).toFixed(2); 

	x = FinalDPS.toString();
	console.log("Weapon DPS: " + x);
	document.getElementById('CalcDPS').value = x;
}
function submit(){ //grabs form values to use in javascript.
	WeaponDamage = document.getElementById("wDamage").value;
	WeaponAccu = document.getElementById("wAccu").value;
	MagSize = document.getElementById("wMagSize").value;
	ReloadSpeed = document.getElementById("wReloadSpeed").value;
	FireRate = document.getElementById("wFirerate").value;
	ElementalDamage = document.getElementById("wEleDamage").value;
	ElementalChance = document.getElementById("wEleChance").value;
	BLCalculate();
}
function submit2(){ //grabs form values to use in javascript. with guardian passives
	WeaponDamage = document.getElementById("wDamage").value;
	WeaponAccu = document.getElementById("wAccu").value;
	MagSize = document.getElementById("wMagSize").value;
	ReloadSpeed = document.getElementById("wReloadSpeed").value;
	FireRate = document.getElementById("wFirerate").value;
	ElementalDamage = document.getElementById("wEleDamage").value;
	ElementalChance = document.getElementById("wEleChance").value;
	//guardian passives
	guardWepDMG = document.getElementById("wGDB").value;
	guardWepFR = document.getElementById("wGFRB").value;
	guardWepACC = document.getElementById("wGAB").value;
	guardWepRS = 0; // document.getElementById("wGRSB").value;

	BLC(3);
}
function clearText(){ //clears out old values on form.
	document.getElementById('wDamage').value = '';
	document.getElementById('wAccu').value = '';
	document.getElementById('wMagSize').value = '';
	document.getElementById('wReloadSpeed').value = '';
	document.getElementById('wFirerate').value = '';
	document.getElementById('wEleDamage').value = '';
	document.getElementById('wEleChance').value = '';
	//guardian
	document.getElementById("wGDB").value = '';
	document.getElementById("wGFRB").value = '';
	document.getElementById("wGAB").value = '';
	
	document.getElementById('CalcDPS').value = '0';
}
function openGitHub(){
	window.open("https://github.com/LeftBased/Borderlands-Weapon-DPS-Calculator-JavaScript")
}
function openDonate(){
	window.open("https://paypal.me/internprimas")
}
