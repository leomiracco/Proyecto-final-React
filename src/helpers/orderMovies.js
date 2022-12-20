let minY = {};

export const orderMovies = (arrayMoviesCopy)=>{
  const lengthArray = arrayMoviesCopy.length;
  const orderedArrayOfMovies = [];

  for (let i = 0; i < lengthArray; i++) {
    minY = {
      release_date: '100000-12-31'
    };
    orderedArrayOfMovies.push(findTheSmallest(arrayMoviesCopy));
    arrayMoviesCopy = arrayMoviesCopy.filter((film)=> film !== orderedArrayOfMovies[i]);
    // debugger;
  }
  return orderedArrayOfMovies;
}

const findTheSmallest = (arrayMoviesCopy)=>{

  for (let i = 0; i < arrayMoviesCopy.length; i++) {

    if(parseInt(minY.release_date.split('-')[0]) < parseInt(arrayMoviesCopy[i].release_date.split('-')[0])){
      null;
    }else if(parseInt(minY.release_date.split('-')[0]) > parseInt(arrayMoviesCopy[i].release_date.split('-')[0])){
      minY = arrayMoviesCopy[i];
    }else if(parseInt(minY.release_date.split('-')[1]) > parseInt(arrayMoviesCopy[i].release_date.split('-')[1])){
      minY = arrayMoviesCopy[i];
    }else if(parseInt(minY.release_date.split('-')[1]) < parseInt(arrayMoviesCopy[i].release_date.split('-')[1])){
      null;
    }else if(parseInt(minY.release_date.split('-')[2]) > parseInt(arrayMoviesCopy[i].release_date.split('-')[2])){
      minY = arrayMoviesCopy[i];
    }else{
      null;
    }
  }
  return minY;
}