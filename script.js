/*document.onload = () => {
    const length = document.getElementById("length")
    const numcheck = document.getElementById("numcheck")
    const capcheck = document.getElementById("capcheck")
    const smallcheck = document.getElementById("smallcheck")
    const speccheck = document.getElementById("speccheck")
    const numlength = document.getElementById("numlength")
    const speclength = document.getElementById("speclength")
    const output = document.getElementById("output")
}*/

const capitalLetterArray = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",")
const smallLetterArray = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",")
const numberArray = "0,1,2,3,4,5,6,7,8,9".split(",")
const specialCharacterArray = "!,@,#,$,%,^,&,*".split(",")

const generatePassword = () => {
    let length = document.getElementById("length").value.length === 0 ? 0 : parseInt(document.getElementById("length").value)
    let numcheck = document.getElementById("numcheck").checked
    let capcheck = document.getElementById("capcheck").checked
    let smallcheck = document.getElementById("smallcheck").checked
    let speccheck = document.getElementById("speccheck").checked
    let numlength = document.getElementById("numlength").value.length === 0 || !numcheck ? 0 : parseInt(document.getElementById("numlength").value)
    let speclength = document.getElementById("speclength").value.length === 0 || !speccheck ? 0 : parseInt(document.getElementById("speclength").value)
    let output = document.getElementById("output")

    let characterArray = []
    if (numcheck && numlength !==0) characterArray = characterArray.concat(numberArray)
    if (capcheck) characterArray = characterArray.concat(capitalLetterArray)
    if (smallcheck) characterArray = characterArray.concat(smallLetterArray)
    if (speccheck && speclength !== 0) characterArray = characterArray.concat(specialCharacterArray)

    if (numlength + speclength > length) {
        output.value = "error"
        return
    }
    if (!(capcheck || smallcheck || speccheck)) {
        output.value = "error"
        return
    }
    let password = []
    for (let i = 0; i<numlength; i++) {
        let rnd = Math.floor(Math.random() * numberArray.length)
        password.push(numberArray[rnd])
    }
    for (let i = 0; i<speclength; i++) {
        let rnd = Math.floor(Math.random() * specialCharacterArray.length)
        password.push(specialCharacterArray[rnd])
    }
    for (let i = 0; i<length-numlength-speclength; i++) {
        let rnd = Math.floor(Math.random() * characterArray.length)
        password.push(characterArray[rnd])
    }
    password = shuffleFisherYates(password)
    let string = ""
    for (let i = 0; i<password.length; i++) string += password[i]
    output.value = string
    return
}

const shuffleFisherYates = (e) => {
    for (let i = e.length-1; i<0; i--) {
        let rnd = Math.floor(Math.random()*e.length)
        let c = e[i]
        e[i] = e[rnd]
        e[rnd] = c
    }
    return e
}