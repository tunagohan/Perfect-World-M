let dID = (id) => document.getElementById(id);

let levelCharMap = ['I', 'II', 'III', 'IV', 'V', 'VI'];
let names = [
	['一夫當關', '業火', '滿江紅', '逃之夭夭', '巨靈', '破陣子', '夸父', '拈花一笑'],
	['力拔千鈞', '紅蓮', '殺狼破', '梨花煙雨', '蚩尤', '桃花扇', '塞下', '三昧真火'],
	['對酒當歌', '赤練', '崩壞', '煙光殘照', '陽關', '美人香', '驪歌', '玉壺冰心'],
	['變亂', '風虎雲龍', '江南', '如沐春風', '勾魂攝魄', '焚情', '宿命', '玫瑰刺'],
	['十三太保', '點絳唇', '空境', '波浩淼', '離恨天', '天香', '天殘地缺', '土地拜壽'],
	['怒火攻心', '雙飛翼', '盤古', '坐忘禪', '力挽狂瀾', '潛龍', '冰夷', '胭脂紅淚'],
];

let dName = (level, no) => names[level][no] + '(' + levelCharMap[level] + '-' + (no + 1) + ')';
let displayNames = () => {
	dID('display-box-1').innerHTML = names.reduce((text, levelNames, thisLevel) => {
		let thisLevelText = [];

		thisLevelText.push('Level ' + levelCharMap[thisLevel]);
		for(let thisNo = 0; thisNo < levelNames.length; ++thisNo) {
			thisLevelText.push('\t' + dName(thisLevel, thisNo));
		}

		text.push(thisLevelText.join('\r\n'));
		return text;
	}, []).join('\r\n==================\r\n');
};

