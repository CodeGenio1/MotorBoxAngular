export const getAllMakeAndModel = (res: any) => {

  const modelMake = {
    makeList:  res.cars.map(x=>x.make).filter((item, i, ar) => ar.indexOf(item) === i),
    modelList: res.cars
  }
  return modelMake;
}
