let dID = (id) => document.getElementById(id);

let levelCharMap = ['ランク1', 'ランク2', 'ランク3', 'ランク4', 'ランク5', 'ランク6'];
let names = [
  ['難攻不落の地', '業火', '滿江紅', '嫁入り時', '巨霊', '破陣子', '夸父', '拈華微笑'],
  ['抜山蓋世', '紅蓮', '殺破狼', '梨花煙雨', '蚩尤', '桃花扇', '塞下', '三昧真火'],
  ['飲酒高歌', '赤煉', '崩壊', '煙光夕明り', '陽関', '美人香', '離歌', '玉壺氷心'],
  ['変乱', '風虎雲龍', '江南', '心地よい春風', '奪魂', '焚情', '宿命', '薔薇の棘'],
  ['十三太保', '点絳唇', '空境', '果て無き水面', '離恨天', '天香', '天残地欠', '土地の誕生祝い'],
  ['怒気高揚', '双飛翼', '盤古', '座忘禅', '極力挽回', '潜龍', '氷夷', '狂風暴雨'],
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

let inputId = (level, no) => ['possess', level, no].join('_');
let numId = (level, no) => ['num', level, no].join('_');

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

let possessedMaterials = [];
let accumulatedPossessedMaterials = [];
for (let i=0; i<names.length; ++i) {
  possessedMaterials[i] = [];
  accumulatedPossessedMaterials[i] = [];
  for (j=0; j<names[i].length; ++j) {
    possessedMaterials[i][j] = 0;
    accumulatedPossessedMaterials[i][j] = 0;
  }
}

let showDif = true;

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

let init = () => {
  // 全体の枠
  let allMaterialDiv = document.createElement('div');
  allMaterialDiv.className = 'layout vertical';
  allMaterialDiv.style.overflowX = 'auto';

  for (let thisLevel = 0; thisLevel < names.length; ++thisLevel) {
    // 横列の枠
    let levelMaterialDiv = document.createElement('div');
    levelMaterialDiv.className = 'flex-none layout horizontal' + ((thisLevel) ? ' mtop-2' : '');

    for (let thisNo = 0; thisNo < names[thisLevel].length; ++thisNo) {
      // Box1つあたりのサイズ
      let materialOuterDiv = document.createElement('div');
      materialOuterDiv.className = 'flex layout horizontal';
      materialOuterDiv.style.border = 'solid 0.5px';
      materialOuterDiv.style.height = '4em';
      materialOuterDiv.style.padding = '0 0.5em';
      materialOuterDiv.style.marginLeft = '0.5em';

      // 名前部分
      let materialDiv = document.createElement('div');
      materialDiv.innerHTML = names[thisLevel][thisNo];
      materialDiv.style.width = '7em';
      materialDiv.className = 'layout horizontal';
      materialDiv.style.justifyContent = 'space-between';

      // スペース
      let numDiv = document.createElement('div');
      numDiv.style.width = '2em';
      numDiv.style.width = '2em';
      numDiv.id = numId(thisLevel, thisNo);
      materialDiv.appendChild(numDiv);

      // 天書作成ボタン
      let materialInput = document.createElement('input');
      materialInput.type = 'button';
      materialInput.id = inputId(thisLevel, thisNo);
      materialInput.value = '作る';
      materialInput.style.width = '5em';
      materialInput.style.borderRadius = "100%";
      materialInput.style.backgroundColor = 'ivory';
      materialInput.style.borderWidth = '1px';

      materialInput.oninput = (e) => {
        let thisId = e.target.id;
        let thisIdSplit = (thisId || '').split('_');
        if (thisIdSplit && thisIdSplit.length == 3) {
          let focusLevel = parseInt(thisIdSplit[1]);
          let focusNo = parseInt(thisIdSplit[2]);
          let newNumber = parseInt(dID(inputId(focusLevel, focusNo)).value || 0);
          let dif = newNumber - possessedMaterials[focusLevel][focusNo];
          console.log(dif + ' to ' + newNumber);

          possessedMaterials[focusLevel][focusNo] = newNumber;
          accumulatedPossessedMaterials[focusLevel][focusNo] += dif;
          for (let i=focusLevel-1; i>=0; --i)
            for (let j=0; j<names[i].length; ++j)
              accumulatedPossessedMaterials[i][j] += (dif * accumulatedRequirement[focusLevel][focusNo][i][j]);
        }
      };

      materialInput.onblur = (e) => {
        for (let i = 0; i < names.length; ++i)
          for (let j = 0; j < names[i].length; ++j) {
            dID(inputId(i, j)).previousSibling.classList.remove('focus');
            dID(inputId(i, j)).previousSibling.classList.remove('requiring');
            dID(inputId(i, j)).previousSibling.classList.remove('required');
            dID(numId(i, j)).innerHTML = '';
          }
      };
      materialInput.onfocus = (e) => {
        let thisId = e.target.id;
        let thisIdSplit = (thisId || '').split('_');
        if (thisIdSplit && thisIdSplit.length == 3) {
          let focusLevel = parseInt(thisIdSplit[1]);
          let focusNo = parseInt(thisIdSplit[2]);
          for (let i = 0; i < names.length; ++i) {
            for (let j = 0; j < names[i].length; ++j) {
              if (i > focusLevel) {
                dID(inputId(i, j)).previousSibling.classList.remove('focus');
                dID(inputId(i, j)).previousSibling.classList.remove('required');
                dID(numId(i, j)).innerHTML = '';
                if (accumulatedRequirement[i][j][focusLevel][focusNo])
                  dID(inputId(i, j)).previousSibling.classList.add('requiring');
                else
                  dID(inputId(i, j)).previousSibling.classList.remove('requiring');
              } else if (i == focusLevel) {
                dID(inputId(i, j)).previousSibling.classList.remove('required');
                dID(inputId(i, j)).previousSibling.classList.remove('requiring');
                dID(numId(i, j)).innerHTML = '';
                if (j == focusNo)
                  dID(inputId(i, j)).previousSibling.classList.add('focus');
                else
                  dID(inputId(i, j)).previousSibling.classList.remove('focus');
              } else {
                dID(inputId(i, j)).previousSibling.classList.remove('requiring');
                dID(inputId(i, j)).previousSibling.classList.remove('focus');
                if (accumulatedRequirement[focusLevel][focusNo][i][j]) {
                  if (showDif) {
                    let gap = accumulatedRequirement[focusLevel][focusNo][i][j] - accumulatedPossessedMaterials[i][j];
                    if (gap > 0) {
                      dID(inputId(i, j)).previousSibling.classList.add('required');
                    } else {
                      dID(inputId(i, j)).previousSibling.classList.remove('required');
                    }
                  } else {
                    dID(inputId(i, j)).previousSibling.classList.add('required');
                  }
                  dID(numId(i, j)).innerHTML = '(' + accumulatedRequirement[focusLevel][focusNo][i][j] + ')';
                } else {
                  dID(inputId(i, j)).previousSibling.classList.remove('required');
                  dID(numId(i, j)).innerHTML = '';
                }
              }
            }
          }

          // show merge path
          let mergeSteps = [];
          let requiredHeroBadge = 0;
          let requiredHonor = 0;
          let requiredLv1 = [0, 0, 0, 0, 0, 0, 0, 0];
          let dupPossessedMaterials = JSON.parse(JSON.stringify(possessedMaterials));
          let checkRequirement = (checkLevel, checkNo, num) => {
            if (dupPossessedMaterials[checkLevel][checkNo] >= num) {
              dupPossessedMaterials[checkLevel][checkNo] -= num;
            } else {
              let nowNum = dupPossessedMaterials[checkLevel][checkNo];
              let thisGap = num - nowNum;
              if (nowNum) {
                dupPossessedMaterials[checkLevel][checkNo] = 0;
              }

              if (checkLevel > 0) {
                for (let i=0; i<nextLevelRequirement[checkLevel][checkNo].length; ++i)
                  if (nextLevelRequirement[checkLevel][checkNo][i])
                    checkRequirement(checkLevel-1, i, thisGap * nextLevelRequirement[checkLevel][checkNo][i]);
                mergeSteps.push('[合成] ' + dName(checkLevel, checkNo) + ' x ' + thisGap + '<br/>');
              } else {
                if ([0, 4, 5, 6].includes(checkNo))
                  requiredHeroBadge += (thisGap * 1400);
                else
                  requiredHonor += (thisGap * 1200);
                // requiredLv1.push([names[0][checkNo], thisGap].join(' x '));
                requiredLv1[checkNo] += thisGap;
                mergeSteps.push('>> 交換 ' + dName(checkLevel, checkNo) + ' x ' + thisGap);
              }
            }
          };
          checkRequirement(focusLevel, focusNo, 1);
          dID('display-box-2').innerHTML = mergeSteps.join('<br/>');

          dID('display-box-3').innerHTML = [
            '英雄令必要数: ' + requiredHeroBadge,
            '栄誉必要数: ' + requiredHonor,
            '===================',
            '天書ランク1必要数:',
            requiredLv1.map((num, idx) => num ? ['\t'+names[0][idx], num].join(' x ') : null).filter((e)=>e).join('<br/>'),
          ].join('<br/>');
        }
      };

      materialOuterDiv.appendChild(materialDiv);
      materialOuterDiv.appendChild(materialInput);
      levelMaterialDiv.appendChild(materialOuterDiv);
    }

    allMaterialDiv.appendChild(levelMaterialDiv);
  }
  dID('possessed-materials-div').appendChild(allMaterialDiv);

  displayNames();
};
