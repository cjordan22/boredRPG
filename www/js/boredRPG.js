var myPlayer = new player(100,200,20,10,1,1,1,1,'Ragnar');

function player(HP, MaxHP, hpGainRest, AP, Haste, hasteGainLFT, magicFind, Level, name) {
    this.HP = HP;
    this.MaxHP = MaxHP;
    this.hpGainRest = hpGainRest;
    this.AP = AP;
	this.Haste = Haste;
	this.hasteGainLFT = hasteGainLFT;
	this.magicFind = magicFind;
	this.Level = Level;
	this.Name = name;
}

function monster(HP, AP, Haste, Level, name) {
    this.HP = HP;
    this.AP = AP;
	this.Haste = Haste;
	this.Level = Level;
	this.Name = name;
}

function initialize(){
	printToCombatLog("Welcome to boredRPG!");
	var newName = prompt("What is your heroes name?","Ignar the Destroyer");
	setPlayerName(newName);
	updateStatsPanel();
}

function updateStatsPanel(){
	document.getElementById("statsPanelLeft").innerHTML = "Name: "+getPlayerName()+"<br>Level: "+getPlayerLevel();
	document.getElementById("statsPanelRight").innerHTML = "HP: "+getPlayerHP()+"<br>AP: "+getPlayerAP()+"<br>Haste: "+getPlayerHaste()+"<br>Magic Find: "+getPlayerMagicFind();
}

function printToCombatLog(text){
	document.getElementById("combatLog").innerHTML = document.getElementById("combatLog").innerHTML +"["+getTimeStamp()+"]: "+text+"\n";
	var textarea = document.getElementById('combatLog');
	textarea.scrollTop = textarea.scrollHeight;
}

function getPlayerHP(){
	return myPlayer.HP;
}

function getPlayerAP(){
	return myPlayer.AP;
}

function getPlayerHaste(){
	return myPlayer.Haste;
}

function getPlayerMagicFind(){
	return myPlayer.magicFind;
}

function getPlayerLevel(){
	return myPlayer.Level;
}

function getPlayerName(){
	return myPlayer.Name;
}

function setPlayerHP(hp){
	myPlayer.HP = hp;
	updateStatsPanel();
}

function setPlayerAP(ap){
	myPlayer.AP = ap;
	updateStatsPanel();
}

function setPlayerHaste(haste){
	myPlayer.Haste = haste;
	updateStatsPanel();
}

function setPlayerMagicFind(magicFind){
	myPlayer.magicFind = magicFind;
	updateStatsPanel();
}

function setPlayerLevel(level){
	myPlayer.Level = level;
	updateStatsPanel();
}

function setPlayerName(name){
	myPlayer.Name = name;
	updateStatsPanel();
}

function lookForTrouble(){
	setPlayerHaste(getPlayerHaste()+myPlayer.hasteGainLFT);
	encounterMonster(myPlayer);
}

function rest(){
	if (getPlayerHP()<myPlayer.MaxHP){
		setPlayerHP(getPlayerHP()+myPlayer.hpGainRest);
	}
	if (getPlayerHaste() > 1){
		setPlayerHaste(getPlayerHaste()-1);
	} else {
		setPlayerHaste(1);
	}
}

function encounterMonster(player){
	var chance = getRndInteger(0,1);
	printToCombatLog(player.Name+" adventures into the forest!");
	if (chance == 1){
		var monsterLevel = generateMonsterLevel(player.Level);
		var monsterName = generateMonsterName();
		printToCombatLog(player.Name+" has encountered "+monsterName+".");
		var monsterHP = getRndInteger(player.HP-player.AP,player.HP+player.AP);
		var newMonster = new monster(10, 2, 1, monsterLevel, monsterName);
		battle(player,newMonster);
	} else {
		printToCombatLog("...but there's nothing here!");
	}
}

function battle(player,newMonster){
	while(player.HP > 0 && newMonster.HP > 0){
		if(player.Haste > newMonster.Haste){
			newMonster.HP -= player.AP;
			printToCombatLog(player.Name+" attacks "+newMonster.Name+" causing "+player.AP+" damage.");
			updateStatsPanel();
			player.HP -= newMonster.HP;
			printToCombatLog(newMonster.Name+" attacks "+player.Name+" causing "+newMonster.AP+" damage.");
			updateStatsPanel();
		} else {
			player.HP -= newMonster.HP;
			printToCombatLog(newMonster.Name+" attacks "+player.Name+" causing "+newMonster.AP+" damage.");
			updateStatsPanel();
			newMonster.HP -= player.AP;
			printToCombatLog(player.Name+" attacks "+newMonster.Name+" causing "+player.AP+" damage.");
			updateStatsPanel();
		}
	}
	if (player.HP <= 0){
		printToCombatLog(player.Name+" was killed by "+newMonster.Name+"!");
		printToCombatLog("--- G A M E    O V E R ---");
	}
	if (newMonster.HP <=0){
		setPlayerLevel(player.Level+1);
		printToCombatLog(newMonster.Name+" was killed by "+player.Name+"!");
		printToCombatLog("You have leveled up to level "+player.Level+"!");
	}
}

function generateMonsterName(){
	var firstNameSyllables = ["mon", "fay", "shi", "zag", "blarg", "zhu", "rash", "gromm", "izen", "quag", "drak", "thar", "zug", "zog"];
	var firstName = "";
    var numberOfSyllablesInFirstName = getRndInteger(2,4);
    for (var i = 0; i < numberOfSyllablesInFirstName; i++){
        firstName += firstNameSyllables[getRndInteger(0, firstNameSyllables.length-1)];
    }
	var firstLetter = firstName.substring(0,1);
	var restOfName = firstName.substring(1);
	var finalName = firstLetter.toUpperCase()+restOfName;
    return finalName;
}

function generateMonsterLevel(Level){
	var monsterDifficultySeed = getRndInteger(1,10);
	var monsterLevel;
	if (monsterDifficultySeed > 9){
		//hard monster
		monsterLevel = Level + 1;
	} else if (monsterDifficultySeed > 6){
		//fair match monster
		monsterLevel = Level;
	} else if (monsterDifficultySeed > 1){
		//easy monster
		monsterLevel = Level-1;
	}
	//don't allow monsters lower than level 1
	if (monsterLevel < 1){
		monsterLevel = 1;
	}
	return monsterLevel;
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getTimeStamp(){
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	var timestamp = h+":"+m;
	return timestamp;
}