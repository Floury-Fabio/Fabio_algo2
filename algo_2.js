function swap (arr, i1, i2) {
  let tmp = arr[i1]
  arr[i1] = arr[i2]
  arr[i2] = tmp
}

function sum_1 (arr, k, count) {
  let imax = arr.length - 1
  
  for (let checker = 0 ; checker <= imax - 1 ; checker++) {
    for (let cursor = checker + 1 ; cursor <= imax ; cursor++) {
      count[0]++
      if (arr[checker] + arr[cursor] == k)
        return true
    }
  }
  return false
}

function sum_2 (arr, k, count) {
  let imax = arr.length - 1
  let last = arr[imax]
  let checker = 0

  while (arr[0] != last) {
    count[0]++
    if (arr[checker] + arr[checker + 1] == k)
      return true
    else
      swap (arr, checker, checker + 1)
    checker = (checker + 1) % imax
  }
  return false
}

function sum_3 (arr, k, count) {
  let imax = arr.length - 1
  let mid = k/2
  let cursor = 0
  let gap 
  let hash_gap = {}

  for (let cursor = 0 ; cursor <= imax ; cursor++) {
    gap = Math.abs(arr[cursor] - mid)
    count[0]++
    if (hash_gap[gap])
      return true
    else 
      hash_gap[gap] = true
  }

  return false
}

function street_1 (arr, count) {
  let buildingWithView = 0
  let imax = arr.length - 1

  for (buildingInTest = 0 ; buildingInTest <= imax ; buildingInTest++) {
    let vision = true
    for(cursor = buildingInTest + 1 ; cursor <= imax ; cursor++) {
      count[0]++
      if (arr[buildingInTest] < arr[cursor])
        vision = false
    }

    if (vision)
      buildingWithView++
  }

  return buildingWithView
}

function street_2 (arr, count, buildingWithView = null) {

  if (arr.length == 0)
    return buildingWithView

  let max = 0
  let iMax = null
  let iLast = arr.length - 1

  if (buildingWithView == null) 
    buildingWithView = arr.length 

  for(let cursor = 0; cursor <= iLast ; cursor++) {
      count[0]++
    if (arr[cursor] > max) {
      max = arr[cursor]
      iMax = cursor
    }
  }

  buildingWithView -= iMax
  arr = arr.slice(iMax + 1, arr.length)
  return street_2(arr, count, buildingWithView)
}

function street_3 (arr, count) {
  
  let cover = 0
  let buildingWithView = 0
  let iLast = arr.length - 1


  for(let cursor = iLast ; cursor >= 0 ; cursor--) {
      count[0]++
    if(arr[cursor] > cover) {
      cover = arr[cursor]
      buildingWithView++
    }
  }

  return buildingWithView
}

//---------------------------------displaying--------------------------------
function simSum(arr, k, callback, name) {
  let count = [0]
  let ans = callback(arr, k, count)

  console.log(`
  Test de ${name}

  Résultat de la fonction : ${ans}
  Nombre d'opérations : ${count[0]}
  `)
}

function allSum (arr, k) {
  console.log(`
  Test sur le tableau [${arr}] avec k= ${k}
  `)
  let copy = arr.map(el => el)
  simSum(arr, k, sum_1, 'sum_1')
  simSum(copy, k, sum_2, 'sum_2')
  simSum(arr, k, sum_3, 'sum_3')
}

function allStreet (arr) {
  console.log(`Tests sur le tableau [${arr}]
  `)

  simStreet(arr, street_1, 'street_1')
  simStreet(arr, street_2, 'street_2')
  simStreet(arr, street_3, 'street_3')
}

function simStreet(arr, callback, name) {
  let count = [0]
  let ans = callback(arr, count)

  console.log(`
  Test de ${name}

  Résultat de la fonction : ${ans}
  Nombre d'opérations : ${count[0]}
  `)
}
//---------------------Main-----------------------

function perform() {
  let arr1 = [10, 15, 3, 7]
  let k1 = 17

  let arr2 = [1, 8, 10, 21]
  let k2 = 19

  arr3 = [3, 7, 8, 3, 6, 1]
  arr4 = [1, 4, 5, 8]

  allSum(arr1, k1)
  allSum(arr2, k2)

  allStreet(arr3)
  allStreet(arr4)
}

function test () {
  simSum([], 5, sum_1)
}

perform()
