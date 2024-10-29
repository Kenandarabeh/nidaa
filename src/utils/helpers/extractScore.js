const extractScore = (response) => {
    const scoreData = response.data.find(item => item.name === "displayscorewithoutessays");
    if (scoreData) {
      const scoreValue = JSON.parse(scoreData.value); 
      return scoreValue.score; 
    }
    return null; 
  };
  
export default extractScore