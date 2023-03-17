
interface exerciseRes{days:number, training_days:number, target_value:number, average_time: number, 
    target_reached: boolean, rating:number, explanation: string 
};

const exerciseCalculator=(exercises: Array<number>, target:number): exerciseRes => {
    //calculating number of days
    let Total_days = exercises.length;
    let i = 0;
    let avg = 0
    let training_days = 0
    for(i=0; i<exercises.length; i++){

        if ((exercises[i])!==0){
            training_days++;
        }  
        avg+= exercises[i]

    }
    let rating = 2; 
    //compute avg
    avg = avg/Total_days
    const target_reached = false; 
    const explanation = "this function is just a test"

    return {
        days: Total_days,
        training_days: training_days,
        target_value: target, 
        average_time: avg,
        target_reached: target_reached,
        rating: rating, 
        explanation: explanation,
    }



    
}
export default exerciseCalculator