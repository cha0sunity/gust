 
const showResults = () => {
    let results = document.getElementById('results');
    let damagResults = document.getElementById('damage');
    const weaponDamageDice = document.getElementById('weapons');
    let attack = attackRoll()
    let damage = damageRoll(weaponDamageDice.value, attack.crit, attack.critFail)
    if (attack.crit) {
        results.innerHTML = "CRIT";
    } else if (attack.critFail) {
        results.innerHTML = "You Screwed Up!";
    } else {
        results.innerHTML = attack.roll;
    }
    
    damagResults.innerHTML = damage;
}

const attackRoll = () => {
    const greatWeaponMaster = document.getElementById('greatWeaponMaster');
    const advantage = document.getElementById('advantage');
    const disadvantage = document.getElementById('disadvantage');
    const strMod = document.getElementById('strength');
    let rollOne = dice(20);
    let rollTwo = dice(20);
    let rollFinal = rollOne;
    let prof = dice(6) + Number(strMod.value);
    let crit = false;
    let critFail = false;
    console.log('====================')
    console.log('roll 1: ' + rollOne)
    console.log('roll 2: ' + rollTwo)
        if (advantage.checked) {
            rollFinal = Math.max(rollOne,rollTwo)
        }
        if (disadvantage.checked) {
            rollFinal = Math.min(rollOne,rollTwo)
        }
        if (rollFinal == 20){
            crit = true
        }
        if (rollFinal == 1){
            critFail = true
        }
        if (greatWeaponMaster.checked) {
            rollFinal = rollFinal - 5;
        }
        return {
            roll : rollFinal + prof,
            crit : crit,
            critFail : critFail
        }


}

const damageRoll = (weapon, crit, critFail) => {
    const rage = document.getElementById('rage');
    const divineFury = document.getElementById('divineFury');
    const greatWeaponMaster = document.getElementById('greatWeaponMaster');
    const strMod = document.getElementById('strength');
    const level = document.getElementById('level');
    const halfLevel = Math.floor(level.value/2);
    let roll = dice(weapon);
    let df = dice(6) + halfLevel;
    console.log('=====df==================')
    console.log(halfLevel)
    console.log(df)
    console.log('=====df=================')
    let rageDamage = 2;
    let gwmDamage = 10;
    console.log('=======================')
    console.log('str - ' + Number(strMod.value))
    console.log('damage roll - ' + roll)
    console.log('divine fury - ' + df)
    console.log('rage - ' + rageDamage)
    console.log('GWM - ' + gwmDamage)
    if (critFail) {
        return 0;
    };
    if (divineFury.checked) {
        console.log("pre divine fury - " + roll)
        roll = roll + df;
        console.log("post divine fury - " + roll)
    };
    if (rage.checked) {
        console.log("pre rage - " + roll)
        roll = roll + rageDamage;
        console.log("post rage - " + roll)
    };
    if (greatWeaponMaster.checked) {
        console.log("pre gwm - " + roll)
        roll = roll + gwmDamage;
        console.log("post gwm - " + roll)
    };
    if (crit && weapon == 66) {
        console.log("pre crit - " + roll) 
        roll = roll + 12 + dice(6) ;
        console.log("post crit - " + roll)
        return roll + Number(strMod.value);
    };
    if (crit) {
        console.log("pre crit - " + roll)
        roll = roll + Number(weapon) + dice(6);
        console.log("post crit - " + roll)
        return roll + Number(strMod.value);
    };
    return roll + Number(strMod.value);
}

const dice = (x) => {
    let num;
    if (x == 66){
        let roll1 = Math.floor(Math.random() * 6) + 1;
        let roll2 = Math.floor(Math.random() * 6) + 1;
        num = roll1 + roll2;
        return num;
    }
   num = Math.floor(Math.random() * x) + 1;
   return num;
}


//show roll