let nextLevelRequirement = [[
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
], [
	[2, 2, 0, 2, 0, 0, 0, 0],
	[0, 2, 0, 0, 2, 2, 0, 0],
	[2, 0, 2, 2, 0, 0, 0, 0],
	[0, 2, 0, 2, 2, 0, 0, 0],
	[0, 0, 0, 0, 2, 2, 2, 0],
	[0, 0, 0, 0, 0, 2, 2, 2],
	[0, 0, 2, 0, 0, 0, 2, 2],
	[2, 0, 2, 0, 0, 0, 0, 2],
], [
	[1, 1, 0, 1, 0, 0, 0, 0],
	[0, 1, 0, 0, 1, 1, 0, 0],
	[1, 0, 1, 1, 0, 0, 0, 0],
	[0, 1, 0, 1, 1, 0, 0, 0],
	[0, 0, 0, 0, 1, 1, 1, 0],
	[0, 0, 0, 0, 0, 1, 1, 1],
	[0, 0, 1, 0, 0, 0, 1, 1],
	[0, 1, 0, 1, 1, 0, 0, 0],
], [
	[0, 0, 1, 0, 1, 0, 1, 0],
	[1, 0, 0, 0, 1, 1, 0, 0],
	[1, 0, 1, 0, 0, 0, 0, 1],
	[1, 0, 1, 0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 1, 1, 0],
	[1, 0, 1, 0, 0, 0, 1, 0],
	[0, 0, 1, 0, 0, 1, 1, 0],
], [
	[0, 1, 1, 1, 0, 0, 0, 0],
	[1, 0, 0, 1, 0, 0, 0, 1],
	[0, 1, 1, 0, 0, 1, 0, 0],
	[1, 0, 1, 1, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 1, 1],
	[0, 0, 0, 0, 0, 1, 1, 1],
	[0, 1, 0, 0, 0, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
], [
	[1, 0, 1, 0, 0, 0, 1, 0],
	[1, 1, 0, 1, 0, 0, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 0],
	[1, 0, 1, 1, 0, 0, 0, 0],
	[0, 1, 0, 1, 1, 0, 0, 0],
	[0, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 0, 0, 1, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
]];

// mapping num of material for input mat = [matLevel][matNo][mappingMatLevel][mappingMatNo]
let accumulatedRequirement = [];
names.forEach((level, levelIdx) => {
	accumulatedRequirement[levelIdx] = [];
	names[levelIdx].forEach((name, nameIdx) => {
		accumulatedRequirement[levelIdx][nameIdx] = [];
		accumulatedRequirement[levelIdx][nameIdx][levelIdx - 1] = nextLevelRequirement[levelIdx][nameIdx]

		let targetLevel = levelIdx - 2;
		while (targetLevel >= 0) {
			accumulatedRequirement[levelIdx][nameIdx][targetLevel] = names[targetLevel].map((matName, matIdx) => {
				return accumulatedRequirement[levelIdx][nameIdx][targetLevel + 1].reduce((prev, srcReq, srcIdx) => {
					return prev + (srcReq * accumulatedRequirement[targetLevel + 1][srcIdx][targetLevel][matIdx]);
				}, 0);
			});

			--targetLevel;
		}
	});
});

let requiredMaterials = (level, no) => {
	let requirement = accumulatedRequirement[level-1][no-1].map((matRequirement, matLevel) => {
		return accumulatedRequirement[level-1][no-1][matLevel].reduce((prev, reqNum, matNo) => {
			if (reqNum > 0) prev.push(dName(matLevel, matNo) + 'x' + reqNum);
			return prev;
		}, []).join(', ');
	}).join('\r\n');
	console.log('Required Matrix for ' + names[level-1][no-1]);
	console.log(requirement);
}

// requiredMaterials(passedLevel, passedNo);

let getMaterialGap = () => {
	// read target input
	let level = dID('level').value;
	let no = dID('no').value;
	let realLevel = level - 1;
	let realNo = no - 1;

	// read possessed material input
	let possessedMaterials = names.reduce((prev, levelNames, thisLevel) => {
		prev.push(levelNames.reduce((innerPrev, name, thisNo) => {
			let thisId = 'possess' + thisLevel + '_' + thisNo;
			let thisNum = parseInt(dID(thisId).value || 0);
			innerPrev.push(thisNum);
			return innerPrev;
		}, []));
		return prev;
	}, []);
	console.log(possessedMaterials);
	let dupPossessedMaterials = JSON.parse(JSON.stringify(possessedMaterials));

	let outputStr = [];
	let gapQueue = [[realLevel, realNo, 1]];

	// accumulatedRequirement[realLevel][realNo][realLevel-1]
	let i = 0;
	while (i < gapQueue.length) {
		let thisLevel = gapQueue[i][0];
		let thisNo = gapQueue[i][1];
		let thisReqNum = gapQueue[i][2];
		console.log('traverse for ' + dName(thisLevel, thisNo));

		let partialMaterialFound = false;
		let traverseLevel = thisLevel - 1;
		let nextGapQueue = undefined;
		while (!partialMaterialFound && traverseLevel >= 0) {
			let tmpGapQueue = accumulatedRequirement[thisLevel][thisNo][traverseLevel].reduce((prev, reqNum, reqNo) => {
				if (reqNum) {
					console.log('check for ' + dName(traverseLevel, reqNo));
					// console.log('reqNum = ' + reqNum + ', thisReqNum = ' + thisReqNum);
					if (dupPossessedMaterials[traverseLevel][reqNo]) {
						partialMaterialFound = true;
						console.log('found: ' + dName(traverseLevel, reqNo) + '*' + dupPossessedMaterials[traverseLevel][reqNo]);
					}

					if (dupPossessedMaterials[traverseLevel][reqNo] < (reqNum * thisReqNum)) {
						let thisGap = (reqNum * thisReqNum) - dupPossessedMaterials[traverseLevel][reqNo];
						prev.push([traverseLevel, reqNo, thisGap]);
						dupPossessedMaterials[traverseLevel][reqNo] = 0;
					} else {
						dupPossessedMaterials[traverseLevel][reqNo] -= (reqNum * thisReqNum);
					}
				}
				return prev;
			}, []);
			nextGapQueue = nextGapQueue || tmpGapQueue.slice(0);
			--traverseLevel;
		}

		if (partialMaterialFound == true && (nextGapQueue || []).length > 0) {
			console.log(nextGapQueue);
			gapQueue.splice(i--, 1);
			gapQueue = gapQueue.concat(nextGapQueue);
		}

		++i;
	}

	outputStr.push('requirement: ');
	// console.log('requirement: ');
	outputStr.push(gapQueue.reduce((prev, material) => {
		prev.push(dName(material[0], material[1]) + 'x' + material[2]);
		return prev;
	}, []).join('\r\n'));
	/* console.log(gapQueue.reduce((prev, material) => {
		prev.push(dName(material[0], material[1]) + 'x' + material[2]);
		return prev;
	}, []).join('\r\n')); */

	dID('display-box-3').innerHTML = outputStr.join('\r\n');
};

let init = () => {
	let allMaterialDiv = document.createElement('div');
	allMaterialDiv.className = 'layout vertical';
	allMaterialDiv.style.overflowX = 'auto';

	for (let thisLevel = 0; thisLevel < names.length; ++thisLevel) {
		let levelMaterialDiv = document.createElement('div');
		levelMaterialDiv.className = 'flex-none layout horizontal' + ((thisLevel) ? ' mtop-2' : '');
		// levelMaterialDiv.style.color = 'yellow';

		for (let thisNo = 0; thisNo < names[thisLevel].length; ++thisNo) {
			let materialOuterDiv = document.createElement('div');
			materialOuterDiv.className = 'flex layout horizontal';
			materialOuterDiv.style.borderLeft = 'solid 0.5px';
			materialOuterDiv.style.borderBottom = 'solid 0.5px';
			materialOuterDiv.style.padding = '0 0.5em';

			let materialDiv = document.createElement('div');
			materialDiv.innerHTML = names[thisLevel][thisNo];
			materialDiv.style.width = '5em';

			let materialInput = document.createElement('input');
			materialInput.type = 'number';
			materialInput.id = 'possess' + thisLevel + '_' + thisNo;
			materialInput.style.width = '3em';

			materialOuterDiv.appendChild(materialDiv);
			materialOuterDiv.appendChild(materialInput);
			levelMaterialDiv.appendChild(materialOuterDiv);
		}

		allMaterialDiv.appendChild(levelMaterialDiv);
	}

	console.log(allMaterialDiv);
	dID('main-container').insertBefore(allMaterialDiv, dID('main-container').firstChild);

	displayNames();
};