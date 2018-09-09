const formatRows = (data) => {
  let samples = []
  data.slice(1).map((entry) => {
    let newObj = {}
    for(let i = 0; i < entry.length; i++) {
      newObj[data[0][i]] = entry[i]
    }
    samples.push(newObj)
  })
  return samples
}

const generateTrackType = (samples) => {
  for (let i = 0; i < samples.length; i++){
    samples[i]["trackType"] = samples[i]["URL"].split(".").pop()
  }
  console.log("samples ", samples)
  return samples
}

export const inputToJSON = (data) => {
  data["samples"] = formatRows(data["samples"])
  data["samples"] = generateTrackType(data["samples"])
  data = JSON.stringify(data, null, 2)
  console.log('stuff and things will magincally happen :', data);
}


