interface result {
  weight: number,
  height: number,
  bmi: string
}


const bmiCalculator = (weight:number, height:number):result => {
  let bmi = weight/height;
  if(bmi<18){
    return {
      weight:weight,
      height:weight,
      bmi:"you are a bit underweight consider eating more"
    }
  } else if(bmi>29){
    return{
      weight:weight,
      height:height,
      bmi:"you are a bit overweight consider less"
    }
  } else {
    return{ 
      weight:weight,
      height: height, 
      bmi:"you are a healthy bmi"
    }
  }


}

export default bmiCalculator