// Function to create a array with 0s and 1s for bomb palcement

function randAry(grdSiz, bombNo) {
  
  let ary = new Array(grdSiz).fill(0)
  let counter = 0

  while(bombNo > 0) {
  
    if(Math.floor(Math.random() * 1000) > 499) {

      ary[counter] = 1;
      bombNo--;

    }
    counter++;
    counter = (counter >= ary.length - 1) ? 0 : counter;

  }
  
  return ary;
}


// console.log(randAry(10,5))


