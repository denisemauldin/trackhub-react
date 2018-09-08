export const formatRows = (data) => {
  let samples = [];
  data.slice(1).map((entry) => {
    let newObj = {}
    for(let i = 0; i < entry.length; i++) {
      newObj[data[0][i]] = entry[i];
    }
    samples.push(newObj)
  })
  console.log(samples)
  return samples
}

export const inputToJSON = (data) => {
  console.log('data :',data);
  data["samples"] = formatRows(data["samples"]);
  data = JSON.stringify(data, null, 2)
  console.log('stuff and things will magincally happen :', data);
}


