
let randomArray = [];
const randomButton = document.getElementById("randomButton");
const randomValues = document.getElementById("randomValues");

randomButton.addEventListener("click", () => {
  if (randomArray.length === 6) {
    return; // 已经生成了 6 个随机数，无需再请求
  }

  for (let i = randomArray.length; i < 6; i++) {
    if (typeof randomArray[i] !== 'undefined') {
      continue; // 已经存储了随机数，跳过下面的操作，直接进入下一次循环
    }
  
    fetch('https://www.random.org/integers/?num=1&min=0&max=1&col=1&base=10&format=plain&rnd=new').then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Network response was not ok.');
      }
    }).then(data => {
      const result = parseInt(data.trim());
      if (result === 0) {
        randomArray[i] = " 阴爻 ";
      } else if (result === 1) {
        randomArray[i] = " 阳爻 ";
      }
      if (randomArray.length === 6) {
        randomValues.value = randomArray.toString();
      }
    }).catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }
});
